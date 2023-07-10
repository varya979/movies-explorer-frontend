import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import apiMovies from "../../utils/MoviesApi";

export default function Movies(props) {
  const [allMoviesInLocalStorage, setAllMoviesInLocalStorage] = React.useState(
    []
  );
  const [isMoviesBlockVisible, setIsMoviesBlockVisible] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setAllMoviesInLocalStorage(JSON.parse(localStorage.getItem("apiMovies")));
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

      setAllMoviesInLocalStorage(JSON.parse(localStorage.getItem("apiMovies")));

      localStorage.setItem("searchMovieValue", value);

      localStorage.setItem("checkboxValue", isCheckboxChecked);

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

  const [card, setCard] = React.useState([]);
  const [visibleCard, setVisibleCard] = React.useState(3);

  function showMoreMovies() {
    setVisibleCard((prevValue) => prevValue + 3);
  }

  return (
    <main className="movies">
      <SearchForm
        setApiErrorMessage={props.setApiErrorMessage}
        apiErrorMessage={props.apiErrorMessage}
        allMoviesInLocalStorage={allMoviesInLocalStorage}
        setAllMoviesInLocalStorage={setAllMoviesInLocalStorage}
        getApiMovies={getApiMovies}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      {isLoadingData ? (
        <Preloader />
      ) : !allMoviesInLocalStorage ? (
        <div className="movies__error-container">
          {!errorMessage ? (
            <span className="movies__error">Ничего не найдено</span>
          ) : (
            <span className="movies__error">{errorMessage}</span>
          )}
        </div>
      ) : (
        <>
          <MoviesCardList
            moviesArr={props.moviesArr}
            location={props.location}
            isMoviesBlockVisible={isMoviesBlockVisible}
            visibleCard={visibleCard}
          />
          <button
            className={
              props.moviesArr.length === visibleCard
                ? "movies__button_invisible"
                : "movies__button opacity"
            }
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
