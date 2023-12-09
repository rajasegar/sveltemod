# sveltemod

A CLI to run codemods for Svelte

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


## Available codemods:
- v5/derived.js

### Before
```js
$: area = width * height;
```

### After
```js
const area = $derived(width * height);
```

- v5/effect.js

### Before
```js
$: console.log(area);
```

### After
```js
$effect(() => {
    console.log(area);
});

```


- v5/props.js

### Before
```js
export let width;
export let height;

```

### After
```js
let { width, height } = $props();

```


- v5/state.js

### Before
```js
let count = 0;
```

### After
```js

let count = $state(0);
```

