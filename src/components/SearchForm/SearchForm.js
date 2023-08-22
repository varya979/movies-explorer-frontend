import React from "react";

import image from "../../images/input_button.svg";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import { useMoviesSearchAndFiltration } from "../../hooks/useMoviesSearchAndFiltration";

export default function SearchForm(props) {
  const [checkboxState, setCheckboxState] = React.useState(false);

  const { saveMovieTitleToLocalStorage, changeMovieTitle, searchInputValue } =
    useMoviesSearchAndFiltration(props.formType);

  const searchMovies = (evt) => {
    evt.preventDefault();

    if (props.location.pathname === "/movies") {
      saveMovieTitleToLocalStorage();
      localStorage.setItem("checkboxValue", checkboxState);
    }

    if (!!searchInputValue) {
      props.searchMovies(searchInputValue, checkboxState);
      props.setApiErrorMessage("");
    } else {
      props.location.pathname === "/movies" &&
        props.setApiErrorMessage("Нужно ввести ключевое слово");
      // : onResetForm(checked);
    }
  };

  const changeCheckboxState = (checkboxState) => {
    setCheckboxState(checkboxState);
    props.changeCheckboxState(checkboxState);
  };

  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={searchMovies}>
        <input
          className="search__input"
          name="search"
          id="search"
          placeholder="Фильм"
          type="text"
          minLength="1"
          value={searchInputValue}
          onChange={changeMovieTitle}
          // errors={props.errors.search}
          required
        />
        <button
          className="search__button opacity"
          // onClick={searchMovies}
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
        // setIsCheckboxChecked={props.setIsCheckboxChecked}
        changeCheckboxState={changeCheckboxState}
      />
      <hr className="search__line" />
    </section>
  );
}
