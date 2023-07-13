import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import {
  SCREEN_M,
  SCREEN_L,
  VISIBLE_CARDS_COUNT_S,
  VISIBLE_CARDS_COUNT_M,
  VISIBLE_CARDS_COUNT_L,
  VISIBLE_CARDS_COUNT_MORE_S_M,
  VISIBLE_CARDS_COUNT_MORE_L,
} from "../../utils/constants";

import apiMovies from "../../utils/MoviesApi";
import { useResize } from "../../hooks/useResize";

export default function Movies(props) {
  const [isMoviesBlockVisible, setIsMoviesBlockVisible] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [visibleMovies, setVisibleMovies] = React.useState(0);
  const [allMoviesFromLocalStorage, setAllMoviesFromLocalStorage] =
    React.useState([]);
  const [searchValueFromLocalStorage, setSearchValueFromLocalStorage] =
    React.useState("");
  const [checkboxValueFromLocalStorage, setCheckboxValueFromLocalStorage] =
    React.useState("");
  const [newArr, setNewArr] = React.useState([]);

  const width = useResize();

  React.useEffect(() => {
    if (width >= SCREEN_L) {
      setVisibleMovies(VISIBLE_CARDS_COUNT_L);
    } else if (width < SCREEN_L && width > SCREEN_M) {
      setVisibleMovies(VISIBLE_CARDS_COUNT_M);
    } else if (width <= SCREEN_M) {
      setVisibleMovies(VISIBLE_CARDS_COUNT_S);
    }
  }, [width]);

  React.useEffect(() => {
    setAllMoviesFromLocalStorage(JSON.parse(localStorage.getItem("apiMovies")));
    setSearchValueFromLocalStorage(localStorage.getItem("searchMovieValue"));
    setCheckboxValueFromLocalStorage(localStorage.getItem("checkboxValue"));
  }, []);

  async function getApiMovies(value) {
    try {
      setIsLoadingData(true);
      await apiMovies
        .getMovies()
        .then((movies) => {
          localStorage.setItem(
            "apiMovies",
            JSON.stringify({
              movies,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });

      localStorage.setItem("searchMovieValue", value);

      localStorage.setItem("checkboxValue", isCheckboxChecked);

      setAllMoviesFromLocalStorage(
        JSON.parse(localStorage.getItem("apiMovies"))
      );
      setNewArr(allMoviesFromLocalStorage.movies);

      localStorage.setItem(
        "searchMovies",
        JSON.stringify({
          newArr,
        })
      );

      setIsLoadingData(false);
      setIsMoviesBlockVisible(true);
    } catch (err) {
      setErrorMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
      setIsLoadingData(false);
    }
  }

  function handleChangeCheckbox() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  function showMoreMovies() {
    if (width >= SCREEN_L) {
      setVisibleMovies((prevValue) => prevValue + VISIBLE_CARDS_COUNT_MORE_L);
    } else if (width < SCREEN_L && width > SCREEN_M) {
      setVisibleMovies((prevValue) => prevValue + VISIBLE_CARDS_COUNT_MORE_S_M);
    } else if (width <= SCREEN_M) {
      setVisibleMovies((prevValue) => prevValue + VISIBLE_CARDS_COUNT_MORE_S_M);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        setApiErrorMessage={props.setApiErrorMessage}
        apiErrorMessage={props.apiErrorMessage}
        allMoviesFromLocalStorage={allMoviesFromLocalStorage}
        setAllMoviesFromLocalStorage={setAllMoviesFromLocalStorage}
        getApiMovies={getApiMovies}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        handleChangeCheckbox={handleChangeCheckbox}
        searchValueFromLocalStorage={searchValueFromLocalStorage}
      />
      {isLoadingData ? (
        <Preloader />
      ) : !allMoviesFromLocalStorage ? (
        <div className="movies__error-container">
          {errorMessage ? (
            <span className="movies__error">{errorMessage}</span>
          ) : (
            <span className="movies__error">Ничего не найдено</span>
          )}
        </div>
      ) : (
        <>
          <MoviesCardList
            moviesArr={props.moviesArr}
            location={props.location}
            isMoviesBlockVisible={isMoviesBlockVisible}
            visibleMovies={visibleMovies}
            checkboxValueFromLocalStorage={checkboxValueFromLocalStorage}
            allMoviesFromLocalStorage={allMoviesFromLocalStorage}
            newArr={newArr}
          />
          <button
            className={`{
            ${
              isMoviesBlockVisible &&
              "movies__button" &&
              newArr.length > visibleMovies
                ? "movies__button_visible"
                : "movies__button opacity"
            }
            `}
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
