import $ from 'jquery';

import store from './store';

// html template functions
const headerTemplateHTML = () => {
  return `<h1>Bookmark App</h1>
  <form class="newBookmark">
    <button>New Bookmark!</button>
    <select>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </form>`;
};

const newBookMarkTemplate = () => {
  if (store.store.adding) {
    return `<form class="newBookMarkForm">
    <label for="url"></label><input type="text" class="url" id="url" required placeholder="https://example.com">
    <label for="title"></label><input type="text" class="title" id="title" required placeholder="name of bookmark">
    <ul>
      <li><button>1</button></li>
      <li><button>2</button></li>
      <li><button>3</button></li>
      <li><button>4</button></li>
      <li><button>5</button></li>
    </ul>
    <label for="desc"></label><textarea class="desc" id="desc" required placeholder="description"></textarea></form>`;
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