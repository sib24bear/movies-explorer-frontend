import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className="profile">
      <h3 className="profile__title">Привет, Виталий!</h3>
      <form className="profile__form" name="profileForm">
        <label className="profile__field">
          Имя
          <input
            className="profile__input profile__input_type_name"
            name="name" 
            type="text"
            placeholder="Виталий"
            required
          />
        </label>
        <label className="profile__field">
          E-mail
          <input
            className="profile__input profile__input_type_email"
            name="email" 
            type="email"
            placeholder="Email"
            required
          />
        </label>
        <button className="profile__submit-btn" type="submit">Сохранить</button>
      </form>
      <Link to="/edit" className="profile__edit-link">Редактировать</Link>
      <Link to="/signout" className="profile__signout-link">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;
