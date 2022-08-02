import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import BurgerButton from '../BurgerButton/BurgerButton';

function Navigation({ loggedIn, isOpen, setIsOpen }) {

  function handleClick() {
    setIsOpen(false);
  }

  return (
    <nav
      className={
        isOpen ? "navigation menu menu_open" : "navigation"
      }
    >
      {
        loggedIn ?
        <>
          <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
          <ul
            className={
              isOpen ? "navigation__list menu__list menu__list_open" : "navigation__list menu__list"
            }
          >
            <li className="navigation__item menu__item"> 
              <NavLink
                onClick={handleClick}
                exact
                to="/"
                className="navigation__link navigation__link_type_logined"
                activeClassName="navigation__link_type_active"
              >
                Главная
              </NavLink>
            </li>
            <li className="navigation__item menu__item"> 
              <NavLink
                onClick={handleClick}
                to="/movies"
                className="navigation__link navigation__link_type_logined"
                activeClassName="navigation__link_type_active"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item menu__item"> 
              <NavLink
                onClick={handleClick}
                to="/saved-movies"
                className="navigation__link navigation__link_type_logined"
                activeClassName="navigation__link_type_active"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item menu__item"> 
              <NavLink
                onClick={handleClick}
                to="/profile"
                className="navigation__link navigation__link_type_profile"
                activeClassName="navigation__link_type_active"
              >
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </>
        :
        <ul className="navigation__list">
          <li className="navigation__item"> 
            <Link to="/signup" className="navigation__link navigation__link_type_login">Регистрация</Link>
          </li>
          <li className="navigation__item"> 
            <Link to="/signin" className="navigation__link navigation__link_type_button">Войти</Link>
          </li>
        </ul>
      }
    </nav>
  );
}

export default Navigation;