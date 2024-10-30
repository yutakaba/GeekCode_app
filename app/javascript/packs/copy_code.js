document.addEventListener('turbolinks:load', () => {
    const copyButtons = document.querySelectorAll('.copy-button');
  
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const codeBlock = button.previousElementSibling.textContent;
  
        navigator.clipboard.writeText(codeBlock)
          .then(() => {
            alert('コピー完了');
          })
          .catch(err => {
            alert('コピーに失敗しました: ' + err);
          });
      });
    });
  });
  