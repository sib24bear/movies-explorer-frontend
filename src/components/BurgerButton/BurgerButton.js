import './BurgerButton.css';

function BurgerButton({ isOpen, setIsOpen }) {
  function handleClick() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  return (
    <button
      onClick={handleClick}
      className={
        isOpen ? "burger-button burger-button_active " : "burger-button"
      }
      aria-label={
        isOpen ? "Развернуть меню" : "Закрыть меню"
      }
    >
      <span className="burger-button__line"></span>
    </button>
  );
}

export default BurgerButton;