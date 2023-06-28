import React from "react";
import { Link } from "react-router-dom";

export default function FormPageForm(props) {

  return (
    <form
      className={`form ${props.formClassName}`}
      name={props.name}
      action="#"
      method="post"
      // noValidate
      onSubmit={props.onSubmit}
    >
      {props.children}
      <button className="form__button-save opacity" type="submit">
        {props.submitButtonTitle}
      </button>
      <p className="form__title">
        {props.formTitle}&ensp;
        <Link to="/signin" className="form__link opacity">
          {props.formLink}
        </Link>
      </p>
    </form>
  );
}
