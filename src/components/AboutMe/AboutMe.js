import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <div className="about-me__container">
        <SectionTitle customClass="about-me__title" title="Студент"/>
        <div className="about-me__description">
          <h3 className="about-me__name">Рик Санчез</h3>
          <p className="about-me__name-subtitle">Учёный, изобретатель, продавец оружия, владелец магазина, музыкант, 70 лет</p>
          <p className="about-me__info">Cкептик, атеист, крайне циничен, ворчлив, но не лишен чувства юмора. Из-за своей гениальности в купе со сложным характером нажил себе немало врагов во Вселенной.</p>
          <ul className="about-me__list">
            <li className="about-me__list-item">
              <a className="about-me__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            </li>
            <li className="about-me__list-item">
              <a className="about-me__link" href="https://github.com/sib24bear" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__image" src={require('../../images/Rik_Sanchez.jpg')} alt="Фото Рика Санчеза"/>
      </div>
    </section>
  );
}

export default AboutMe;
