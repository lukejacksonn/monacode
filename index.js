// import * as monaco from './esm/vs/editor/editor.main.js';
import * as monaco from './monacode.js';

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

fetch('./theme.json')
  .then((res) => res.json())
  .then((data) => {
    monaco.editor.defineTheme('theme', data);
    monaco.editor.setTheme('theme');
  });

const editor = monaco.editor.create(document.body, {
  value: ['\nfunction x() {', '\tconsole.log("Hello world!");', '}\n'].join(
    '\n'
  ),
  language: 'javascript',
  fontSize: 20,
  minimap: {
    enabled: false,
  },
});

window.onresize = function () {
  editor.layout();
};
