import * as monaco from './esm/vs/editor/editor.main.js';

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    // if (label === 'json') {
    //   return './json.worker.bundle.js';
    // }
    // if (label === 'css') {
    //   return './css.worker.bundle.js';
    // }
    // if (label === 'html') {
    //   return './html.worker.bundle.js';
    // }
    if (label === 'typescript' || label === 'javascript') {
      return './esm/vs/language/typescript/ts.worker.js';
    }
    return './esm/vs/editor/editor.worker.js';
  },
};

monaco.editor.create(document.getElementById('container'), {
  value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
});
