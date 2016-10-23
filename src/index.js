import template from 'babel-template';

export default function ({types: t}) {
  const defaultIdentifier = t.identifier('default');
  const rewireIdentifier = t.identifier('rewire');
  const stubIdentifier = t.identifier('$stub');
  const IGNORE_SYMBOL = Symbol();

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

  function markIgnored(node) {
    node[IGNORE_SYMBOL] = true;
    return node;
  }

  return {
    visitor: {
      Program: {
        enter: function (path, state) {
          state.exports = new Map();
        },
        exit: function (path, {exports}) {
          if (!exports.size) return;
          var rewired = Array.from(exports.entries()).map(([exported, local]) => ({
            exported,
            local,
            temp: path.scope.generateUidIdentifierBasedOnNode(exported)
          }));
          var vars = rewired.map(({local, temp}) => t.variableDeclarator(temp, local));
          var stubs = rewired.map(({exported, local}) => markIgnored(
            buildStub({
              REWIRE: t.isIdentifier(exported, defaultIdentifier) ? rewireIdentifier : t.identifier(`rewire$${exported.name}`),
              LOCAL: local,
              STUB: stubIdentifier
            })
          ));
          var assignments = rewired.map(({local, temp}) => t.expressionStatement(t.assignmentExpression('=', local, temp)));
          path.pushContainer('body', [
            t.variableDeclaration('var', vars),
            ...stubs,
            markIgnored(buildRestore({RESTORE: assignments}))
          ]);
        }
      },
      // export default
      ExportDefaultDeclaration: function (path, {exports}) {
        var declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          // export default foo
          exports.set(defaultIdentifier, declaration);
          path.replaceWith(markIgnored(t.exportNamedDeclaration(null, [
            t.exportSpecifier(declaration, defaultIdentifier)
          ])));
        } else if (t.isFunctionDeclaration(declaration)) {
          //export default function () {}
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          exports.set(defaultIdentifier, id);
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.functionExpression(declaration.id, declaration.params, declaration.body, declaration.generator, declaration.async))
            ]),
            markIgnored(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
        } else if (t.isClassDeclaration(declaration)) {
          //export default class {}
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          exports.set(defaultIdentifier, id);
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.classExpression(declaration.id, declaration.superClass, declaration.body, declaration.decorators || []))
            ]),
            markIgnored(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
        } else {
          // export default ...
          const id = path.scope.generateUidIdentifier('default');
          exports.set(defaultIdentifier, id);
          path.replaceWithMultiple([
            t.variableDeclaration('var', [t.variableDeclarator(id, declaration)]),
            markIgnored(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
        }
      },
      // export {}
      ExportNamedDeclaration: function (path, {exports}) {
        if (path.node[IGNORE_SYMBOL]) return;
        // export { foo } from './bar.js'
        if (path.node.source) return;

        var declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          // export const foo = 'bar'
          if (declaration.kind === 'const') return;
          // export var foo
          declaration.declarations.forEach(({id}) => {
            exports.set(id, id);
          });
        } else if (t.isFunctionDeclaration(declaration)) {
          // export function foo() {}
          const id = declaration.id;
          exports.set(id, id);
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.functionExpression(id, declaration.params, declaration.body, declaration.generator, declaration.async))
            ]),
            markIgnored(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, id)
            ]))
          ]);
        } else if (t.isClassDeclaration(declaration)) {
          // export function class foo {}
          const id = declaration.id;
          exports.set(id, id);
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.classExpression(id, declaration.superClass, declaration.body, declaration.decorators || []))
            ]),
            markIgnored(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, id)
            ]))
          ]);
        } else {
          // export {foo}
          path.node.specifiers.forEach(({exported, local}) => {
            exports.set(exported, local);
          });
        }
      }
    }
  };
}
