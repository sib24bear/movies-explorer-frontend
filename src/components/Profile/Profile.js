import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({ onSignOut, onEditProfile, infoMessage, onInfoMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const {currentUser} = useContext(CurrentUserContext);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);

  function handleEditClick() {
    if (isEditProfile) {
      setIsEditProfile(false);
      onInfoMessage('');
    } else {
      setIsEditProfile(true);
      if (isSubmitBtnDisabled) {
        onInfoMessage('Чтобы продолжить, измените имя или адерес email')
      }
    }
  }

  function handleSignOutClick() {
    setIsEditProfile(false);
    onSignOut();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditProfile(false);
    onEditProfile(values.name, values.email);
    onInfoMessage('');
  }

 // const isSubmitBtnDisabled = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  useEffect(() => {
    setIsSubmitBtnDisabled(!isValid || (currentUser.name === values.name && currentUser.email === values.email));
  }, [values.name, values.email]);

  useEffect(() => {
    if (!isEditProfile) {
      setIsSubmitBtnDisabled(true);
      values.name = currentUser.name;
      values.email = currentUser.email;
    }
  }, [isEditProfile]);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  return (
    <section className="profile">
      <h3 className="profile__title">Привет, {currentUser.name}!</h3>
      <form onSubmit={handleSubmit} className="profile__form" name="profileForm">
        <label
          className={isEditProfile ? "profile__field" : "profile__field profile__field_disabled"}
        >
          Имя
          <input
            value={values.name || ''}
            onChange={handleChange}
            className={isValid ? "profile__input" : "profile__input profile__input_type_errore"}
            name="name" 
            type="text"
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
            required
            disabled={isEditProfile ? false : true }
          />
        </label>
        <span className="profile__error-message">
          {errors.name}
        </span>
        <label
          className={isEditProfile ? "profile__field" : "profile__field profile__field_disabled"}
        >
          E-mail
          <input
            value={values.email || ''}
            onChange={handleChange}
            className={isValid ? "profile__input" : "profile__input profile__input_type_errore"}
            name="email" 
            type="email"
            required
            disabled={isEditProfile ? false : true }
          />
        </label>
        <span className="profile__error-message">
          {errors.email}
        </span>
        <button
          className={!isSubmitBtnDisabled ? "profile__submit-btn" : "profile__submit-btn profile__submit-btn_type_invalid"}
          type="submit"
          disabled={!isSubmitBtnDisabled ? false : true }
        >Сохранить</button>
      </form>
      <span className="profile__info-message">{infoMessage}</span>
      <button
        onClick={handleEditClick}
        className="profile__edit-btn"
      >{isEditProfile ? "Назад" : "Редактировать" }</button>
      <button onClick={handleSignOutClick} className="profile__signout-btn">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
