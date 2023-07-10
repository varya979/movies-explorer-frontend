import React from "react";

export default function FilterCheckbox(props) {
  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor="checkbox">
        <input
          className="checkbox__input"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={props.isCheckboxChecked || ""}
          onChange={props.handleChangeCheckbox}
        />
        <span className="checkbox__span">Короткометражки</span>
      </label>
    </div>
  );
}
