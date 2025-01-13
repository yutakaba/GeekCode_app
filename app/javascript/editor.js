import * as monaco from 'monaco-editor';

document.addEventListener('turbolinks:load', () => {
  const editorElement = document.getElementById('monaco-editor');
  if (editorElement) {
    const editor = monaco.editor.create(editorElement, {
      value: editorElement.dataset.content || '',
      language: 'javascript',
      theme: 'vs-dark'
    });

    const form = editorElement.closest('form');
    form.addEventListener('submit', () => {
      const contentInput = document.getElementById('tweet_body');
      contentInput.value = editor.getValue();
    });
  }
});
