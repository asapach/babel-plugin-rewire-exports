export default function ({types: t}) {
  var restoreIdentifier = t.identifier('restore');
  var defaultIdentifier = t.identifier('default');
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
          path.pushContainer('body', [
            t.variableDeclaration('var', vars),
            markIgnored(t.exportNamedDeclaration(t.functionDeclaration(restoreIdentifier, [], t.blockStatement(assignments)), []))
          ]);
        }
      },
      ExportDefaultDeclaration: function (path, {exports}) {
        var declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          exports.set(defaultIdentifier, declaration);
          path.replaceWith(markIgnored(t.exportNamedDeclaration(null, [
            t.exportSpecifier(declaration, defaultIdentifier)
          ])));
        } else if (t.isFunctionDeclaration(declaration)) {
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
      ExportNamedDeclaration: function (path, {exports}) {
        if (path.node[IGNORE_SYMBOL]) return;
        var declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          declaration.declarations.forEach(({id}) => {
            exports.set(id, id);
          });
        } else if (t.isFunctionDeclaration(declaration)) {
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
          path.node.specifiers.forEach(({exported, local}) => {
            exports.set(exported, local);
          });
        }
      }
    }
  };
}
