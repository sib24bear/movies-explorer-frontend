import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const body = document.body;
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const [searchingKeyWord, setSearchingKeyWord] = useState('');
  const [searchingMoviesList, setSearchingMoviesList] = useState([]);
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [savedFiltredMoviesList, setSavedFiltredMoviesList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [runPreloader, setRunPreloader] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isFiltredSavedMovie, setIsFiltredSavedMovie] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const history = useHistory();

  function disableScroll() {
    isMenuOpen ? body.classList.add("no-scroll") : body.classList.remove("no-scroll");
  }

  function declOfNum(n, titles) {
  	return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
	}

  function handleRegister(name, email, password) {
    return mainApi.register(name, email, password).then((res) => {
      if (res.ok) {
        setInfoMessage('Успешно зарегистрировались!');
        handleLogin(email, password);
        return res.json();
      }
    })
    .catch(err => {
      setInfoMessage(mainApi.errorsMessages(err));
      console.log(err);
    });
  }

  function handleLogin(email, password) {
    return mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          setInfoMessage('Добро пожаловать!');
          localStorage.setItem('jwt', data.token);
          tokenCheck();
        }
      })
      .catch(err => {
        setInfoMessage(mainApi.errorsMessages(err));
        console.log(err);
      });
  }

  function handleEditProfile(name, email) {
    mainApi.setUserInfo(name, email)
      .then((data) => {
        setInfoMessage('Профиль изменен!');
        setCurrentUser(data.user);
      })
      .catch(err => {
        setInfoMessage(mainApi.errorsMessages(err));
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchingData');
    setMoviesList([]);
    setFiltredMoviesList([]);
    setSearchingMoviesList([]);
    setSavedMoviesList([]);
    setSavedFiltredMoviesList([]);
    setInfoMessage('');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      mainApi.getUserInfo()
      .then((res) => {
        if (res){
          setCurrentUser(res.user);
          setLoggedIn(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  function getSearchingData() {
    if (localStorage.getItem('searchingData')) {
      const searchingData = JSON.parse(localStorage.getItem('searchingData'));

      setSearchingMoviesList(searchingData.filtredMovie);
      setIsShortMovie(searchingData.shortMovieSwitch);
      setSearchingKeyWord(searchingData.keyWord);
    }
  }

  function getSavedMovies() {
    mainApi.getSavedMovies()
    .then(movies => {
      setSavedMoviesList(movies.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleLikeMovie(movie) {
    mainApi.setNewSaveMovie(movie)
    .then((savedMovie) => {
      setSavedMoviesList([savedMovie.data, ...savedMoviesList]);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteSaveMovie(movieId)
    .then(() => {
      setSavedMoviesList((prev) => prev.filter(movie => movie._id !== movieId));
    })
    .catch(err => {
      console.log(err);
    });
  }

  function searchMovieByTitle(movies, keyWord) {
    let selectedMovies = [];

    movies.forEach((movie) => {
        if (movie.nameRU.toLowerCase().indexOf(keyWord.toLowerCase()) > -1) {
          selectedMovies.push(movie);
        }
    });

    return selectedMovies;
  }

  function searchMovieByDuration(movies) {
    let selectedMovies = [];

    movies.forEach((movie) => {
        if (movie.duration <= 40) {
          selectedMovies.push(movie);
        }
    });

    return selectedMovies;
  }

  function selectedMovies(moviesList, callback) {
    if (moviesList.length > 0) {
      const searchingShortMovie = searchMovieByDuration(moviesList);
      callback(searchingShortMovie);
    }
  }

  function moviesNotFound(keyWord) {
    setIsNotFound(true);
    setFiltredMoviesList([]);
    setSearchingMoviesList([]);
    localStorage.setItem('searchingData', JSON.stringify({
      "keyWord": keyWord,
      "filtredMovie": filtredMoviesList,
      "shortMovieSwitch": isShortMovie
    }));
  }

  function searchMovie(keyWord) {
    if (moviesList.length === 0) {
      setRunPreloader(true);
      moviesApi.getMovies()
      .then((movies) => {
        setMoviesList(movies);
        const searchingMovie = searchMovieByTitle(movies, keyWord);
        
        if (searchingMovie.length === 0) {
          moviesNotFound(keyWord);
        } else {
          setRunPreloader(false);
          const searchingShortMovie = searchMovieByDuration(searchingMovie)
          setFiltredMoviesList(searchingShortMovie);
          setSearchingMoviesList(searchingMovie);
          localStorage.setItem('searchingData', JSON.stringify({
            "keyWord": keyWord,
            "filtredMovie": searchingMovie,
            "shortMovieSwitch": isShortMovie
          }));
        }
      })
      .catch(err => {
        setIsServerError(true);
        console.log(err);
      })
      .finally(setRunPreloader(false));
    }
    else {
      const searchingMovie = searchMovieByTitle(moviesList, keyWord);
      if (searchingMovie.length === 0) {
        moviesNotFound(keyWord);
      }
      else {
        const searchingShortMovie = searchMovieByDuration(searchingMovie)
        setFiltredMoviesList(searchingShortMovie);
        setSearchingMoviesList(searchingMovie);
        localStorage.setItem('searchingData', JSON.stringify({
          "keyWord": keyWord,
          "filtredMovie": searchingMovie,
          "shortMovieSwitch": isShortMovie
        }));
      }
    }
  }

  function searchSavedMovies(kewWord) {
    setIsFiltredSavedMovie(true);
    if (savedMoviesList.length > 0) {
      setSavedFiltredMoviesList(searchMovieByTitle(savedMoviesList, kewWord));
    }
  }

  useEffect(() => {
    disableScroll();
  });

  useEffect(() => {
    tokenCheck();
    getSavedMovies();
    getSearchingData();
  }, []);

  useEffect(() => {
    selectedMovies(searchingMoviesList, setFiltredMoviesList);
    selectedMovies(savedMoviesList, setSavedFiltredMoviesList);
    setIsFiltredSavedMovie(isShortMovie);
  }, [isShortMovie]);

  useEffect(() => {
    if (loggedIn) {
        history.push("/movies");
    }
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
          </Route>
          <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
            <Movies
              isSaved={false}
              isChecked={isShortMovie}
              onChecked={setIsShortMovie}
              isNotFound={isNotFound}
              isServerError={isServerError}
              keyWord={searchingKeyWord}
              isPreloader={runPreloader}
              onPreloader={setRunPreloader}
              onSearchMovie={searchMovie}
              onLikeMovie={handleLikeMovie}
              onDeleteMovie={handleDeleteMovie}
              searchingMovies={isShortMovie ? filtredMoviesList : searchingMoviesList}
              savedMovies={savedMoviesList}
              declOfNum={declOfNum}
            />
          </ProtectedRoute>
          <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
            <Movies
              isSaved={true}
              isChecked={isShortMovie}
              onChecked={setIsShortMovie}
              onDeleteMovie={handleDeleteMovie}
              onSearchSavedMovies={searchSavedMovies}
              onFiltredSavedMovie={setIsFiltredSavedMovie}
              searchingMovies={isFiltredSavedMovie ? savedFiltredMoviesList : savedMoviesList}
              declOfNum={declOfNum}
            />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
            <Header
              loggedIn={loggedIn}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
            <Profile
              onSignOut={handleSignOut}
              onEditProfile={handleEditProfile}
              infoMessage={infoMessage}
            />
          </ProtectedRoute>
          <Route exact path="/signin">
            { loggedIn ?
                <Redirect to="/movies"/>
              :
                <Login handleLogin={handleLogin} infoMessage={infoMessage}/>
            }
          </Route>
          <Route exact path="/signup">
            { loggedIn ?
                <Redirect to="/movies"/>
              :
                <Register handleRegister={handleRegister} infoMessage={infoMessage}/>
            }
          </Route>
          <Route path="*">
            <PageNotFound history={history}/>
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
