// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

Rails.start()
Turbolinks.start()
ActiveStorage.start()

document.addEventListener("turbolinks:load", () => {
    const textarea = document.getElementById("tweet_body");
    if (textarea) {
      new EasyMDE({ element: textarea });
    }
});
  
document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.navbar-toggler');
  const sidebar = document.querySelector('#sidebar');

  menuButton.addEventListener('click', function () {
    sidebar.classList.toggle('open');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".submit-button");
  const form = document.querySelector("form");

  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      submitButton.classList.add("clicked");

      setTimeout(() => {
        form.submit();
      }, 600); // アニメーションの時間に合わせて遅延を調整

      setTimeout(() => {
        showSuccessMessage();
      }, 200); // クリックしてすぐに表示
    });
  }

  function showSuccessMessage() {
    const message = document.createElement("div");
    message.id = "success-message";
    message.innerText = "投稿が完了しました！";
    document.body.appendChild(message);
    message.style.display = "block";

    setTimeout(() => {
      message.style.display = "none";
      window.location.href = "/tweets"; // 投稿後にindexページに遷移
    }, 2000); // 2秒後にメッセージを非表示にして遷移
  }
});
