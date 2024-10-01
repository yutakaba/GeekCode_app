document.addEventListener("DOMContentLoaded", function() {
    const texts = ["npm install -g create-react-app", "create-react-app my-app", "cd my-app", "npm start"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    const typingElement = document.getElementById('typing');

    if (!typingElement) {
        console.error('Element with ID "typing" not found.');
        return;  // 要素が見つからない場合、ここで処理を終了
    }

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typingElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // 次の文への遅延
        } else {
            setTimeout(type, 120); // タイピングスピード
        }
    })();
});
