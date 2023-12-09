const { preprocess } = require('svelte/compiler');

module.exports = async function transformer(file, api, options) {
  console.log(options);
  options.extensions = 'svelte';
  const { code } = await preprocess(
    file.source,
    {
      markup: ({ content, filename }) => {},
      script: ({ content, attributes, filename }) => {
        const j = api.jscodeshift;
        const root = j(content);
        const body = root.get().value.program.body;

        const props = [];
        root
          .find(j.ExportNamedDeclaration, {
            declaration: { kind: 'let' }
          })
          .forEach((path) => {
            const [decl] = path.value.declaration.declarations;
            props.push(decl.id.name);
          })
          .remove();

        const objectProps = props.map((p) =>
          j.objectProperty(j.identifier(p), j.identifier(p))
        );

        body.unshift(
          j.variableDeclaration('let', [
            j.variableDeclarator(
              j.objectPattern(objectProps),
              j.callExpression(j.identifier('$props'), [])
            )
          ])
        );

        console.log(root.toSource());
        return {
          code: root.toSource()
        };
      },
      style: ({ content, attributes, filename }) => {
        // console.log(content);
      }
    },
    { filename: 'App.svelte' }
  );
  console.log(code);
  return code;
};
