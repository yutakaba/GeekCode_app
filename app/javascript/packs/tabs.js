document.addEventListener("turbolinks:load", function() {
    // タブのイベントリスナー設定
    const tabs = document.querySelectorAll(".tablinks");
    tabs.forEach(tab => {
      tab.addEventListener("click", function(event) {
        const codeName = tab.getAttribute('data-code');
        const tabcontent = document.querySelectorAll(".tabcontent");
        const tablinks = document.querySelectorAll(".tablinks");
  
        // すべてのタブコンテンツを非表示
        tabcontent.forEach(content => content.style.display = "none");
  
        // すべてのタブのアクティブ状態を解除
        tablinks.forEach(link => link.classList.remove("active"));
  
        // クリックされたタブに対応するコンテンツを表示
        document.getElementById(codeName).style.display = "block";
  
        // クリックされたタブをアクティブ状態に
        tab.classList.add("active");
      });
    });
  });
  
  function openCode(evt, codeName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(codeName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.tablinks').forEach(tab => tab.click());
  });
  