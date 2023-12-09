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
        const scriptSource = j(content);
        scriptSource
          .find(j.VariableDeclaration, {
            kind: 'let'
          })
          .forEach((path) => {
            const [declarator] = path.value.declarations;
            declarator.init = j.callExpression(j.identifier('$state'), [
              declarator.init
            ]);
          });
        // console.log(scriptSource.toSource());
        return {
          code: scriptSource.toSource()
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
