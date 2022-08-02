import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__nav">
          <p className="footer__copyrigth">©2022</p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__list-item">
              <a className="footer__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            </li>
            <li className="footer__list-item">
              <a className="footer__link" href="https://github.com/sib24bear" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
