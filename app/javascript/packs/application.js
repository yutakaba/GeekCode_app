// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import Vue from 'vue'; // Vue.js 2.x のインポート
import HelloComponent from "../components/HelloComponent.vue"; // Vueコンポーネントのインポート

Rails.start();
Turbolinks.start();
ActiveStorage.start();

document.addEventListener("turbolinks:load", () => {
  const htmltextarea = document.getElementById("tweet_html");
  if (htmltextarea) {
    new EasyMDE({ element: htmltextarea });
  }

  const csstextarea = document.getElementById("tweet_css");
  if (csstextarea) {
    new EasyMDE({ element: csstextarea });
  }

  const jstextarea = document.getElementById("tweet_js");
  if (jstextarea) {
    new EasyMDE({ element: jstextarea });
  }

  const urltextarea = document.getElementById("tweet_url");
  if (urltextarea) {
    new EasyMDE({ element: urltextarea });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.navbar-toggler');
  const sidebar = document.querySelector('#sidebar');

  if (menuButton) {
    menuButton.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
  }

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

// Vue.jsの初期化コード
document.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("app");
  if (appElement) {
    new Vue({
      render: h => h(HelloComponent)
    }).$mount(appElement);
  }
});

