import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { useMoviesSearchAndFiltration } from "../../hooks/useMoviesSearchAndFiltration";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

import apiMain from "../../utils/MainApi";

export default function SavedMovies(props) {
  // const [isMoviesBlockVisible, setIsMoviesBlockVisible] = React.useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [listOfSavedMovies, setListOfSavedMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useContext(SavedMoviesContext);
  const { searchMovie, changeCheckbox } = useMoviesSearchAndFiltration();

  React.useEffect(() => {
    setListOfSavedMovies(savedMovies);
    setFilterMovies(savedMovies);
  }, [savedMovies]);

  // const getSavedMovies = async () => {
  //   try {
  //     const movies = await apiMain.getMovies();
  //     setSavedMovies(movies);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const searchMovies = async (searchInputValue, checkboxState) => {
    setIsCheckboxChecked(checkboxState);

    const searchedMovies = searchMovie(savedMovies, searchInputValue);
    const shortMovies = changeCheckbox(searchedMovies, checkboxState);
    setFilterMovies(shortMovies);
    setListOfSavedMovies(searchedMovies);

    searchedMovies.length === 0 || shortMovies.length === 0
      ? setErrorMessage("Ничего не найдено")
      : setErrorMessage("");
  };

  const changeCheckboxState = (checkboxState) => {
    const shortMovies = changeCheckbox(listOfSavedMovies, checkboxState);
    setFilterMovies(shortMovies);
    shortMovies.length === 0
      ? setErrorMessage("Ничего не найдено")
      : setErrorMessage("");
  };

  const deleteMovie = async (movieId) => {
    try {
      const deletedMovie = await apiMain.deleteMovie(movieId);

      setSavedMovies((movies) => {
        return movies.filter(
          (movie) => movie._id !== deletedMovie._id && movie._id !== movieId
        );
      });

      setFilterMovies((movies) =>
        movies.filter((movie) => movie._id !== movieId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="saved-movies">
      <SearchForm
        location={props.location}
        setApiErrorMessage={props.setApiErrorMessage}
        apiErrorMessage={props.apiErrorMessage}
        searchMovies={searchMovies}
        isCheckboxChecked={isCheckboxChecked}
        changeCheckboxState={changeCheckboxState}
      />
      {errorMessage ? (
        <div className="saved-movies__error-container">
          <span className="saved-movies__error">{errorMessage}</span>
        </div>
      ) : (
        <MoviesCardList
          location={props.location}
          deleteMovie={deleteMovie}
          savedMovies={savedMovies}
          filterMovies={filterMovies}
          setFilterMovies={setFilterMovies}
        />
      )}
    </main>
  );
}
