export default function ({types: t}) {
  var restoreIdentifier = t.identifier('restore');
  var defaultIdentifier = t.identifier('default');

  return {
    visitor: {
      Program: {
        enter: function (path, state) {
          state.exports = [];
        },
        exit: function (path, state) {
          if (!state.exports.length) return;
          var vars = state.exports.map(e => t.variableDeclarator(e.temp, e.local));
          var assignments = state.exports.map(e => t.expressionStatement(t.assignmentExpression('=', e.local, e.temp)));
          path.pushContainer('body', [
            t.variableDeclaration('var', vars),
            t.functionDeclaration(restoreIdentifier, [], t.blockStatement(assignments)),
            t.exportNamedDeclaration(null, [t.exportSpecifier(restoreIdentifier, restoreIdentifier)])
          ]);
        }
      },
      ExportDefaultDeclaration: function (path, state) {
        var declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          state.exports.push({
            exported: defaultIdentifier,
            local: declaration,
            temp: path.scope.generateUidIdentifier('default')
          });
          path.replaceWith(t.exportNamedDeclaration(null, [
            t.exportSpecifier(declaration, defaultIdentifier)
          ]));
        } else if (t.isFunctionDeclaration(declaration)) {
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          state.exports.push({
            exported: defaultIdentifier,
            local: id,
            temp: path.scope.generateUidIdentifier('default')
          });
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.functionExpression(id, declaration.params, declaration.body, declaration.generator, declaration.async))
            ]),
            t.exportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ])
          ]);
        }
      },
      ExportNamedDeclaration: function (path, state) {
        var declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          declaration.declarations.forEach(d => {
            state.exports.push({
              exported: d.id,
              local: d.id,
              temp: path.scope.generateUidIdentifierBasedOnNode(d.id)
            });
          });
        }
      }
    }
  };
}
