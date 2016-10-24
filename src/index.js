import template from 'babel-template';

export default function ({types: t}) {
  const defaultIdentifier = t.identifier('default');
  const rewireIdentifier = t.identifier('rewire');
  const stubIdentifier = t.identifier('$stub');
  const VISITED = Symbol();

  const buildStub = template(`
    export function REWIRE(STUB) {
      LOCAL = STUB;
    }
  `, {sourceType: 'module'});

  const buildRestore = template(`
    export function restore() {
      RESTORE
    }
  `, {sourceType: 'module'});

  function markVisited(node) {
    node[VISITED] = true;
    return node;
  }

  return {
    visitor: {
      Program: {
        enter: function (path, state) {
          state.exports = [];
          state.hoisted = [];
        },
        exit: function (path, {exports, hoisted}) {
          if (!exports.length) return;
          // add hoisted variables to the top
          path.unshiftContainer('body', hoisted);

          // generate temp variables to capture original values
          var tempVars = [];
          exports.filter(e => !e.original).forEach(e => {
            var temp = e.original = path.scope.generateUidIdentifierBasedOnNode(e.exported);
            tempVars.push(t.variableDeclarator(temp, e.local));
          });

          //
          var rewired = exports.map(({exported, local, original}) => ({
            exported: t.identifier(exported.name),
            local: t.identifier(local.name),
            original
          }));
          var stubs = rewired.map(({exported, local}) => markVisited(
            buildStub({
              REWIRE: t.isIdentifier(exported, defaultIdentifier) ? rewireIdentifier : t.identifier(`rewire$${exported.name}`),
              LOCAL: local,
              STUB: stubIdentifier
            })
          ));
          var assignments = rewired.map(({local, original}) => t.expressionStatement(t.assignmentExpression('=', local, original)));
          if (tempVars.length) {
            path.pushContainer('body', [
              t.variableDeclaration('var', tempVars)
            ]);
          }
          path.pushContainer('body', [
            ...stubs,
            markVisited(buildRestore({RESTORE: assignments}))
          ]);
        }
      },
      // export default
      ExportDefaultDeclaration: function (path, {exports, hoisted}) {
        var declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          // export default foo
          exports.push({exported: defaultIdentifier, local: declaration});
          path.replaceWith(markVisited(t.exportNamedDeclaration(null, [
            t.exportSpecifier(declaration, defaultIdentifier)
          ])));
        } else if (t.isFunctionDeclaration(declaration)) {
          //export default function () {}
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          declaration.id = path.scope.generateUidIdentifierBasedOnNode(declaration.id);
          exports.push({exported: defaultIdentifier, local: id, original: declaration.id});
          path.replaceWithMultiple([
            declaration,
            markVisited(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
          hoisted.push(t.variableDeclaration('var', [
            t.variableDeclarator(id, declaration.id)
          ]));
        } else if (t.isClassDeclaration(declaration)) {
          //export default class {}
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          exports.push({exported: defaultIdentifier, local: id});
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.classExpression(declaration.id, declaration.superClass, declaration.body, declaration.decorators || []))
            ]),
            markVisited(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
        } else {
          // export default ...
          const id = path.scope.generateUidIdentifier('default');
          exports.push({exported: defaultIdentifier, local: id});
          path.replaceWithMultiple([
            t.variableDeclaration('var', [t.variableDeclarator(id, declaration)]),
            markVisited(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
        }
      },
      // export {}
      ExportNamedDeclaration: function (path, {exports, hoisted}) {
        if (path.node[VISITED]) return;
        // export { foo } from './bar.js'
        if (path.node.source) return;

        var declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          // export const foo = 'bar'
          if (declaration.kind === 'const') return;
          // export var foo
          declaration.declarations.forEach(({id}) => {
            exports.push({exported: id, local: id});
          });
        } else if (t.isFunctionDeclaration(declaration)) {
          // export function foo() {}
          const id = declaration.id;
          declaration.id = path.scope.generateUidIdentifierBasedOnNode(id);
          exports.push({exported: id, local: id, original: declaration.id});
          path.replaceWithMultiple([
            declaration,
            markVisited(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, id)
            ]))
          ]);
          hoisted.push(t.variableDeclaration('var', [
            t.variableDeclarator(id, declaration.id)
          ]));
        } else if (t.isClassDeclaration(declaration)) {
          // export function class foo {}
          const id = declaration.id;
          exports.push({exported: id, local: id});
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.classExpression(id, declaration.superClass, declaration.body, declaration.decorators || []))
            ]),
            markVisited(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, id)
            ]))
          ]);
        } else {
          // export {foo}
          path.node.specifiers.forEach(({exported, local}) => {
            exports.push({exported, local});
          });
        }
      }
    }
  };
}
