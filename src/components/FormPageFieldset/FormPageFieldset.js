import React from "react";

export default function FormPageFieldset(props) {
  return (
    <fieldset className="form-field">
      <label className="form-field__label">{props.labelName}</label>
      <input
        id={props.id}
        className={
          props.isInputHasError
            ? "form-field__input form-field__input_incorrect"
            : "form-field__input"
        }
        name={props.name}
        placeholder={props.placeholderText}
        type={props.type}
        minLength={props.minLengthValue}
        maxLength={props.maxLengthValue}
        required
        value={props.value}
        onChange={props.onChange}
      />
    </fieldset>
  );
}
