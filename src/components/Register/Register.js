import './Register.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Logo from '../Logo/Logo';

function Register({ handleRegister, infoMessage }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
    resetForm();
  }

  return (
    <div className="register">
      <Logo />
      <h3 className="register__title">Добро пожаловать!</h3>
      <form onSubmit={handleSubmit} className="register__form" name="registerForm">
        <label className="register__field">
          Имя
          <input
            value={values.name || ""}
            onChange={handleChange}
            className={isValid ? "register__input" : "register__input register__input_type_errore"}
            name="name" 
            type="text"
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
            required
          />
        </label>
        <span className="register__error-message">
          {errors.name}
        </span>
        <label className="register__field">
          E-mail
          <input
            value={values.email || ""}
            onChange={handleChange}
            className={isValid ? "register__input" : "register__input register__input_type_errore"}
            name="email" 
            type="email"
            required
          />
        </label>
        <span className="register__error-message">
          {errors.email}
        </span>
        <label className="register__field">
          Пароль
          <input
            value={values.password || ""}
            onChange={handleChange}
            className={isValid ? "register__input" : "register__input register__input_type_errore"}
            name="password"
            type="password"
            required
          />
        </label>
        <span className="register__error-message">
          {errors.password}
        </span>
        <button
          className={isValid ? "register__submit-btn" : "register__submit-btn register__submit-btn_type_invalid"}
          type="submit"
          disabled={!isValid}
        >Зарегистрироваться</button>
      </form>
      <span className="login__info-message">{infoMessage}</span>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__signin-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;
