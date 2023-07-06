import React from "react";
import { Link } from "react-router-dom";

export default function FormPageForm(props) {
  return (
    <form className="form" name={props.name} noValidate>
      {props.children}
      <span className="form__error">{props.apiError}</span>
      <button
        className={`form__button-submit form__button-submit_${props.pageName}
          ${!props.isValid ? " form__button-submit_disabled" : "opacity"}
        `}
        type="submit"
        disabled={!props.isValid}
        onClick={props.handleSubmit}
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
