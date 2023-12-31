import React from "react";

export default function FilterCheckbox(props) {
  const changeCheckboxState = (evt) => {
    props.changeCheckboxState(evt.target.checked);
  };

  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor="checkbox">
        {props.location.pathname === "/movies" && (
          <input
            className="checkbox__input"
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={props.isCheckboxChecked}
            onChange={changeCheckboxState}
          />
        )}
        {props.location.pathname === "/saved-movies" && (
          <input
            className="checkbox__input"
            type="checkbox"
            id="checkbox"
            name="checkbox"
            defaultChecked={props.isCheckboxChecked}
            onChange={changeCheckboxState}
          />
        )}
        <span className="checkbox__span">Короткометражки</span>
      </label>
    </div>
  );
}
