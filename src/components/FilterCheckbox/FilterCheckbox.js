import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, onChecked }) {

	function handleCheck() {
		isChecked ? onChecked(false) : onChecked(true);
	}

  return (
		<div className="filter-checkbox__container">
			<label className="filter-checkbox">
				<input
					onChange={handleCheck}
					className="filter-checkbox__checkbox"
					type="checkbox"
					aria-label="фильтр короткометражек"
					name="switch"
					checked={isChecked}
				/>
				<span className="filter-checkbox__switch"></span>
			</label>
			<span className="filter-checkbox__description">Короткометражки</span>
		</div>
	);
}

export default FilterCheckbox;