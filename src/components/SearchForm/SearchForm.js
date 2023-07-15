import React from "react";

import image from "../../images/input_button.svg";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm(props) {
  return (
    <section className="search">
      <form className="search__form" noValidate>
        <input
          className="search__input"
          name="search"
          id="search"
          placeholder="Фильм"
          type="text"
          minLength="1"
          value={props.values.search || ""}
          onChange={props.handleChange}
          errors={props.errors.search}
          required
        />
        <button
          className="search__button opacity"
          type="submit"
          onClick={props.handleSearchFilms}
        >
          <img
            src={image}
            className="search__button-image"
            alt="рисунок лупы"
          ></img>
        </button>
      </form>
      <span className="search__error">{props.apiErrorMessage}</span>
      <FilterCheckbox
        isCheckboxChecked={props.isCheckboxChecked}
        setIsCheckboxChecked={props.setIsCheckboxChecked}
        handleChangeCheckbox={props.handleChangeCheckbox}
      />
      <hr className="search__line" />
    </section>
  );
}
