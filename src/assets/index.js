import '../index.css';

import $ from 'jquery';
import template from './template';
import api from './api';
import store from './store';


const main = function () {
  api.getBookmarks()
    .then(bookmarks => {
      bookmarks.forEach(bookmark => store.addBookmark(bookmark));
      store.addProp();
      template.render();
    });

  template.render();
  template.bindEventHandlers();
};

$(main);