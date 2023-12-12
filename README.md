# sveltemod
[![npm version](http://img.shields.io/npm/v/sveltemod.svg?style=flat)](https://npmjs.org/package/sveltemod 'View this project on npm')

A CLI to run codemods for Svelte
This project use [jscodeshift](https://github.com/facebook/jscodeshift)  underneath which allows this tool to leverage the standard codemod tooling for JavaScript in Svelte projects.

## Install
```
npm install -g sveltemod
```

## Usage
```
sveltemod <codemod> <file>
```

Example:
```
sveltemod transforms/v5-derived.js src/App.svelte
```

You can also use jscodeshift to run the codemods like:
```
jscodeshift --transform=./transforms/v5-derived.js --extensions=svelte ./src/App.svelte
```


## Available codemods:
### v5/derived.js

#### Before
```js
$: area = width * height;
```

#### After
```js
const area = $derived(width * height);
```

### v5/effect.js

#### Before
```js
$: console.log(area);
```

#### After
```js
$effect(() => {
    console.log(area);
});

```


### v5/props.js

#### Before
```js
export let width;
export let height;

```

#### After
```js
let { width, height } = $props();

```


### v5/state.js

#### Before
```js
let count = 0;
```

#### After
```js

let count = $state(0);
```

## Differences from svelte-migrate
- It uses jscodeshift underneath which is kind of standard tooling for codemods
- It completely uses AST based transforms instead of regex replacement which [svelte-migrate](https://github.com/sveltejs/kit/tree/master/packages/migrate) mostly uses
- You can run any Jscodeshift based transform available out there not just something comes with svelte-migrate
- Currently svelte-migrate doesn't have codemods for v5 or runes, I try to address that
- It is extendable with other transforms for html, css, sass and so on

## References:
- https://github.com/sveltejs/kit/discussions/5774
