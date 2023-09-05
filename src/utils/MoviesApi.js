class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, { headers: this._headers }).then((res) => {
      return this._checkAnswer(res);
    });
  }
}

const apiMovies = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiMovies;
