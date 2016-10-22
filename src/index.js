export default function ({types: t}) {
  return {
    visitor: {
      Program: function () {
      },
      ExportDefaultDeclaration: function (path) {
        var declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          path.replaceWith(t.ExportNamedDeclaration(null, [
            t.exportSpecifier(declaration, t.identifier('default'))
          ]));
        } else if (t.isFunctionDeclaration(declaration)) {
          const id = declaration.id || path.scope.generateUidIdentifier('default');
          path.replaceWithMultiple([
            t.variableDeclaration('var', [
              t.variableDeclarator(id, t.functionExpression(id, declaration.params, declaration.body, declaration.generator, declaration.async))
            ]),
            t.ExportNamedDeclaration(null, [
              t.exportSpecifier(id, t.identifier('default'))
            ])
          ]);
        }
      }
    }
  };
}
