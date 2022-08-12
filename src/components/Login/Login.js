import './Login.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Logo from '../Logo/Logo';

function Login({ handleLogin, infoMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password);
    resetForm();
  }

  return (
    <div className="login">
      <Logo />
      <h3 className="login__title">Рады видеть!</h3>
      <form onSubmit={handleSubmit} className="login__form" name="loginForm">
        <label className="login__field">
          E-mail
          <input
            value={values.email || ""}
            onChange={handleChange}
            className={isValid ? "login__input" : "login__input login__input_type_errore"}
            name="email" 
            type="email"
            required
          />
        </label>
        <span className="login__error-message">
          {errors.email}
        </span>
        <label className="login__field">
          Пароль
          <input
            value={values.password || ""}
            onChange={handleChange}
            className={isValid ? "login__input" : "login__input login__input_type_errore"}
            name="password"
            type="password"
            required
          />
        </label>
        <span className="login__error-message">
          {errors.password}
        </span>
        <button
          className={isValid ? "login__submit-btn" : "login__submit-btn login__submit-btn_type_invalid"}
          type="submit"
          disabled={!isValid}
        >Войти</button>
      </form>
      <span className="login__info-message">{infoMessage}</span>
      <div className="login__signin">
        <p className="login__signin-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__signin-link">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;
