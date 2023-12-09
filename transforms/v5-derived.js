const { preprocess } = require('svelte/compiler');

module.exports = async function transformer(file, api, options) {
  console.log(options);
  options.extensions = 'svelte';
  const { code } = await preprocess(
    file.source,
    {
      markup: ({ content, filename }) => {},
      script: ({ content, attributes, filename }) => {
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
  console.log(code);
  return code;
};
