import './SearchForm.css';
import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  onSearchMovie,
  onSearchSavedMovies,
  onFiltredSavedMovie,
  isSaved,
  isChecked,
  onChecked,
  keyWord
}) {
  const [searchInput, setSearchInput] = useState({ search: keyWord || '' });
  const [message, setMessage] = useState('');

  function searchValidation(e) {
    if (e.target.validity.valueMissing) {
      setMessage('Нужно ввести ключевое слово');
    }
    else {
      setMessage(e.target.validationMessage);
    }
  }

  function handleChange(e) {
    searchValidation(e);
    const {name, value} = e.target;
    setSearchInput((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInput.search.length) {
      onSearchMovie(searchInput.search);
    }
  }

  function handleSavedMoviesSubmit(e) {
    e.preventDefault();
    if (searchInput.search.length) {
      onSearchSavedMovies(searchInput.search);
    }
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={isSaved ? handleSavedMoviesSubmit : handleSubmit}
          className="search-form"
          name="searchForm"
          noValidate
        >
          <label className="search-form__field">
            <input
              value={searchInput.search}
              onChange={handleChange}
              className="search-form__input"
              type="text"
              name="search"
              placeholder="Фильм"
              required
            />
          </label>
          <button
            className="button search-form__submit-btn"
            type="submit"
            aria-label="поиск по фильмам"
          ></button>
          <span className="error-message">{message}</span>
          <FilterCheckbox isChecked={isChecked} onChecked={onChecked} />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;