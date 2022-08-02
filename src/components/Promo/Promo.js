import './Promo.css';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <Header />
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__image" src={require('../../images/landing-logo.svg').default} alt="Яндекс Практикум лого"/>
      </div>
      <NavTab />
    </section>
  );
}

export default Promo;
