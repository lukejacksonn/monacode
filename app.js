const search = new URLSearchParams(document.location.search.substring(1));
const overrides = Object.fromEntries(search);
const defaults = {
  container: document.querySelector('#editor'),
  minimap: { enabled: false },
  value: `
const values = { a: "1324568675432456", b: 8796574356789976543678, c: [2345678754435678754635], d: true }

const add = (x: number, y: number) => x + y;

let x = 1;
let y = 2;

const result = add(x, y)
console.log(result);

import { tw } from 'https://cdn.skypack.dev/twind'

document.body.innerHTML = \`
  <main class="\${tw\`h-screen bg-purple-400 flex items-center justify-center\`}">
    <h1 class="\${tw\`font-bold text(center 5xl white sm:gray-800 md:pink-700)\`}">This is Twind!</h1>
  </main>
\`

`.trim(),
};

import(
  window.location.hostname === 'localhost' ? './index.min.js' : './index.min.js'
).then((module) => {
  // Create a new editor and attatch to the document body
  const editor = module.default({ ...defaults, ...overrides });
  const compile = (src) => {
    const preview = document.querySelector('#preview');
    preview.src = `data:text/html;base64,${btoa(
      `<script type="module">${
        module.transform(src, { transforms: ['typescript'] }).code
      }</script>`
    )}`;
  };

  compile(defaults.value);
  // Listen for changes within the editor
  editor.getModel().onDidChangeContent((change) => {
    const val = editor.getValue();
    val && compile(val);
  });
});
