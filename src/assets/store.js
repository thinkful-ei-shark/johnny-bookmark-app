const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const addBookmark = function (bookmark) {
  this.store.bookmarks.push(bookmark);
};

export default {
  store,
  addBookmark
};