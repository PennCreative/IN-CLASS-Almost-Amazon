import { deleteBook, getSingleBook, authorsBooks } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import { viewBookDetails, viewAuthorDetails, deleteAuthorsBooks } from '../../api/mergedData';
import viewBook from '../components/pages/viewBook';
import viewAuthor from '../components/pages/viewAuthor';
import { getSingleAuthor } from '../../api/authorData';
import { showAuthors } from '../components/pages/authors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey, uid).then((booksArray) => showBooks(booksArray));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }
    // TODO: CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((authorObject) => viewAuthor(authorObject));
      authorsBooks(authorFirebaseKey).then((bookObject) => viewBook(bookObject));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');
        console.warn(firebaseKey);
        deleteAuthorsBooks(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm(uid);
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }
  });
};

export default domEvents;
