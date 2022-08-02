import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <div className="about-project__container">
        <SectionTitle title="О проекте"/>
        <div className="about-project__description">
          <div className="about-project__description-info">
            <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__description-info">
            <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__timeline">
          <p className="about-project__times about-project__times_type_one-week">1 Неделя</p>
          <p className="about-project__times about-project__times_type_four-week">4 Недели</p>
          <p className="about-project__times-description">Back-end</p>
          <p className="about-project__times-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
