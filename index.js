const { run: jscodeshift } = require('jscodeshift/src/Runner');
const path = require('node:path');

const transformPath = path.resolve('transforms/v5-props.js');
const paths = ['sample'];
const options = {
  // dry: true,
  // print: true,
  // verbose: 1,
  extensions: 'svelte'
  // ...
};

(async () => {
  const res = await jscodeshift(transformPath, paths, options);
  // console.log(res);
})();

/*
{
  stats: {},
  timeElapsed: '0.001',
  error: 0,
  ok: 0,
  nochange: 0,
  skip: 0
}
*/
