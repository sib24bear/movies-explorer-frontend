import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ isLiked, isSaved, moviesList, isPreloader, onPreloader }) {
  function handleClick() {
    isPreloader ? onPreloader(false) : onPreloader(true);
  }

  if (moviesList !== null) {
    return (
      <section className="movies-cards">
        <ul className="movies-cards__list">
          {
            moviesList.map((movie) => {
              return (
                <li className="movies-cards__item">
                  <MoviesCard
                    key={movie.id}
                    isLiked={isLiked}
                    isSaved={isSaved}
                    nameRU={movie.nameRU}
                    duration={movie.duration}
                    imageLink={movie.image.formats.thumbnail.url}
                  />
                </li>
              )
            })
          }
          <li className="movies-cards__item">
            <MoviesCard 
              isLiked={false}
              isSaved={isSaved}
              nameRU={"В погоне за Бенкси"}
              duration={"27"}
              imageLink={"/uploads/thumbnail_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"}
            />
          </li>
          <li className="movies-cards__item">
            <MoviesCard 
              isLiked={false}
              isSaved={isSaved}
              nameRU={"В погоне за Бенкси"}
              duration={"27"}
              imageLink={"/uploads/thumbnail_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"}
            />
          </li>
          <li className="movies-cards__item">
            <MoviesCard 
              isLiked={isLiked}
              isSaved={isSaved}
              nameRU={"В погоне за Бенкси"}
              duration={"27"}
              imageLink={"/uploads/thumbnail_posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"}
            />
          </li>
        </ul>
        {isPreloader ? <Preloader /> : ''}
        <div className="movies-cards__more-movies">
          {
            isSaved ? <></> : <button onClick={handleClick} className="movies-cards__more-button">Ещё</button>
          }
        </div>
      </section>
    );
  } 
  else {
    return (
      <section className="movies-cards">
        <ul className="movies-cards__list"></ul>
        <div className="movies-cards__more-movies">
          {
            isSaved ? <></> : <button className="movies-cards__more-button">Ещё</button>
          }
        </div>
      </section>
    );
  }
}

export default MoviesCardList;