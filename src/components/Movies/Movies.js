import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import apiMovies from "../../utils/MoviesApi";
import apiMain from "../../utils/MainApi";

import { useResize } from "../../hooks/useResize";
import { useMoviesSearchAndFiltration } from "../../hooks/useMoviesSearchAndFiltration";

import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

import {
  SCREEN_S,
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
  const allApiMoviesFromLS = JSON.parse(localStorage.getItem("apiMovies"));
  const [allMoviesFromApiMovies, setAllMoviesFromApiMovies] = React.useState(
    []
  );
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [isMoviesBlockVisible, setIsMoviesBlockVisible] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(0);
  const [savedMovies, setSavedMovies] = React.useContext(SavedMoviesContext);
  const { searchMovie, changeCheckbox } = useMoviesSearchAndFiltration();

  const moreButtonClassName = `${
    isMoviesBlockVisible &&
    "movies__button" &&
    filterMovies.length > visibleMoviesCount
      ? "movies__button_visible opacity"
      : "movies__button"
  }`;

  React.useEffect(() => {
    allApiMoviesFromLS === null && getApiMovies();
    getSavedMovies();
    setIsMoviesBlockVisible(true);
  }, []);

  React.useEffect(() => {
    const searchInputValueFromLS = localStorage.getItem("searchInputValue");
    const checkboxStateFormLS = localStorage.getItem("checkboxValue");
    const apiMoviesFromLS = JSON.parse(localStorage.getItem("apiMovies"));

    if (searchInputValueFromLS) {
      setIsCheckboxChecked(checkboxStateFormLS === "true" ? true : false);
      const searchedMovies = searchMovie(
        apiMoviesFromLS,
        searchInputValueFromLS
      );
      const shortMovies = changeCheckbox(searchedMovies, isCheckboxChecked);
      setFilterMovies(shortMovies);
      setIsMoviesBlockVisible(true);
    }
  }, [isCheckboxChecked]);

  React.useEffect(() => {
    if (width >= SCREEN_L && width > SCREEN_M) {
      setVisibleMoviesCount(VISIBLE_CARDS_COUNT_L);
    } else if (width < SCREEN_L && width > SCREEN_S) {
      setVisibleMoviesCount(VISIBLE_CARDS_COUNT_M);
    } else if (width <= SCREEN_S) {
      setVisibleMoviesCount(VISIBLE_CARDS_COUNT_S);
    }
  }, [width]);

  const getApiMovies = async () => {
    try {
      if (allMoviesFromApiMovies.length === 0) {
        setIsLoadingData(true);
        props.setApiErrorMessage("");
        const movies = await apiMovies.getMovies();
        setAllMoviesFromApiMovies(movies);
        localStorage.setItem("apiMovies", JSON.stringify(movies));
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
      setIsLoadingData(false);
    } finally {
      setIsLoadingData(false);
    }
  };

  const getSavedMovies = async () => {
    try {
      const movies = await apiMain.getMovies();
      setSavedMovies(movies);
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }
  };

  const searchMovies = async (searchInputValue, checkboxState) => {
    setIsCheckboxChecked(checkboxState);
    setIsLoadingData(true);
    // getApiMovies();
    const searchedMovies = await searchMovie(
      allApiMoviesFromLS,
      searchInputValue
    );
    const shortMovies = changeCheckbox(searchedMovies, checkboxState);
    setFilterMovies(shortMovies);
    setIsLoadingData(false);
    shortMovies.length === 0 && !isLoadingData
      ? setErrorMessage("Ничего не найдено")
      : setErrorMessage("");
  };

  const changeCheckboxState = (checkboxState) => {
    if (filterMovies.length > 0) {
      searchMovies(localStorage.getItem("searchInputValue"), checkboxState);
      localStorage.setItem("checkboxValue", checkboxState);
    }
  };

  const saveMovie = async (movie) => {
    try {
      await apiMain.postMovie(movie);
      // getSavedMovies();
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      const deletedMovie = await apiMain.deleteMovie(movieId);
      setSavedMovies((movies) => {
        return movies.filter((movie) => movie._id !== deletedMovie._id);
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }
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

  return (
    <main className="movies">
      <SearchForm
        formType="movies"
        location={props.location}
        setApiErrorMessage={props.setApiErrorMessage}
        apiErrorMessage={props.apiErrorMessage}
        searchMovies={searchMovies}
        isCheckboxChecked={isCheckboxChecked}
        changeCheckboxState={changeCheckboxState}
      />
      {isLoadingData ? (
        <Preloader />
      ) : errorMessage ? (
        <div className="movies__error-container">
          <span className="movies__error">{errorMessage}</span>
        </div>
      ) : (
        <>
          <MoviesCardList
            location={props.location}
            isMoviesBlockVisible={isMoviesBlockVisible}
            visibleMoviesCount={visibleMoviesCount}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}
            filterMovies={filterMovies}
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
