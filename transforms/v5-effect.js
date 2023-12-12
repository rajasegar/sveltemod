const { preprocess } = require('svelte/compiler');

module.exports = async function transformer(file, api, options) {
  options.extensions = 'svelte';
  const { code } = await preprocess(
    file.source,
    {
      markup: ({ content, filename }) => {},
      script: ({ content, attributes, filename }) => {
        const j = api.jscodeshift;
        const root = j(content);

        root
          .find(j.LabeledStatement, {
            body: { expression: { type: 'CallExpression' } }
          })
          .replaceWith((path) => {
            return j.expressionStatement(
              j.callExpression(j.identifier('$effect'), [
                j.arrowFunctionExpression(
                  [],
                  j.blockStatement([path.value.body])
                )
              ])
            );
          });

        // console.log(root.toSource());
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
  return code;
};
