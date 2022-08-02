import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login() {
  return (
    <div className="login">
      <Logo />
      <h3 className="login__title">Рады видеть!</h3>
      <form className="login__form" name="loginForm">
        <label className="login__field">
          E-mail
          <input
            className="login__input login__input_type_email"
            name="email" 
            type="email"
            required
          />
        </label>
        <label className="login__field">
          Пароль
          <input
            className="login__input login__input_type_password"
            name="password"
            type="password"
            required
          />
        </label>
        <span className="login__error-message">
          Что-то пошло не так...
        </span>
        <button className="login__submit-btn" type="submit">Войти</button>
      </form>
      <div className="login__signin">
        <p className="login__signin-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__signin-link">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;
