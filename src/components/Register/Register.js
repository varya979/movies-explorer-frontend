import React from "react";

import FormPageForm from "../FormPageForm/FormPageForm";
import FormPageFieldset from "../FormPageFieldset/FormPageFieldset";

export default function Register(props) {
  return (
    <main className="register form-page-main">
      <FormPageForm
        name="register"
        handleClick={props.handleRegister}
        submitButtonTitle={"Зарегистрироваться"}
        formTitle={"Уже зарегистрированы?"}
        formLink={"Войти"}
        pageName={"register"}
        url={"/signin"}
        /* появление ошибки и ее текст будут
        изменены при реализации валидации */
        isInputHasError={true}
        errorText={"Что-то пошло не так..."}
      >
        <FormPageFieldset
          labelName="Имя"
          id="name"
          name="name"
          type="text"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="Имя"
          value={props.name}
          onChange={props.handleChangeName}
          isInputHasError={false}
        />
        <FormPageFieldset
          labelName="E-mail"
          id="email"
          name="email"
          type="email"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="E-mail"
          value={props.email}
          onChange={props.handleChangeEmail}
          isInputHasError={false}
        />
        <FormPageFieldset
          labelName="Пароль"
          id="password"
          name="password"
          type="password"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="Пароль"
          value={props.password}
          onChange={props.handleChangePassword}
          isInputHasError={true}
        />
      </FormPageForm>
    </main>
  );
}
