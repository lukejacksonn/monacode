# Monacode

> A thin es-module wrapper around the monaco editor and prettier

Exploring the feasibility of importing the monaco editor (which powers [VS Code](https://github.com/Microsoft/vscode)) and prettier modules directly into the browser; aiming to make it easier to bring a native like code editing experiences to web applications without a build step.

## Usage

```js
import monacode from 'https://unpkg.com/monacode';

const editor = monacode({
  container: document.body,
  value: 'const add = (x, y) => x + y;',
});
```

## License

Licensed under the [MIT](https://github.com/Microsoft/monaco-editor/blob/master/LICENSE.md) License.
