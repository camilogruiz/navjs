'use strict'

function menuStateClick(state) {
  document.getElementById("toggle-open").style.display = state ? "none" : "block";
  document.getElementById("toggle-close").style.display = state ? "block" : "none";
  document.getElementById("logo").style.display = state ? "block" : "none";
  document.getElementById("menu").style.width = state ? "275px" : "0";
  document.body.style.backgroundColor = state ? "rgba(0,0,0,0.4)" : "white";
}

function changeIcon (id, state) {
  document.getElementById(id).innerHTML = state ? "&#8743;" : "&#8744;";
  document.getElementById("image").style.backgroundColor = state ? rgba(0, 0, 0, 0.5): "";
}

function loadItemMenu(items) {
    let htmlJSON = '';
    
    for (let key in items) {
        if(items[key].items.length > 0) {
          htmlJSON += multipleItem(items[key]);
        } else {
          htmlJSON += singleItem(items[key]); 
        }
    }

    htmlJSON += "<div><p class='copyright'>© 2017 Huge. All Rights Reserved.</p></div>";

    const div = document.getElementById('menu');
    div.innerHTML += htmlJSON;
}

function singleItem(item) {
  let html = '';
  html += '<div>';
  html += `<a class="menu-button primary" href="${item.url}">${item.label}</a>`;
  html += '</div>'; 
  return html;
}

function multipleItem(item) {
  let html = '';
  html += '<div class="dropdown-wrapper menu-button">';
  html += `<a class="menu-button primary" href="${item.url}" onmouseover="changeIcon('${item.label}', true);" onmouseout="changeIcon('${item.label}', false);">${item.label}<span id="${item.label}" class="icon-sm">&#8744;</span></a>`;
  html += '<div class="drop-menu fade-in effect inner">';
  for (let key in item.items) {
    html += `<a class="menu-button secundary" href="${item.items[key].url}">${item.items[key].label}</a>`;
  }
  html += '</div>';
  html += '</div>'; 
  return html;
}

function loadMenu() {
  fetch('api/nav.json')
  .then(function(res){
    return res.json();
  })
  .then(function(res){
    loadItemMenu(res.items);
  })
}

loadMenu();