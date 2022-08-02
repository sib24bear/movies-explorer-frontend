import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register() {
  return (
    <div className="register">
      <Logo />
      <h3 className="register__title">Добро пожаловать!</h3>
      <form className="register__form" name="registerForm">
        <label className="register__field">
          Имя
          <input
            className="register__input register__input_type_name"
            name="name" 
            type="text"
            required
          />
        </label>
        <label className="register__field">
          E-mail
          <input
            className="register__input register__input_type_email"
            name="email" 
            type="email"
            required
          />
        </label>
        <label className="register__field">
          Пароль
          <input
            className="register__input register__input_type_password register__input_type_errore"
            name="password"
            type="password"
            required
          />
        </label>
        <span className="register__error-message">
          Что-то пошло не так...
        </span>
        <button className="register__submit-btn" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__signin-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
