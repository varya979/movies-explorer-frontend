import React from "react";

export default function FormPageFieldset(props) {
  return (
    <fieldset className="form__field">
      <label className="form__label">{props.labelName}</label>
      <input
        id={props.id}
        className="form__input"
        name={props.name}
        placeholder={props.placeholderText}
        type={props.type}
        minLength={props.minLengthValue}
        maxLength={props.maxLengthValue}
        required
        value={props.value}
        onChange={props.onChange}
      />
      <span className={`form__input-error form__input-error-${props.id}`} />
    </fieldset>
  );
}
