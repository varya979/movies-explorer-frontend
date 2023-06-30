import React from "react";

export default function ProfileFormFieldset(props) {
  return (
    <fieldset className="profile__form-field">
      <label className="profile__form-label">{props.labelName}</label>
      <input
        id={props.id}
        className="profile__form-input"
        name={props.name}
        placeholder={props.placeholderText}
        type={props.type}
        minLength={props.minLengthValue}
        maxLength={props.maxLengthValue}
        required
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <span
        className={`profile__form-input-error profile__form-input-error-${props.id}`}
      />
    </fieldset>
  );
}
