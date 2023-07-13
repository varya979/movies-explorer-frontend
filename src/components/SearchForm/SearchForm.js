import React from "react";

import image from "../../images/input_button.svg";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { useFormValidation } from "../../utils/useFormValidation";

export default function SearchForm(props) {
  const { values, setValues, handleChange, errors, isValid } =
    useFormValidation(props.setApiErrorMessage);

  function handleSearchFilms(evt) {
    evt.preventDefault();

    if (!isValid || "") {
      props.setApiErrorMessage("Нужно ввести ключевое слово");
    } else if (isValid) {
      props.getApiMovies(values.search);
    }
  }

  React.useEffect(() => {
    setValues({ ...values, search: props.searchValueFromLocalStorage });
  }, [setValues, props.searchValueFromLocalStorage]);

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
          value={values.search || ""}
          onChange={handleChange}
          errors={errors.search}
          required
        ></input>
        <button
          className="search__button opacity"
          type="submit"
          onClick={handleSearchFilms}
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
