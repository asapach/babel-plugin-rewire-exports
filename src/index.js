export default function ({types: t}) {
  var restoreIdentifier = t.identifier('restore');
  var defaultIdentifier = t.identifier('default');
  var IGNORE_SYMBOL = Symbol();

  function buildNamedExport(local, exported) {
    var node = t.exportNamedDeclaration(null, [
      t.exportSpecifier(local, exported)
    ]);
    node[IGNORE_SYMBOL] = true;
    return node;
  }

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
            t.exportNamedDeclaration(t.functionDeclaration(restoreIdentifier, [], t.blockStatement(assignments)), [])
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
          path.replaceWith(buildNamedExport(declaration, defaultIdentifier));
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
            buildNamedExport(id, defaultIdentifier)
          ]);
        }
      },
      ExportNamedDeclaration: function (path, state) {
        if (path.node[IGNORE_SYMBOL]) return;
        var declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          declaration.declarations.forEach(d => {
            state.exports.push({
              exported: d.id,
              local: d.id,
              temp: path.scope.generateUidIdentifierBasedOnNode(d.id)
            });
          });
        } else {
          path.node.specifiers.forEach(s => {
            state.exports.push({
              exported: s.exported,
              local: s.local,
              temp: path.scope.generateUidIdentifierBasedOnNode(s.local)
            });
          });
        }
      }
    }
  };
}
