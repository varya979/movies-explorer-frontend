import React from "react";

import FormPageForm from "../FormPageForm/FormPageForm";
import FormPageFieldset from "../FormPageFieldset/FormPageFieldset";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

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
        isInputHasError={true}
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
          value={email}
          onChange={handleChangeEmail}
          isInputHasError={true}
        />
        <FormPageFieldset
          labelName="Пароль"
          id="password"
          name="password"
          type="password"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="Пароль"
          value={password}
          onChange={handleChangePassword}
          isInputHasError={false}
        />
      </FormPageForm>
    </main>
  );
}
