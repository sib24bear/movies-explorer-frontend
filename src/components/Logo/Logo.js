import './Logo.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="logo">
      <img
        className="logo-img"
        src={require('../../images/logo.svg').default}
        alt="логотип учебного проекта"
      />
    </Link>
  );
}

export default Logo;