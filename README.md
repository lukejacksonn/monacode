# Monacode

> A thin es-module wrapper around the monaco editor and prettier

Exploring the feasibility of importing the [monaco-editor](https://github.com/Microsoft/monaco-editor) (which powers VS Code) and [prettier](https://github.com/prettier/prettier) modules directly into the browser; aiming to make it _one line easy_ to bring a native like code editing experiences to web applications without a build step.

Ships with all the features usually found in VS Code out of the box: things like code hints, type inference, minimap, command pallet, multi-cursor select, find and replace, code folding etc.

In addition to these features, prettier has been integrated so that hitting `⌘ + s` will format the code.

<img width="100%" alt="monacode-demo" src="https://user-images.githubusercontent.com/1457604/100519495-1efed180-3190-11eb-9116-0bf1a619e08b.gif" />

> ⚡️ Check out the hosted version at https://monacode.live

## Usage

Install the module as an npm module and import it using the bare module specifier, or import it directly from unpkg:

```js
import monacode from 'https://unpkg.com/monacode/index.min.js'; // 976Kb brotli

// Create a new editor and attach to the document body
const editor = monacode({
  container: document.body,
  value: 'const add = (x, y) => x + y;',
});

// Listen for changes within the editor
editor.getModel().onDidChangeContent((change) => {
  const newValue = editor.getValue();
  console.log(newValue);
});
```

It is also possible to embed the editor into your application using an iframe (see [demo](https://esm.codes/#Ly8gU2ltcGxlIG1vbmFjb2RlIGV4YW1wbGUgQGx1a2VqYWNrc29ubgovLyAtLS0tLS0tLS0tLS0tLS0tCiAgICAKaW1wb3J0IHsgcmVuZGVyLCBodG1sIH0gZnJvbSAnaHR0cHM6Ly9ucG0ucmV2ZXJzZWh0dHAuY29tL3ByZWFjdCxwcmVhY3QvaG9va3MsaHRtL3ByZWFjdCc7CgpyZW5kZXIoaHRtbGAKICA8aWZyYW1lCiAgICB3aWR0aD0iMTAwJSIKICAgIGhlaWdodD0iMTAwJSIKICAgIGZyYW1lQm9yZGVyPSIwIgogICAgc3JjPSJodHRwczovL21vbmFjb2RlLmxpdmU/dGhlbWU9dnMtZGFyayIKICAvPgpgLCBkb2N1bWVudC5ib2R5KQ==)):

```html
<iframe
  src="https://monacode.live?theme=vs-light&value=console.log('hey')"
></iframe>
```

Pass config options into the iframe as URL search parameters, making sure to URI encode values properly. Please note however, it is not currently possible to pass in nested config options.

## API

The module exports a single default function which accepts a config object as an argument. The supplied config gets merged with a [default config](index.js#L51) which itself is a subset of the options available to configure moanco editors. Some useful values to know include:

- `container`: an HTML element that exists in the DOM (or a `ref` if using react/preact)
- `value`: a string representing the initial code to be rendered within the editor
- `language`: a string representing what language the editor should try syntax highlight and hint for
- `fontSize`: a number indicating what pixel font size code should render at
- `theme`: a string identifier of the desired theme or a url to a theme json file

Calling the default export returns an instance of the underlying monaco editor. Find out more about how to interact with the editor by reading the [API documentation](https://microsoft.github.io/monaco-editor/api/index.html).

## Development

Running the following command from the root of this project uses [`servor`](https://github.com/lukejacksonn/servor) to start a dev server, then open your editor and browser on the appropriate localhost url.

```bash
npm start
```

## Production

Running the following command from the root of this project uses [`esbuild`](https://github.com/evanw/esbuild) build the source to a single `index.min.js` file. Currently this process takes ~1second and results in an output file weighing 4.6MB (commpresses down to less than 1MB with brotli).

```bash
npm run build
```

## License

Licensed under the [MIT](https://github.com/Microsoft/monaco-editor/blob/master/LICENSE.md) License.
