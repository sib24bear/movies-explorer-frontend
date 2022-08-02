import './NavTab.css';
import { Link } from "react-scroll";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <Link
            to="about-project"
            smooth={true}
            duration={500}
            className="navtab__link"
          >
            О проекте
          </Link>
        </li>
        <li className="navtab__item">
          <Link 
            to="techs"
            smooth={true}
            duration={500}
            className="navtab__link"
          >
            Технологии
          </Link>
        </li>
        <li className="navtab__item">
          <Link
            to="about-me"
            smooth={true}
            duration={500}
            className="navtab__link"
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
