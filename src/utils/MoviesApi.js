class MoviesApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(res.status);
    }
  }

  getMovies() {
    return fetch(`${this._options.baseUrl}`)
    .then(res => this._checkResponse(res))
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});

export default moviesApi;