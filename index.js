import * as monaco from './src/monaco/editor/editor.main.js';

export { transform } from 'sucrase';
const sheet = document.createElement('style');
document.head.appendChild(sheet);

sheet.innerHTML = '.monaco-editor { display: none; }';

fetch('./src/index.css')
  .then((res) => res.text())
  .then((styles) => (sheet.innerHTML = styles));

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') return './src/monaco/language/json/json.worker.js';
    if (label === 'css') return './src/monaco/language/css/css.worker.js';
    if (label === 'html') return './src/monaco/language/html/html.worker.js';
    if (label === 'typescript' || label === 'javascript')
      return './src/monaco/language/typescript/ts.worker.js';
    return './src/monaco/editor/editor.worker.js';
  },
};

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true,
});

monaco.languages.registerDocumentFormattingEditProvider('typescript', {
  async provideDocumentFormattingEdits(model) {
    const prettier = await import('prettier/standalone');
    const typescript = await import('prettier/parser-typescript');
    const text = prettier.format(model.getValue(), {
      parser: 'typescript',
      plugins: [typescript],
      singleQuote: true,
    });

    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ];
  },
});

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

// const compilerOptions = {
//   // allowJs: true,
//   // allowSyntheticDefaultImports: true,
//   // alwaysStrict: true,
//   jsx: 2,
//   jsxFactory: 'React.createElement',
// };

// monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
//   compilerOptions
// );
// monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
//   compilerOptions
// );

const editorDefaults = {
  value: '',
  language: 'typescript',
  theme: 'vs-dark',
  formatOnType: false,
  fontSize: 16,
  tabSize: 2,
  lineNumbersMinChars: 3,
  minimap: {
    enabled: true,
  },
  scrollbar: {
    useShadows: false,
  },
  mouseWheelZoom: true,
};

const extraLibs = new Map();

export default (options) => {
  const { container, ...restOfOptions } = options;

  const editor = monaco.editor.create(container, {
    ...editorDefaults,
    ...restOfOptions,
  });

  // const addTypings = ({ typings }) => {
  //   Object.keys(typings).forEach((path) => {
  //     let extraLib = extraLibs.get(path);

  //     extraLib && extraLib.dispose();
  //     extraLib = monaco.languages.typescript.javascriptDefaults.addExtraLib(
  //       typings[path],
  //       path
  //     );

  //     extraLibs.set(path, extraLib);
  //   });
  // };

  // // Intialize the type definitions worker
  // const typingsWorker = new Worker('./typings.js');
  // typingsWorker.addEventListener('message', ({ data }) => addTypings(data));

  // // Fetch some definitions
  // const dependencies = {
  //   react: '16.3.1',
  // };

  // Object.keys(dependencies).forEach((name) =>
  //   typingsWorker.postMessage({
  //     name,
  //     version: dependencies[name],
  //   })
  // );

  // const updateDecorations = async (classifications) => {
  //   console.log(classifications);
  //   const decorations = classifications.map((classification) => ({
  //     range: new monaco.Range(
  //       classification.startLine,
  //       classification.start,
  //       classification.endLine,
  //       classification.end
  //     ),
  //     options: {
  //       inlineClassName: classification.type
  //         ? `${classification.kind} ${classification.type}-of-${classification.parentKind}`
  //         : classification.kind,
  //     },
  //   }));

  //   const modelInfo = await editor.getModel();
  //   modelInfo.decorations = editor.deltaDecorations(
  //     modelInfo.decorations || [],
  //     decorations
  //   );
  // };

  // const syntaxWorker = new Worker('./syntax-highlighter.js');
  // syntaxWorker.addEventListener('message', (event) => {
  //   const { classifications, version } = event.data;
  //   requestAnimationFrame(() => {
  //     if (editor.getModel()) {
  //       if (version === editor.getModel().getVersionId()) {
  //         updateDecorations(classifications);
  //       }
  //     }
  //   });
  // });

  // Import themes directly from the amazing collection by @brijeshb42
  // https://raw.githubusercontent.com/brijeshb42/monaco-themes/master/themes

  if (options.theme === 'vs-light') container.style.backgroundColor = '#fff';
  if (options.theme?.startsWith('http') || options.theme?.startsWith('./'))
    fetch(options.theme)
      .then((res) => res.json())
      .then((data) => {
        monaco.editor.defineTheme('theme', data);
        monaco.editor.setTheme('theme');
        container.style.backgroundColor = data.colors['editor.background'];
      });

  addEventListener('resize', function () {
    editor.layout();
  });

  const alt = (e) => (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey);
  const hotKeys = (e) => {
    // Cdm + s formats with prettier
    if (alt(e) && e.keyCode == 83) {
      e.preventDefault();
      const val = editor.getValue();

      // syntaxWorker.postMessage({
      //   code: val,
      //   title: '',
      //   version: editor.getModel().getVersionId(),
      // });

      editor.getAction('editor.action.formatDocument').run();
      options.onSave && options.onSave(val);
    }
    // Cmd + p opens the command palette
    if (alt(e) && e.keyCode == 80) {
      editor.trigger('anyString', 'editor.action.quickCommand');
      e.preventDefault();
    }
    // Cmd + d prevents browser bookmark dialog
    if (alt(e) && e.keyCode == 68) {
      e.preventDefault();
    }
  };

  container.addEventListener('keydown', hotKeys);

  return editor;
};
