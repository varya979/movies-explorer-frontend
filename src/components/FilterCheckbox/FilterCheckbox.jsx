import React from "react";

export default function FilterCheckbox() {
  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor="checkbox">
        <input className="checkbox__input" type="checkbox" id="checkbox"/>
        <span className="checkbox__span">Короткометражки</span>
      </label>
    </div>
  );
}
