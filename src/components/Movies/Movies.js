import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  isSaved,
  isChecked,
  onChecked,
  isNotFound,
  isServerError,
  keyWord,
  moviesList,
  isPreloader,
  onPreloader,
  onSearchMovie,
  onSearchSavedMovies,
  onFiltredSavedMovie,
  onLikeMovie,
  onDeleteMovie,
  searchingMovies,
  savedMovies,
  declOfNum
}) {
  return (
    <>
      <main className="main">
        <SearchForm
          isSaved={isSaved}
          onSearchMovie={onSearchMovie}
          onSearchSavedMovies={onSearchSavedMovies}
          onFiltredSavedMovie={onFiltredSavedMovie}
          isChecked={isChecked}
          onChecked={onChecked}
          keyWord={keyWord}
        />
        <MoviesCardList
          isSaved={isSaved}
          isNotFound={isNotFound}
          isServerError={isServerError}
          moviesList={moviesList}
          isPreloader={isPreloader}
          onPreloader={onPreloader}
          onLikeMovie={onLikeMovie}
          onDeleteMovie={onDeleteMovie}
          searchingMovies={searchingMovies}
          savedMovies={savedMovies}
          declOfNum={declOfNum}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
