import React from "react";

import FormPageForm from "../FormPageForm/FormPageForm";
import FormPageFieldset from "../FormPageFieldset/FormPageFieldset";

export default function Register(props) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

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
      >
        <FormPageFieldset
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
        />
      </FormPageForm>
    </main>
  );
}
