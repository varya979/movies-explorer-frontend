import React from "react";

import FormPageForm from "../FormPageForm/FormPageForm";
import FormPageFieldset from "../FormPageFieldset/FormPageFieldset";

export default function Login(props) {
  return (
    <main className="login form-page-main">
      <FormPageForm
        name="login"
        handleClick={props.handleLogin}
        submitButtonTitle={"Войти"}
        formTitle={"Ещё не зарегистрированы?"}
        formLink={"Регистрация"}
        pageName={"login"}
        url={"/signup"}
        /* появление ошибки и ее текст будут
        изменены при реализации валидации */
        isInputHasError={false}
        errorText={"Что-то пошло не так..."}
      >
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
          isInputHasError={false}
        />
      </FormPageForm>
    </main>
  );
}
