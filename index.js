import * as monaco from './esm/vs/editor/editor.main.js';

import prettier from './prettier.js';
import prettierPlugins from './prettier-babel.js';

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') return './esm/vs/language/json/json.worker.js';
    if (label === 'css') return './esm/vs/language/css/css.worker.js';
    if (label === 'html') return './esm/vs/language/html/html.worker.js';
    if (label === 'typescript' || label === 'javascript')
      return './esm/vs/language/typescript/ts.worker.js';
    return './esm/vs/editor/editor.worker.js';
  },
};

const computeOffset = (code, pos) => {
  let line = 1;
  let col = 1;
  let offset = 0;
  while (offset < code.length) {
    if (line === pos.lineNumber && col === pos.column) return offset;
    if (code[offset] === '\n') line++, (col = 1);
    else col++;
    offset++;
  }
  return -1;
};

const computePosition = (code, offset) => {
  let line = 1;
  let col = 1;
  let char = 0;
  while (char < offset) {
    if (code[char] === '\n') line++, (col = 1);
    else col++;
    char++;
  }
  return { lineNumber: line, column: col };
};

//   fetch('./theme.json')
//     .then((res) => res.json())
//     .then((data) => {
//       monaco.editor.defineTheme('theme', data);
//       monaco.editor.setTheme('theme');
//     });

const editor = monaco.editor.create(document.body, {
  value: `
  function x() {
    const x = 1;
    let y = 2;

    const zz = { a: 1324568675432456, b: 8796574356789976543678, c: 2345678754435678754635 }

    return x + y;
  }
    `,
  theme: 'vs-dark',
  language: 'javascript',
  formatOnType: false,
  fontSize: 20,
  tabSize: 2,
  minimap: {
    enabled: true,
  },
  scrollbar: {
    useShadows: false,
  },
});

window.onresize = function () {
  editor.layout();
};

const alt = (e) => (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey);
const hotKeys = (e) => {
  // Cdm + s
  if (alt(e) && e.keyCode == 83) {
    e.preventDefault();
    const val = editor.getValue();
    const pos = editor.getPosition();

    const prettyVal = prettier.formatWithCursor(val, {
      parser: 'babel',
      plugins: prettierPlugins,
      cursorOffset: computeOffset(val, pos),
    });

    editor.executeEdits('prettier', [
      {
        identifier: 'delete',
        range: editor.getModel().getFullModelRange(),
        text: '',
        forceMoveMarkers: true,
      },
    ]);
    editor.executeEdits('prettier', [
      {
        identifier: 'insert',
        range: new monaco.Range(1, 1, 1, 1),
        text: prettyVal.formatted,
        forceMoveMarkers: true,
      },
    ]);
    editor.setSelection(new monaco.Range(0, 0, 0, 0));
    editor.setPosition(
      computePosition(prettyVal.formatted, prettyVal.cursorOffset)
    );
  }
  // Cmd + p
  if (alt(e) && e.keyCode == 80) {
    editor.trigger('anyString', 'editor.action.quickCommand');
    e.preventDefault();
  }
};

addEventListener('keydown', hotKeys);
