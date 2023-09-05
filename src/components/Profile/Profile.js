import React from "react";
import { Link } from "react-router-dom";

import ProfileFormFieldset from "../ProfileFormFieldset/ProfileFormFieldset";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../hooks/useFormValidation";

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormValidation(
    props.setApiErrorMessage
  );

  const [isEditBtnUnlock, setIsEditBtnUnlock] = React.useState(false);

  function handleEditButtonClick() {
    setIsEditBtnUnlock(!isEditBtnUnlock);
    values.email = currentUser.email;
    values.name = currentUser.name;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsEditBtnUnlock(!isEditBtnUnlock);
    props.handleUpdateUser({
      email: values.email,
      name: values.name,
    });
  }

  return (
    <>
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        {!isEditBtnUnlock ? (
          <form className="profile__form" name="profile-blocked" noValidate>
            <ProfileFormFieldset
              labelName="Имя"
              id="name"
              name="name"
              type="text"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="Имя"
              value={currentUser.name}
              onChange={handleChange}
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
              value={currentUser.email}
              onChange={handleChange}
              disabled={"disabled"}
            />
            <div className="profile__button-container">
              <button
                className="profile__edit-button opacity"
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
              <Link
                to="/"
                className="profile__link opacity"
                onClick={props.handleLogOut}
              >
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        ) : (
          <form
            className="profile__form"
            name="profile"
            onSubmit={handleSubmit}
            noValidate
          >
            <ProfileFormFieldset
              labelName="Имя"
              id="name"
              name="name"
              type="text"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="имя"
              value={values.name || ""}
              onChange={handleChange}
              pattern="[a-zA-Zа-яА-Я \-]{2,30}"
              errors={errors.name}
            />
            <hr className="profile__line" />
            <ProfileFormFieldset
              labelName="E-mail"
              id="email"
              name="email"
              type="email"
              minLengthValue="2"
              maxLengthValuegth="30"
              placeholderText="email"
              value={values.email || ""}
              onChange={handleChange}
              pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$"
              errors={errors.email}
            />
            <div className="profile__button-submit-container">
              <span className="profile__error">{props.apiErrorMessage}</span>
              <button
                className={`profile__button-submit ${
                  !isValid ||
                  (currentUser.name === values.name &&
                    currentUser.email === values.email)
                    ? "profile__button-submit_disabled"
                    : "opacity"
                }`}
                type="submit"
                disabled={
                  !isValid ||
                  (currentUser.name === values.name &&
                    currentUser.email === values.email)
                }
              >
                Сохранить
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}
