import React from "react";
import { Link } from "react-router-dom";

export default function FormPageForm(props) {
  return (
    <form
      className="form"
      name={props.name}
      action="#"
      method="post"
      // noValidate
      onSubmit={props.handleClick}
    >
      {props.children}
      <span
        className={
          props.isInputHasError
            ? "form__error form__error_active"
            : "form__error"
        }
      >
        {props.errorText}
      </span>
      <button
        // className={`form__button-submit form__button-submit_${props.pageName} opacity`}
        className={`form__button-submit form__button-submit_${props.pageName}
          ${props.isInputHasError ? " form__button-submit_disabled" : "opacity"}
        `}
        type="submit"
        disabled={props.isInputHasError}
      >
        {props.submitButtonTitle}
      </button>
      <p className="form__title">
        {props.formTitle}&ensp;
        <Link to={props.url} className="form__link opacity">
          {props.formLink}
        </Link>
      </p>
    </form>
  );
}
