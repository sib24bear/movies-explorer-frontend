class MainApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }

  errorsMessages(err) {
    if (err.status === 400) {
      return `Ошибка ${err.status}. Не верно заполнено одно из полей.`;
    } else if (err.status === 401) {
      return `Ошибка ${err.status}. Неправильные логин или пароль.`;
    } else if (err.status === 403) {
      return `Ошибка ${err.status}. Невалидный токен.`;
    } else if (err.status === 404) {
      return `Ошибка ${err.status}. Данные не найдены.`;
    } else if (err.status === 409) {
      return `Ошибка ${err.status}. Пользователь с таким-же email уже существует.`;
    } else if (err.status === 429) {
      return `Ошибка ${err.status}. Много запросов к серверу, пожалуйста подождите`;
    } else if (err.status === 500) {
      return `Ошибка ${err.status}. На сервере произошла ошибка.`;
    } else {
      return `Ошибка ${err.status}. Ошибка сервера.`;
    }
  }

  register(name, email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": email, "password": password, "name": name }),
      credentials: 'include'
    })
    .then(res => this._checkResponse(res))
  };
  
  login(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": email, "password": password}),
      credentials: 'include'
    })
    .then(res => this._checkResponse(res))
  };

  getSavedMovies() {
    return fetch(`${this._options.baseUrl}/movies`, {
      headers: this._options.headers,
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  }

  setNewSaveMovie(movie) {
    return fetch(`${this._options.baseUrl}/movies`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        country: movie.country || 'Не указано',
        director: movie.director || 'Не указано',
        duration: movie.duration || 0,
        year: movie.year || 'Не указано',
        description: movie.description || 'Не указано',
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU || 'Не указано',
        nameEN: movie.nameEN || 'Не указано'
      }),
      credentials: 'include'
    })
    .then(res => this._checkResponse(res))
  }

  deleteSaveMovie(movieId) {
    return fetch(`${this._options.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._options.headers,
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  }
  
  setUserInfo(name, email) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        email: email,
        name: name
      }),
      credentials: 'include'
    })
    .then(res => this._checkResponse(res))
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  //baseUrl: 'https://api.movies.diplom.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;