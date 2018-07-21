import template from 'babel-template';

export default function ({types: t}) {
  const defaultIdentifier = t.identifier('default');
  const rewireIdentifier = t.identifier('rewire');
  const restoreIdentifier = t.identifier('restore');
  const stubIdentifier = t.identifier('$stub');
  const VISITED = Symbol('visited');

  const buildStub = template(`
    export function REWIRE(STUB) {
      LOCAL = STUB;
    }
  `, {sourceType: 'module'});

  const buildRestore = template(`
    export function RESTORE() {
      BODY
    }
  `, {sourceType: 'module'});

  function buildNamedExport(local, exported) {
    return markVisited(t.exportNamedDeclaration(null, [
      t.exportSpecifier(t.identifier(local.name), t.identifier(exported.name))
    ]));
  }

  function markVisited(node) {
    node[VISITED] = true;
    return node;
  }

  return {
    visitor: {
      Program: {
        enter(path, state) {
          state.exports = [];
          state.hoisted = [];
        },
        exit(path, {exports, hoisted}) {
          if (!exports.length) return;
          // add hoisted variables to the top
          if (hoisted.length) {
            path.unshiftContainer('body', [t.variableDeclaration('var', hoisted)]);
          }

          // generate temp variables to capture original values
          const tempVars = [];
          exports.filter(e => !e.original).forEach(e => {
            const temp = e.original = path.scope.generateUidIdentifierBasedOnNode(e.exported);
            tempVars.push(t.variableDeclarator(temp, e.local));
          });

          // generate new IDs to keep sourcemaps clean
          const rewired = exports.map(({exported, local, original}) => ({
            exported: t.identifier(exported.name),
            local: t.identifier(local.name),
            original: t.identifier(original.name)
          }));

          // generate stub functions
          const hasConflictingBinding = path.scope.hasOwnBinding('rewire');
          const stubs = rewired.map(({exported, local}) => {
            let rewire = t.isIdentifier(exported, defaultIdentifier) && !hasConflictingBinding
              ? rewireIdentifier : t.identifier(`rewire$${exported.name}`);
            return markVisited(
              buildStub({
                REWIRE: rewire,
                LOCAL: local,
                STUB: stubIdentifier
              })
            );
          });

          // generate restore function
          const restore = path.scope.hasOwnBinding('restore') ? t.identifier('restore$rewire') : restoreIdentifier;
          const assignments = rewired.map(({local, original}) => t.expressionStatement(t.assignmentExpression('=', local, original)));

          const body = [
            ...stubs,
            markVisited(buildRestore({RESTORE: restore, BODY: assignments}))
          ];

          if (tempVars.length) {
            body.unshift(t.variableDeclaration('var', tempVars));
          }

          path.pushContainer('body', body);
        }
      },
      // export default
      ExportDefaultDeclaration(path, {exports, hoisted}) {
        const declaration = path.node.declaration;
        const isIdentifier = t.isIdentifier(declaration);
        const binding = isIdentifier && path.scope.getBinding(declaration.name);
        const isImmutable = !binding || ~['const', 'module'].indexOf(binding.kind);
        // skip undefined, globals, const and imports
        if (isIdentifier && !isImmutable) {
          // export default foo
          exports.push({exported: defaultIdentifier, local: declaration});
          path.replaceWith(buildNamedExport(declaration, defaultIdentifier));
        } else if (t.isFunctionDeclaration(declaration)) {
          //export default function () {}
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          declaration.id = path.scope.generateUidIdentifierBasedOnNode(declaration.id);
          exports.push({exported: defaultIdentifier, local: id, original: declaration.id});
          path.replaceWithMultiple([
            declaration,
            buildNamedExport(id, defaultIdentifier)
          ]);
          hoisted.push(t.variableDeclarator(id, declaration.id));
        } else if (t.isClassDeclaration(declaration)) {
          //export default class {}
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          exports.push({exported: defaultIdentifier, local: id});
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.classExpression(declaration.id, declaration.superClass, declaration.body, declaration.decorators || []))
            ]),
            buildNamedExport(id, defaultIdentifier)
          ]);
        } else {
          // export default ...
          const id = path.scope.generateUidIdentifier('default');
          exports.push({exported: defaultIdentifier, local: id});
          path.replaceWithMultiple([
            t.variableDeclaration('var', [t.variableDeclarator(id, declaration)]),
            buildNamedExport(id, defaultIdentifier)
          ]);
        }
      },
      // export {}
      ExportNamedDeclaration(path, {exports, hoisted, opts}) {
        if (path.node[VISITED]) return;
        // export { foo } from './bar.js'
        if (path.node.source) return;

        const declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          // export const foo = 'bar'
          if (declaration.kind === 'const') {
            if (opts.unsafeConst) {
              declaration.kind = 'let'; // convert const to let
            } else {
              return; // ignore constants
            }
          }
          declaration.declarations.forEach(({id}) => {
            if (t.isIdentifier(id)) {
              // export var foo
              exports.push({exported: id, local: id});
            } else if (t.isArrayPattern(id)) {
              // export var [foo, bar, ...baz] = qux;
              id.elements.forEach(e => {
                if (t.isIdentifier(e)) {
                  exports.push({exported: e, local: e});
                } else if (t.isRestElement(e) && t.isIdentifier(e.argument)) {
                  const id = e.argument;
                  exports.push({exported: id, local: id});
                } else if (t.isAssignmentPattern(e) && t.isIdentifier(e.left)) {
                  const id = e.left;
                  exports.push({exported: id, local: id});
                }
              });
            } else if (t.isObjectPattern(id)) {
              // export var {foo, bar, ...baz} = qux;
              id.properties.forEach(e => {
                if (t.isObjectProperty(e)) {
                  const id = e.key;
                  exports.push({exported: id, local: id});
                } else if (t.isRestProperty(e) && t.isIdentifier(e.argument)) {
                  const id = e.argument;
                  exports.push({exported: id, local: id});
                }
              });
            }
          });
        } else if (t.isFunctionDeclaration(declaration)) {
          // export function foo() {}
          const id = declaration.id;
          declaration.id = path.scope.generateUidIdentifierBasedOnNode(id);
          exports.push({exported: id, local: id, original: declaration.id});
          path.replaceWithMultiple([
            declaration,
            buildNamedExport(id, id)
          ]);
          hoisted.push(t.variableDeclarator(id, declaration.id));
        } else if (t.isClassDeclaration(declaration)) {
          // export function class foo {}
          const id = declaration.id;
          exports.push({exported: id, local: id});
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.classExpression(id, declaration.superClass, declaration.body, declaration.decorators || []))
            ]),
            buildNamedExport(id, id)
          ]);
        } else {
          // export {foo}
          path.node.specifiers.forEach(node => {
            const {exported, local} = node;
            const binding = path.scope.getBinding(local.name);
            const isImmutable = !binding || ~['const', 'module'].indexOf(binding.kind);
            if (isImmutable) {
              // undefined, globals, const and imports
              const id = path.scope.generateUidIdentifier(local.name);
              exports.push({exported: exported, local: id});
              path.insertBefore(t.variableDeclaration('var', [t.variableDeclarator(id, local)]));
              node.local = id;
              return;
            }
            exports.push({exported, local});
          });
        }
      }
    }
  };
}
