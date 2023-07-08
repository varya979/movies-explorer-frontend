import React from "react";

import FormPageForm from "../FormPageForm/FormPageForm";
import FormPageFieldset from "../FormPageFieldset/FormPageFieldset";

import { useFormValidation } from "../../utils/useFormValidation";

export default function Login(props) {
  const { values, handleChange, errors, isValid } = useFormValidation(
    props.setApiError
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleLogIn(values.email, values.password);
  }

  return (
    <main className="login form-page-main">
      <FormPageForm
        name="login"
        submitButtonTitle={"Войти"}
        formTitle={"Ещё не зарегистрированы?"}
        formLink={"Регистрация"}
        pageName={"login"}
        url={"/signup"}
        handleSubmit={handleSubmit}
        isValid={isValid}
        apiError={props.apiError}
      >
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
