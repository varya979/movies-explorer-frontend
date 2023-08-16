import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import apiMovies from "../../utils/MoviesApi";
import apiMain from "../../utils/MainApi";

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
  const [savedMovies, setSavedMovies] = React.useState([]);

  const { values, setValues, handleChange, errors } = useFormValidation(
    props.setApiErrorMessage
  );

  const moreButtonClassName = `${
    isMoviesBlockVisible &&
    "movies__button" &&
    allMoviesFromLocalStorage.length > visibleMoviesCount
      ? "movies__button_visible opacity"
      : "movies__button"
  }`;

  React.useEffect(() => {
    if (props.isLoggedIn) {
      getSavedMovies();
    }
  }, [props.isLoggedIn]);

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

  //handleGetMovies
  const getApiMovies = async (search) => {
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
  };

  const handleChangeCheckbox = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  //handleSearchMovies
  const handleSearchMovies = (evt) => {
    evt.preventDefault();

    getApiMovies(values.search);
  };

  const showMoreMovies = () => {
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
  };

  //handleGetSavedMovies
  const getSavedMovies = async () => {
    try {
      // if (!allMoviesFromLocalStorage) {
      const movies = await apiMain.getMovies();
      setSavedMovies(movies);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  //handleCreateMovie
  const saveMovie = async (movie) => {
    try {
      await apiMain.postMovie(movie);
      getSavedMovies();
    } catch (err) {
      console.log(err);
    }
  };

  //handleDeleteMovie
  const deleteMovie = async (movieId) => {
    try {
      const deletedMovie = await apiMain.deleteMovie(movieId);
      setSavedMovies((movies) => {
        return movies.filter((movie) => movie._id !== deletedMovie._id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="movies">
      <SearchForm
        setApiErrorMessage={props.setApiErrorMessage}
        apiErrorMessage={props.apiErrorMessage}
        allMoviesFromLocalStorage={allMoviesFromLocalStorage}
        getApiMovies={getApiMovies}
        handleSearchMovies={handleSearchMovies}
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
            location={props.location}
            isMoviesBlockVisible={isMoviesBlockVisible}
            visibleMoviesCount={visibleMoviesCount}
            checkboxValueFromLocalStorage={checkboxValueFromLocalStorage}
            allMoviesFromLocalStorage={allMoviesFromLocalStorage}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
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
