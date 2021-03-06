import axios from 'axios';
import firebaseConfig from './apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      // EXPECTING AN ARRAY BC SHOW BOOKS IN BOOKS.JS IS TELLING USING
      // WE NEED TO PASS IN AN EMPTY ARRAY SO THAT THIS WON'T BREAK DUE TO NULL
      getBooks().then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// TODO: CREATE BOOK
const createBook = (bookObj, uid) => new Promise((resolve, reject) => {
  // PASSING IN PAYLOAD
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
    // Patch also needs a payload
    // Patch is updating so it needs a payload
      const bodyPayload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${bodyPayload.firebaseKey}.json`, bodyPayload)
        .then(() => {
          getBooks(uid).then(resolve);
        });
    }).catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (bookObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(() => getBooks(uid).then(resolve))
    .catch(reject);
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  getBooks(uid)
    .then((userBooks) => {
      const favBooks = userBooks.filter((book) => book.sale);
      resolve(favBooks);
    }).catch((error) => reject(error));
});
// TODO: FILTER AUTHOR'S BOOKS
const authorsBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// TODO: STRETCH...SEARCH BOOKS

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  authorsBooks
};
