import './MoviesCard.css';

function MoviesCard({ isLiked, isSaved, nameRU, duration, imageLink }) {
  return (
      <div className="movies-card">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{duration} минут</p>
        </div>
        <img
          className="movies-card__img"
          src={"https://api.nomoreparties.co/" + imageLink}
          alt={"кадр из фильма " +  nameRU}
        />
        {
          isSaved ?
            <button
              className="movies-card__button movies-card__button_type_delete"
              type="button"
              aria-label="убрать из сохранненых"
            ></button>
          :
            <button className={
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