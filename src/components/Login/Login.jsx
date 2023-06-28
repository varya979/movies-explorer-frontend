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

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      email: email,
      password: password,
    });
  }

  return (
    <main className="login form-page-main">
      <FormPageForm
        name="login"
        onsubmit={handleSubmit}
        submitButtonTitle={"Войти"}
        formTitle={"Ещё не зарегистрированы?"}
        formLink={"Регистрация"}
        pageName={"login"}
        url={"/signup"}
      >
        <FormPageFieldset
          labelName="E-mail"
          id="email"
          name="email"
          type="email"
          minLengthValue="2"
          maxLengthValuegth="30"
          value={email}
          onChange={handleChangeEmail}
        />
        <FormPageFieldset
          labelName="Пароль"
          id="password"
          name="password"
          type="password"
          minLengthValue="2"
          maxLengthValuegth="30"
          value={password}
          onChange={handleChangePassword}
        />
      </FormPageForm>
    </main>
  );
}
