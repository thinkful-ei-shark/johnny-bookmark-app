const BASE_URL = 'https://thinkful-list-api.herokuapp.com/johnnyjuarez/bookmarks';

const listApiFetch = (...args) => {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getBookmarks = () => {
  return listApiFetch(`${BASE_URL}`);
};

const createBookmark = (newBookmark) => {
  const options = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: newBookmark
  };
  return listApiFetch(`${BASE_URL}`, options);
};

const deleteBookmark = (id) => {
  return listApiFetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};


export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
};