import React from "react";

export default function FormPageFieldset(props) {
  return (
    <fieldset className="form-field">
      <label className="form-field__label">{props.labelName}</label>
      <input
        id={props.id}
        className="form-field__input"
        name={props.name}
        placeholder={props.placeholderText}
        type={props.type}
        minLength={props.minLengthValue}
        maxLength={props.maxLengthValue}
        value={props.value}
        onChange={props.onChange}
        pattern={props.pattern}
        required
      />
      <span className="form-field__error">{props.errors}</span>
    </fieldset>
  );
}
