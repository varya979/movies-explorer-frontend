import React from "react";

export default function ProfileFormFieldset(props) {
  return (
    <>
      <fieldset className="profile-form-field">
        <label className="profile-form-field__label">{props.labelName}</label>
        <input
          id={props.id}
          className="profile-form-field__input"
          name={props.name}
          placeholder={props.placeholderText}
          type={props.type}
          minLength={props.minLengthValue}
          maxLength={props.maxLengthValue}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          pattern={props.pattern}
          required
        />
        <span className="profile-form-field__error">{props.errors}</span>
      </fieldset>
    </>
  );
}
