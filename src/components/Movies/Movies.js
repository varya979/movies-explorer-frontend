import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import apiMovies from "../../utils/MoviesApi";

import { useResize } from "../../hooks/useResize";
import { useFormValidation } from "../../hooks/useFormValidation";

import {
  SCREEN_M,
  SCREEN_L,
  VISIBLE_CARDS_COUNT_S,
  VISIBLE_CARDS_COUNT_M,
  VISIBLE_CARDS_COUNT_L,
  VISIBLE_CARDS_COUNT_MORE_S_M,
  VISIBLE_CARDS_COUNT_MORE_L,
} from "../../utils/constants";

export default function Movies(props) {
  const width = useResize();
  let allMoviesFromLocalStorage = JSON.parse(localStorage.getItem("apiMovies"));
  let searchInputValueFromLocalStorage =
    localStorage.getItem("searchInputValue");
  let checkboxValueFromLocalStorage = localStorage.getItem("checkboxValue");
  const [isMoviesBlockVisible, setIsMoviesBlockVisible] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(0);

  const { values, setValues, handleChange, errors } = useFormValidation(
    props.setApiErrorMessage
  );

  const moreButtonClassName = `${
    isMoviesBlockVisible &&
    "movies__button" &&
    allMoviesFromLocalStorage.length > visibleMoviesCount
      ? "movies__button_visible"
      : "movies__button opacity"
  }`;

  React.useEffect(() => {
    if (width >= SCREEN_L) {
      setVisibleMoviesCount(VISIBLE_CARDS_COUNT_L);
    } else if (width < SCREEN_L && width > SCREEN_M) {
      setVisibleMoviesCount(VISIBLE_CARDS_COUNT_M);
    } else if (width <= SCREEN_M) {
      setVisibleMoviesCount(VISIBLE_CARDS_COUNT_S);
    }
  }, [width]);

  React.useEffect(() => {
    if (localStorage.getItem("apiMovies")) {
      allMoviesFromLocalStorage = JSON.parse(localStorage.getItem("apiMovies"));
      searchInputValueFromLocalStorage =
        localStorage.getItem("searchInputValue");
      checkboxValueFromLocalStorage = localStorage.getItem("checkboxValue");
    }
    if (searchInputValueFromLocalStorage) {
      getApiMovies(searchInputValueFromLocalStorage);
      setIsCheckboxChecked(checkboxValueFromLocalStorage);
    }
  }, []);

  React.useEffect(() => {
    setValues({
      values,
      search: searchInputValueFromLocalStorage,
    });
  }, [setValues, searchInputValueFromLocalStorage]);

  async function getApiMovies(search) {
    if (!search || search === "") {
      props.setApiErrorMessage("Нужно ввести ключевое слово");
    } else {
      try {
        setIsLoadingData(true);
        if (!allMoviesFromLocalStorage) {
          props.setApiErrorMessage("");
          const movies = await apiMovies.getMovies();

          localStorage.setItem("apiMovies", JSON.stringify(movies));
          allMoviesFromLocalStorage = JSON.parse(
            localStorage.getItem("apiMovies")
          );

          localStorage.setItem("searchInputValue", search);
          localStorage.setItem("checkboxValue", isCheckboxChecked);
        }

        setIsLoadingData(false);
        setIsMoviesBlockVisible(true);
      } catch (err) {
        setErrorMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        setIsLoadingData(false);
      }
    }
  }

  function handleSearchFilms(evt) {
    evt.preventDefault();

    getApiMovies(values.search);
  }

  function handleChangeCheckbox() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  function showMoreMovies() {
    if (width >= SCREEN_L) {
      setVisibleMoviesCount(
        (prevValue) => prevValue + VISIBLE_CARDS_COUNT_MORE_L
      );
    } else if (width < SCREEN_L && width > SCREEN_M) {
      setVisibleMoviesCount(
        (prevValue) => prevValue + VISIBLE_CARDS_COUNT_MORE_S_M
      );
    } else if (width <= SCREEN_M) {
      setVisibleMoviesCount(
        (prevValue) => prevValue + VISIBLE_CARDS_COUNT_MORE_S_M
      );
    }
  }

  return (
    <main className="movies">
      <SearchForm
        setApiErrorMessage={props.setApiErrorMessage}
        apiErrorMessage={props.apiErrorMessage}
        allMoviesFromLocalStorage={allMoviesFromLocalStorage}
        getApiMovies={getApiMovies}
        handleSearchFilms={handleSearchFilms}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        handleChangeCheckbox={handleChangeCheckbox}
        searchInputValueFromLocalStorage={searchInputValueFromLocalStorage}
        values={values}
        setValues={setValues}
        handleChange={handleChange}
        errors={errors}
      />
      {isLoadingData ? (
        <Preloader />
      ) : !allMoviesFromLocalStorage ? (
        <div className="movies__error-container">
          <span className="movies__error">{errorMessage}</span>
        </div>
      ) : (
        <>
          <MoviesCardList
            moviesArr={props.moviesArr}
            location={props.location}
            isMoviesBlockVisible={isMoviesBlockVisible}
            visibleMoviesCount={visibleMoviesCount}
            checkboxValueFromLocalStorage={checkboxValueFromLocalStorage}
            allMoviesFromLocalStorage={allMoviesFromLocalStorage}
          />
          <button
            className={moreButtonClassName}
            type="button"
            onClick={showMoreMovies}
          >
            Ещё
          </button>
        </>
      )}
    </main>
  );
}
