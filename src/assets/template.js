import $ from 'jquery';
import api from './api';

import store from './store';

// html template functions
const headerTemplateHTML = () => {
  // const selectedFilterNum = store.store.filter;
  return `<h1>Bookmark App</h1>
  <form class="newBookmark">
    <button>New Bookmark!</button>
    <div class="ratingFilterContainer">
    <p>Select a rating to filter by:</p>
    <select class="ratingFilter">
      <option value="1">1 or higher</option>
      <option value="2">2 or higher</option>
      <option value="3">3 or higher</option>
      <option value="4">4 or higher</option>
      <option value="5">5 + </option>
    </select>
    </div>
  </form>`;
};

const newBookmarkTemplate = () => {
  if (store.store.adding) {
    return `<form class="newBookmarkForm">
    <label for="url">URL Address: </label><input type="url" name="url" min-length="5"  class="url" id="url" required placeholder="https://example.com">
    <label for="title">Title of Bookmark: </label><input type="text" name="title" class="title" id="title" min-length="1" required placeholder="name of bookmark">
    <label for="rating">Rating</label>
    <select name="rating">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
    <label for="desc">Description: </label><textarea name="desc" class="desc" id="desc" required placeholder="description"></textarea>
    <label for="newBookmarkSubmit"></label><input class="newBookmarkSubmit" type="submit" value="submit">
    </form>`;
  } else {
    return '';
  }
};

const generateBookmarks = (bookmark) => {
  let expandToggle = 'Expand';

  const initRating = [];

  for (let i = 0; i < bookmark.rating; i++) {
    initRating.push('<i class="fas fa-meteor"></i>');
  }


  let html = `<li class="bookmark-item" data-bookmark-id="${bookmark.id}" id=${bookmark.id}>
  <h2 class="bookmark-title">${bookmark.title}</h2>
  <p class="bookmark-rating">Rating: <span>${initRating.join('')}</span></p>
  <button class="expandToggle">${expandToggle}</button>`;

  if (bookmark.expanded === true) {
    expandToggle = 'Collapse';
    html = `<li class="bookmark-item" data-bookmark-id="${bookmark.id}" id=${bookmark.id}>
    <h2 class="bookmark-title">${bookmark.title}</h2>
    <p class="bookmark-rating">Rating: <span>${initRating.join('')}</span></p>
    <button class="expandToggle">${expandToggle}</button>
    <p class="bookmark-desc">${bookmark.desc}</p>
    <a class="bookmark-url" href="${bookmark.url}">Visit Site</a>
    <div class="bookmark-controls">
      <button class="bookmark-delete">Delete</button>
    </div>
    </li>
    `;
  }





  return html;
};

const generateBookmarkItems = (bookmarkList) => {
  let filteredBookmarkList;
  for (let i = 0; i < bookmarkList.length; i++) {
    if (store.store.filter > 0) {
      filteredBookmarkList = bookmarkList.filter(bookmark => bookmark.rating >= store.store.filter);
    } else {
      filteredBookmarkList = bookmarkList;
    }
  }
  const bookmarks = filteredBookmarkList.map(bookmark => generateBookmarks(bookmark));
  return bookmarks.join('');
};


// html render functions
const render = function () {
  let page = headerTemplateHTML();
  page += newBookmarkTemplate();
  if (store.store.bookmarks.length > 0) {
    page += `<ul>${generateBookmarkItems(store.store.bookmarks)}</ul>`;
  }

  $('main').html(page);
  $('.ratingFilter').val(`${store.store.filter}`);
};

// element id find
const getBookmarkItemID = function (bookmark) {
  return $(bookmark).closest('.bookmark-item').data('bookmark-id');
};

// handlers
$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

const newBookmarkSubmitHandler = function () {
  $('main').on('submit', '.newBookmarkForm', function (e) {
    e.preventDefault();
    let newBookmark = $(e.target).serializeJson();
    api.createBookmark(newBookmark)
      .then(bookmark => {
        store.addBookmark(bookmark);
        render();
      })
      .catch(err => {
        store.setError(err.message);
      });
    store.store.adding = !store.store.adding;
  });
};

const newBookmarkHandler = () => {
  $('main').on('submit', '.newBookmark', () => {
    store.store.adding = !store.store.adding;
    render();
  });
};

const deleteHandler = () => {
  $('main').on('click', '.bookmark-delete', function (e) {
    const id = getBookmarkItemID(e.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.deleteBookmark(id);
        render();
      })
      .catch(err => {
        store.setError(err.message);
      });
  });
};

const expandToggleHandler = () => {
  $('main').on('click', '.expandToggle', function (e) {
    const id = getBookmarkItemID(e.currentTarget);
    store.bookmarkExpandToggle(id);
    render();
  });
};

const filterRatingHandler = () => {
  $('main').on('change', '.ratingFilter', function (e) {
    const ratingFilter = $(e.currentTarget).val();
    store.setFilter(ratingFilter);
    render();
  });
};

const bindEventHandlers = () => {
  newBookmarkHandler();
  newBookmarkSubmitHandler();
  deleteHandler();
  expandToggleHandler();
  filterRatingHandler();
};

// export



export default {
  render,
  bindEventHandlers,

};