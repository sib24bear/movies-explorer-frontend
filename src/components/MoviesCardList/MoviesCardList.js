import './MoviesCardList.css';
import { useCallback, useEffect, useState } from 'react';
import { 
  TABLET_WIDTH,
  MOBILE_WIDTH,
  MAX_COUNT_CARDS,
  MEDIUM_COUNT_CARDS,
  MIN_COUNT_CARDS,
  MAX_COUNT_LOAD_CARDS,
  MIN_COUNT_LOAD_CARDS 
} from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSaved,
  isPreloader,
  isNotFound,
  isServerError,
  onLikeMovie,
  onDeleteMovie,
  searchingMovies,
  savedMovies,
  declOfNum
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [displaySavedMovies, setDisplaySavedMovies] = useState(getInitialMovies(width));
  const trackDisplayWidth = useCallback(() => window.innerWidth, []);

  function getInitialMovies(width) {
    if (width >= TABLET_WIDTH) {
      return MAX_COUNT_CARDS;
    }
    if (width >= MOBILE_WIDTH) {
      return MEDIUM_COUNT_CARDS ;
    }
    return MIN_COUNT_CARDS;
  };
  
  function loadMoreMovies(width) {
    if (width >= TABLET_WIDTH) {
      return MAX_COUNT_LOAD_CARDS;
    }
    return MIN_COUNT_LOAD_CARDS;
  };

  function handleMoreMoviesClick() {
    setDisplaySavedMovies((prev) => prev + loadMoreMovies(width));
  }

  useEffect(() => {
    let resizeTime;

    function getResizeWidth() {
      clearTimeout(resizeTime);
      resizeTime = setTimeout(() => setWidth(trackDisplayWidth), 500);
    };
    
    window.addEventListener("resize", getResizeWidth);

    return () => {
      window.removeEventListener("resize", getResizeWidth);
    };
  }, [trackDisplayWidth]);

  return (
    <section className="movies-cards">
      {isPreloader && <Preloader />}
      {
        searchingMovies.length ? 
          <>
            <ul className="movies-cards__list">
              {
                searchingMovies.slice(0, displaySavedMovies).map((movie) => {
                  return (
                    <li key={isSaved ? movie.movieId : movie.id} className="movies-cards__item">
                      <MoviesCard
                        isSaved={isSaved}
                        movie={isSaved ? movie : movie}
                        declOfNum={declOfNum}
                        onLikeMovie={onLikeMovie}
                        onDeleteMovie={onDeleteMovie}
                        savedMovies={savedMovies}
                      />
                    </li>
                  )
                })
              }
            </ul>
            <div className="movies-cards__more-movies">
              {
                displaySavedMovies < searchingMovies.length && <button
                  onClick={handleMoreMoviesClick}
                  className={
                    isSaved ?
                    "movies-cards__more-button movies-cards__more-button_type_hidden"
                    :
                    "movies-cards__more-button"
                  }
                >Ещё</button>
              }
            </div>
          </>
        :
          <>
            <ul className="movies-cards__list"></ul>
            <div className="movies-cards__more-movies">
              {isNotFound && <span className="movies-cards__no-found">Ничего не найдено</span>}
              {isServerError && <span className="movies-cards__server-error">"Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"</span>}
            </div>
          </>
      }
    </section>
  );
}

export default MoviesCardList;