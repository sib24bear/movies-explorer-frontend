import './MoviesCard.css';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard({
  isSaved,
  movie,
  onLikeMovie,
  onDeleteMovie,
  savedMovies,
  declOfNum
}) {

  const [isLiked, setIsLiked] = useState(false);
  const [dBMovieId, setDBMovieId] = useState('');
  const timeTitleArray = ['минута', 'минуты', 'минут'];
  const {currentUser} = useContext(CurrentUserContext);
  const savedMovie = isSaved ? false : savedMovies.find((item) => item.movieId === movie.id && item.owner === currentUser._id);

  function handleButtonMoviesClick(e) {
    if (isLiked) {
      onDeleteMovie(dBMovieId);
    } else {
      onLikeMovie(movie);
    }
    setIsLiked(!isLiked);
  }

  function handleButtonSavedMoviesClick(e) {
    onDeleteMovie(movie._id);
  }

  function getDBMovieId() {
    if (savedMovies.length > 0) {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.movieId === movie.id) {
          setDBMovieId(savedMovie._id);
        }
      });
    }
  }

  useEffect(() => {
    if (!isSaved) {
      getDBMovieId();
    }
  });

  useEffect(() => {
    if (savedMovie && !isSaved) {
      setIsLiked(true);
    }
  }, [savedMovie])

  return (
      <div className="movies-card">
        <div className="movies-card__description">
          <h2 className="movies-card__title" title={movie.nameRU}>{movie.nameRU}</h2>
          <p 
            className="movies-card__duration"
            title={`${movie.duration} ${declOfNum(movie.duration, timeTitleArray)}`}
          >
            {`${movie.duration} ${declOfNum(movie.duration, timeTitleArray)}`}
          </p>
        </div>
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="movies-card__img"
            src={isSaved ? movie.thumbnail : `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
            alt={"кадр из фильма " +  movie.nameRU}
          />
        </a>
        {
          isSaved ?
            <button
              onClick={handleButtonSavedMoviesClick}
              className="movies-card__button movies-card__button_type_delete"
              type="button"
              aria-label="убрать из сохранненых"
            ></button>
          :
            <button
              onClick={handleButtonMoviesClick}
              className={
              isLiked ?
                "movies-card__button movies-card__button_type_active"
              :
                "movies-card__button"
              }
              type="button"
              aria-label={
              isLiked ?
                "добавлен в сохраненные фильмы"
              :
                "добавить в сохраненные фильмы"
              }
            >
              {
                isLiked ? '' : 'Сохранить'
              }
            </button>
        }
      </div>
	);
}

export default MoviesCard;