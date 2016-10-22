import template from 'babel-template';

export default function ({types: t}) {
  var restoreIdentifier = t.identifier('restore');
  var defaultIdentifier = t.identifier('default');

  const restore = template(`
    function restore() {
      BODY
    }
  `);

  return {
    visitor: {
      Program: {
        enter: function (path, state) {
          state.exports = [];
        },
        exit: function (path, state) {
          if (!state.exports.length) return;
          var vars = state.exports.map(e => t.variableDeclarator(e.temp, e.local));
          var restoreFunction = restore({
            BODY: state.exports.map(e => t.assignmentExpression('=', e.local, e.temp))
          });
          path.pushContainer('body', [
            t.variableDeclaration('var', vars),
            restoreFunction,
            t.ExportNamedDeclaration(null, [t.exportSpecifier(restoreIdentifier, restoreIdentifier)])
          ]);
        }
      },
      ExportDefaultDeclaration: function (path, state) {
        var declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          state.exports.push({
            name: 'default',
            local: declaration,
            temp: path.scope.generateUidIdentifier('default')
          });
          path.replaceWith(t.ExportNamedDeclaration(null, [
            t.exportSpecifier(declaration, defaultIdentifier)
          ]));
        } else if (t.isFunctionDeclaration(declaration)) {
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          state.exports.push({
            name: 'default',
            local: id,
            temp: path.scope.generateUidIdentifier('default')
          });
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.functionExpression(id, declaration.params, declaration.body, declaration.generator, declaration.async))
            ]),
            t.ExportNamedDeclaration(null, [
              t.exportSpecifier(id, defaultIdentifier)
            ])
          ]);
        }
      }
    }
  };
}
