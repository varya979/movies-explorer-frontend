import React from "react";

import FormPageForm from "../FormPageForm/FormPageForm";
import FormPageFieldset from "../FormPageFieldset/FormPageFieldset";

import { useFormValidation } from "../../utils/useFormValidation";

export default function Register(props) {
  const { values, handleChange, errors, isValid } = useFormValidation(
    props.setApiErrorMessage
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegister(values.name, values.email, values.password);
  }

  return (
    <main className="register form-page-main">
      <FormPageForm
        name="register"
        submitButtonTitle={"Зарегистрироваться"}
        formTitle={"Уже зарегистрированы?"}
        formLink={"Войти"}
        pageName={"register"}
        url={"/signin"}
        handleSubmit={handleSubmit}
        isValid={isValid}
        apiErrorMessage={props.apiErrorMessage}
      >
        <FormPageFieldset
          labelName="Имя"
          id="name"
          name="name"
          type="text"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="Имя"
          value={values.name || ""}
          onChange={handleChange}
          pattern="[a-zA-Zа-яА-Я \-]{2,30}"
          errors={errors.name}
        />
        <FormPageFieldset
          labelName="E-mail"
          id="email"
          name="email"
          type="email"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="E-mail"
          value={values.email || ""}
          onChange={handleChange}
          pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$"
          errors={errors.email}
        />
        <FormPageFieldset
          labelName="Пароль"
          id="password"
          name="password"
          type="password"
          minLengthValue="2"
          maxLengthValuegth="30"
          placeholderText="Пароль"
          value={values.password || ""}
          onChange={handleChange}
          errors={errors.password}
        />
      </FormPageForm>
    </main>
  );
}
