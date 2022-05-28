import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';
// import { getBooks, getSingleBook } from '../../../api/bookData';

const viewAuthor = (obj) => {
  clearDom();
  let domString = `
  <div class="text-white ms-5 details">
  <h5>${obj.authorObject.first_name} ${obj.authorObject.last_name} ${obj.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
  Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>
  <hr>`;
  obj.bookObject.forEach((item) => {
    domString += `
    <div class="text-white ms-5 details">
    <h5>${item.title} by ${item.authorObject.first_name} ${item.authorObject.last_name} ${item.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
    Author Email: <a href="mailto:${item.authorObject.email}">${item.authorObject.email}</a>
    <p>${item.description || ''}</p>
    <hr>
    <p>${item.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> 
      $${item.price}` : `$${item.price}`}</p>      
     </div>
   </div>
    `;
  });
  renderToDOM('#view', domString);
};

export default viewAuthor;
