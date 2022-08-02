import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ isLiked, isSaved, moviesList, isPreloader, onPreloader }) {
  return (
    <>
      <div className="main">
        <SearchForm />
        <MoviesCardList
          isLiked={isLiked}
          isSaved={isSaved}
          moviesList={moviesList}
          isPreloader={isPreloader}
          onPreloader={onPreloader}
        />
      </div>
      <Footer />
    </>
  );
}

export default Movies;
