const API_KEY = '13787357-0d618ee77456142b0c554f1c2';
const BASE_URL = ' https://pixabay.com/api';

export default class PhotoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPhotos() {
    try {
      const response = await fetch(
        `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
      );

      const data = await response.json();
      this.incrementPage();
      return data.hits;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
