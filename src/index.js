// import PhotoApiService from './js/apiService.js';
import PhotoApiService from './js/asyncApi.js';
import galleryCardTpl from './templates/gallery-card.hbs';
import LoadMoreBtn from './js/load-more-btn.js';
import './sass/main.scss';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.js-gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

function onSearch(e) {
  e.preventDefault();
  clearGalleryList();
  photoApiService.query = e.currentTarget.elements.query.value;
  loadMoreBtn.show();
  photoApiService.resetPage();
  photoApiService.fetchPhotos().then(markupGalleryCard);
}

function onLoadMoreBtn() {
  loadMoreBtn.disable();
  photoApiService.fetchPhotos().then(markupGalleryCard);
  loadMoreBtn.enable();
  scroll();
}
function markupGalleryCard(photos) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryCardTpl(photos));
}

function clearGalleryList() {
  refs.galleryList.innerHTML = '';
}

function scroll() {
  setTimeout(() => {
    refs.galleryList.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 200);
}
