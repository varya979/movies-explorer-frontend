import React from "react";

import image from "../../images/input_button.svg";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm(props) {
  return (
    <section className="search">
      <form className="search__form">
        <input
          className="search__input"
          placeholder="Фильм"
          type="text"
          minLength="2"
          maxLength="100"
          required
          value={props.value}
          onChange={props.onChange}
        ></input>
        <button className="search__button opacity" type="submit">
          <img
            src={image}
            className="search__button-image"
            alt="рисунок лупы"
          ></img>
        </button>
      </form>
      <FilterCheckbox />
      <hr className="search__line" />
    </section>
  );
}
