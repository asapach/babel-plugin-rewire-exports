export default function ({types: t}) {
  return {
    visitor: {
      Program: function () {
      },
      ExportDefaultDeclaration: function (path) {
        if (t.isIdentifier(path.node.declaration)) {
          path.replaceWith(t.ExportNamedDeclaration(null, [
            t.exportSpecifier(path.node.declaration, t.identifier('default'))
          ]));
        }
      }
    }
  };
}
