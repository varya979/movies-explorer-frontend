import React from "react";

export default function FormPageFieldset(props) {
  return (
    <fieldset className="form__field">
      <label className="form__label">{props.labelName}</label>
      <input
        id={props.id}
        className={
          props.isInputHasError
            ? "form__input form__input_incorrect"
            : "form__input opacity"
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
