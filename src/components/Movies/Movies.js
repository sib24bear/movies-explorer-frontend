import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ isLiked, isSaved, moviesList, isPreloader, onPreloader }) {
  return (
    <>
      <main className="main">
        <SearchForm />
        <MoviesCardList
          isLiked={isLiked}
          isSaved={isSaved}
          moviesList={moviesList}
          isPreloader={isPreloader}
          onPreloader={onPreloader}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
