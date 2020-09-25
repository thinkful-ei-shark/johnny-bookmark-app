const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const addProp = () => {
  return store.bookmarks.map(bookmark => {
    return bookmark.expanded = false;
  });
};

const findById = function (id) {
  return this.store.bookmarks.find(bookmark => bookmark.id === id);
};

const bookmarkExpandToggle = function (id) {
  let foundBookmark = this.store.bookmarks.find(bookmark => bookmark.id === id);
  foundBookmark.expanded = !foundBookmark.expanded;
  console.log(foundBookmark);
};

const addBookmark = function (bookmark) {
  this.store.bookmarks.push(bookmark);
  console.log(store.bookmarks);
};

const deleteBookmark = function (id) {
  this.store.bookmarks = this.store.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const setFilter = function (filter) {
  this.store.filter = filter;
  console.log('this is the store filter', this.store.filter);
};

const setError = function (error) {
  this.error = error;
};

export default {
  store,
  addBookmark,
  setError,
  findById,
  deleteBookmark,
  addProp,
  bookmarkExpandToggle,
  setFilter
};