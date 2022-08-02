import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, isOpen, setIsOpen }) {

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <Navigation
          loggedIn={loggedIn}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </header>
  );
}

export default Header;
