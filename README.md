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
- v5/effect.js
- v5/props.js
- v5/state.js
