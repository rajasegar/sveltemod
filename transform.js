// import { preprocess } from 'svelte/compiler';
// import posthtml from 'posthtml';
const { preprocess } = require('svelte/compiler');

// export default async function transformer(file, api, options) {
module.exports = async function transformer(file, api, options) {
  // console.log(options);
  options.extensions = 'svelte';
  const { code } = await preprocess(
    file.source,
    {
      markup: ({ content, filename }) => {
        // console.log(content);
        // const pos = content.indexOf('foo');
        // if (pos < 0) {
        //   return { code: content };
        // }
        // const s = new MagicString(content, { filename });
        // s.overwrite(pos, pos + 3, 'bar', { storeName: true });
        // return {
        //   code: s.toString(),
        //   map: s.generateMap()
        // };
      },
      script: ({ content, attributes, filename }) => {
        const j = api.jscodeshift;
        const scriptSource = j(content);
        scriptSource
          .find(j.VariableDeclarator, {
            id: { name: 'bar' }
          })
          .forEach((path) => {
            path.value.id = 'foo';
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
  // console.log(code);
  return code;
};

// module.exports.parser = {
//   parse: function (source) {
//     const ast = compiler.parse(source, { filename: 'App.svelte' });
//     console.log(ast);
//     return ast;
//   }
// };
