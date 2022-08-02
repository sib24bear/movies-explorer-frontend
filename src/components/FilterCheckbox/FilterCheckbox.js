import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
		<div className="filter-checkbox__container">
			<label className="filter-checkbox">
				<input
					className="filter-checkbox__checkbox"
					type="checkbox"
					aria-label="фильтр короткометражек"
					name="switch"
					defaultChecked
				/>
				<span className="filter-checkbox__switch"></span>
			</label>
			<span className="filter-checkbox__description">Короткометражки</span>
		</div>
	);
}

export default FilterCheckbox;