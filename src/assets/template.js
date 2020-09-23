import $ from 'jquery';

import store from './store';

// html template functions
const headerTemplateHTML = () => {
  return `<h1>Bookmark App</h1>
  <form class="newBookmark">
  <button>New Bookmark!</button>
  <select></select>
  </form>`;
};

const newBookMarkTemplate = () => {
  if (store.store.adding) {
    return `<form class="newBookMarkForm">
    <label for="urlInput"></label><input type="text" class="urlInput" id="urlInput" required value="example.com">
    <label for="titleInput"></label><input type="text" class="titleInput" id="titleInput" required value="name of bookmark">
    <label for="descriptionInput"></label><input type="text" class="descriptionInput" id="descriptionInput" required value="description"></form>`;
  } else {
    return '';
  }

};



// html render functions
const render = function () {
  let page = headerTemplateHTML();
  page += newBookMarkTemplate();


  $('main').html(page);
};

// handlers
const newBookmarkHandler = () => {
  $('main').on('submit', '.newBookmark', () => {
    store.store.adding = !store.store.adding;
    render();
  });
};

const bindEventHandlers = () => {
  newBookmarkHandler();
};

// export



export default {
  render,
  bindEventHandlers
};