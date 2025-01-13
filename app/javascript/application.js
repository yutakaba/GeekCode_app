// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import showdown from 'showdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 
import Vue from 'vue'; // Vue.js 2.x のインポート
import HelloComponent from "./components/HelloComponent.vue"; // Vueコンポーネントのインポート
import './copy_code';
import "./tabs"



Rails.start();
Turbolinks.start();
ActiveStorage.start();

document.addEventListener('turbolinks:load', () => {
  const markdownEditors = document.querySelectorAll('.markdown-editor');

  markdownEditors.forEach(editor => {
    // エディタIDからfield名を抽出
    const field = editor.id.split('_')[1]; // 例: markdown_html -> html
    const preview = document.querySelector(`#preview_${field}`);
    
    console.log(`Editor ID: ${editor.id}`);  // ログ: markdown_html, markdown_css など
    console.log(`Field: ${field}`);  // ログ: html, css など
    console.log(`Preview Element: ${preview}`);  // プレビューエリアがnullの場合はエラー
    
    if (!preview) {
      console.error(`プレビュー要素が見つかりません: #preview_${field}`);
      return; // プレビュー要素が見つからない場合は処理を中断
    }

    const converter = new showdown.Converter();

    editor.addEventListener('input', () => {
      const html = converter.makeHtml(editor.value);
      preview.innerHTML = html;
    });

    // 初期表示時にプレビューを更新
    const initialHtml = converter.makeHtml(editor.value);
    preview.innerHTML = initialHtml;
  });
});


document.addEventListener('turbolinks:load', () => {
  const markdownEditors = document.querySelectorAll('.markdown-editor');

  markdownEditors.forEach(editor => {
    const field = editor.id.split('_')[1];
    const preview = document.querySelector(`#preview_${field}`);
    const converter = new showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });

    editor.addEventListener('input', () => {
      const html = converter.makeHtml(editor.value);
      preview.innerHTML = html;

      // コードブロックのシンタックスハイライトを適用
      preview.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    });

    // 初期表示時にプレビューを更新
    const initialHtml = converter.makeHtml(editor.value);
    preview.innerHTML = initialHtml;

    // コードブロックのシンタックスハイライトを適用
    preview.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
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

