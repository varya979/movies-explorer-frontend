import React from "react";
import { Link } from 'react-router-dom';

// import failImg from "../../images/fail.svg";

// import Popup from "../Popup/Popup";
// import Figure from "../Figure/Figure";

export default function Profile(props) {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const [isEditProfile, setIsEditProfile] = React.useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = React.useState(false);
  // const [isPopupOpen, setIsPopupOpen] = React.useState(true);

  // function openPopup() {
  //   setIsPopupOpen(true);
  // }

  // function closePopup() {
  //   setIsPopupOpen(false);
  // }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleEditButtonClick(evt) {
    setIsEditProfile(true);
  }

  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, {props.name}!</h1>
        <form
          className="profile__form"
          action="#"
          method="post"
          // noValidate
        >
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            {!isEditProfile ? (
              <input
                className="profile__input"
                value={name}
                disabled
              />
            ) : (
              <input
                className="profile__input"
                placeholder=""
                type="text"
                minLength="2"
                maxLength="30"
                required
                value={name}
                onChange={handleChangeName}
              />
            )}
          </div>
          <hr className="profile__line"/>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            {!isEditProfile ? (
              <input
                className="profile__input"
                value={email}
                disabled
              />
            ) : (
              <input
                className="profile__input"
                placeholder=""
                type="email"
                minLength="2"
                maxLength="30"
                required
                value={email}
                onChange={handleChangeEmail}
              />
            )}
          </div>
          {!isEditProfile ? (
            <div className="profile__button-container">
              <button
                className="profile__edit-button opacity"
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
              <Link to="/" className="profile__link opacity">
                Выйти из аккаунта
              </Link>
            </div>
          ) : (
            <button
              className={
                isSubmitButtonDisabled ?
                  "profile__submit-button_disabled" :
                  "profile__submit-button opacity"
              }
              type="button"
            >
              Сохранить
            </button>
          )}
        </form>
      </section>
      {/* <Popup
        name="error"
        onClose={closePopup}
        isOpen={openPopup}
        children={<Figure
          img={failImg}
          alt="Рисунок крестика"
          text="Вы ввели неправильный логин или пароль."
        />}
      /> */}
    </>
  );
}
