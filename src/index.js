export default function ({types: t}) {
  var restoreIdentifier = t.identifier('restore');
  var defaultIdentifier = t.identifier('default');
  var rewiredIdentifier = t.identifier('$stub');
  var IGNORE_SYMBOL = Symbol();

  function markIgnored(node) {
    node[IGNORE_SYMBOL] = true;
    return node;
  }

  function isLiteral(node) {
    return t.isRegExpLiteral(node) || t.isNullLiteral(node) || t.isStringLiteral(node) || t.isBooleanLiteral(node) || t.isNumericLiteral(node);
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
          var assignments = rewired.map(({local, temp}) => t.expressionStatement(t.assignmentExpression('=', local, temp)));
          var stubs = rewired.map(({exported, local}) => markIgnored(t.exportNamedDeclaration(t.functionDeclaration(
            t.identifier(`rewire$${exported.name}`), [rewiredIdentifier], t.blockStatement([
              t.expressionStatement(t.assignmentExpression('=', local, rewiredIdentifier))
            ])), [])));
          path.pushContainer('body', [
            t.variableDeclaration('var', vars),
            ...stubs,
            markIgnored(t.exportNamedDeclaration(t.functionDeclaration(restoreIdentifier, [], t.blockStatement(assignments)), []))
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
          const id = path.scope.generateUidIdentifier('default');
          exports.set(defaultIdentifier, id);
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.functionExpression(declaration.id, declaration.params, declaration.body, declaration.generator, declaration.async))
            ]),
            markIgnored(t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ]))
          ]);
        } else if (isLiteral(declaration)) {
          // export default null
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
