document.addEventListener("turbolinks:load", function() {
  const toggleButton = document.getElementById('togglePreview');
  const cheatsheet = document.getElementById('markdown-cheatsheet');
  const editors = document.querySelectorAll('.markdown-editor');

  // 必要な要素が存在するか確認
  if (!toggleButton || !cheatsheet) {
    console.error('必要な要素が見つかりませんでした:', {
      toggleButton,
      cheatsheet
    });
    return;
  }

  // イベントリスナーを設定
  toggleButton.addEventListener('click', togglePreview);

  // togglePreview関数を定義
  function togglePreview() {
    if (typeof marked !== 'function') {
      console.error('marked.js が読み込まれていないか、marked が関数ではありません。');
      return;
    }

    const isCheatsheetVisible = cheatsheet.style.display === 'block' || cheatsheet.style.display === '';

    if (isCheatsheetVisible) {
      // プレビューを表示
      cheatsheet.style.display = 'none';

      editors.forEach(editor => {
        const fieldId = editor.id.replace('tweet_', '');
        console.log('Processing field:', fieldId);
        const previewPane = document.getElementById('preview_' + fieldId);
        console.log('Preview pane:', previewPane);

        if (previewPane) {
          previewPane.style.display = 'block';
          // コードブロックとしてテキストをマークダウンに変換
          const markdownText = '```' + fieldId + '\n' + editor.value + '\n```';
          console.log('Generated markdownText:', markdownText);
          previewPane.innerHTML = marked(markdownText);
        } else {
          console.error(`プレビューパネルが見つかりません: ${fieldId}`);
        }
      });
    } else {
      // チートシートを表示
      cheatsheet.style.display = 'block';

      editors.forEach(editor => {
        const fieldId = editor.id.replace('tweet_', '');
        const previewPane = document.getElementById('preview_' + fieldId);
        if (previewPane) {
          previewPane.style.display = 'none';
          previewPane.innerHTML = ''; // プレビュー内容をクリア
        }
      });
    }
  }
});
