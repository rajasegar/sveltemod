#!/usr/bin/env node

const { run: jscodeshift } = require('jscodeshift/src/Runner');
const path = require('node:path');

require('yargs')
  .scriptName('sveltemod')
  .usage('$0 <transform> <path> [args]')
  .command(
    '* [transform] [path]',
    'Run Svelte Codemods!',
    (yargs) => {
      yargs.positional('transform', {
        type: 'string',
        describe: 'The codemod to run'
      });
      yargs.positional('path', {
        type: 'string',
        describe: 'The path where Svelte files are located'
      });
    },
    function (argv) {
      // console.log(argv);
      const transformPath = path.resolve(argv.transform);
      const paths = [argv.path];
      const options = {
        // dry: true,
        // print: true,
        // verbose: 1,
        extensions: 'svelte'
      };

      jscodeshift(transformPath, paths, options);
    }
  )
  .demandOption(['transform', 'path'], 'Please provide both transform and path')
  .help().argv;
