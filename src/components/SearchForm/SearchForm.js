import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search-form" name="searchForm">
          <label className="search-form__field">
            <input
              className="search-form__input"
              type="text"
              name="search"
              placeholder="Фильм"
              required
            />
          </label>
          <button className="button search-form__submit-btn" type="submit" aria-label="поиск по фильмам"></button>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;