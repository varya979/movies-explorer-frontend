import React from "react";

export default function FilterCheckbox() {
  return (
    <div className="search__checkbox">
      <label className="search__checkbox-label" htmlFor="checkbox">
        <input className="search__checkbox-input" type="checkbox" id="checkbox"/>
        <span className="search__checkbox-span">Короткометражки</span>
      </label>
    </div>
  );
}
