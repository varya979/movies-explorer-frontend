class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // GET '/users/me' - получение пользователя
  getMyUser() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // PATCH '/users/me' - обновление профиля пользователя
  updateUser(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // GET '/movies' - получение всех СОХРАНЕННЫХ пользователем фильмов
  getMovies() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // POST '/movies' - создаёт фильм с переданными в теле: country, director, duration,
  // year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
  postMovie(movie) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  // DELETE '/movies/_id' - удаление карточки
  deleteMovie(movieId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new MainApi({
  // url: "https://api.varya-diploma.nomoredomains.rocks",
  url: "http://localhost:3000",
});

export default api;
