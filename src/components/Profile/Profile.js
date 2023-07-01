import React from "react";
import { Link } from "react-router-dom";

import ProfileFormFieldset from "../ProfileFormFieldset/ProfileFormFieldset";

export default function Profile(props) {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const [isEditBtnUnlock, setIsEditBtnUnlock] = React.useState(false);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleEditButtonClick(evt) {
    setIsEditBtnUnlock(true);
  }

  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, {name}!</h1>
        {!isEditBtnUnlock ? (
          <form
            className="profile__form"
            action="#"
            method="post"
            // noValidate
          >
            <ProfileFormFieldset
              labelName="Имя"
              id="name"
              name="name"
              type="text"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="Имя"
              value={name}
              onChange={handleChangeName}
              disabled={"disabled"}
            />
            <hr className="profile__line" />
            <ProfileFormFieldset
              labelName="E-mail"
              id="email"
              name="email"
              type="email"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="E-mail"
              value={email}
              onChange={handleChangeEmail}
              disabled={"disabled"}
            />
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
          </form>
        ) : (
          <form
            className="profile__form"
            action="#"
            method="post"
            // noValidate
          >
            <ProfileFormFieldset
              labelName="Имя"
              id="name"
              name="name"
              type="text"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="Имя"
              value={name}
              onChange={handleChangeName}
            />
            <hr className="profile__line" />
            <ProfileFormFieldset
              labelName="E-mail"
              id="email"
              name="email"
              type="email"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="E-mail"
              value={email}
              onChange={handleChangeEmail}
            />
            <div className="profile__button-submit-container">
              <span className="profile__error">
                {/* появление ошибки и ее текст, а также кнопка
                сохранить будут изменены при реализации валидации */}
                {!props.isInputHasError &&
                  "При обновлении профиля произошла ошибка."}
              </span>
              <button
                className={`profile__button-submit ${
                  !props.isInputHasError
                    ? "profile__button-submit_disabled"
                    : "opacity"
                }
                `}
                type="submit"
                disabled={!props.isInputHasError}
              >
                Сохранить
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
