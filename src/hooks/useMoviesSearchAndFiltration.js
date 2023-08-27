import React from "react";

import { SHORT_MOVIE_DURATION } from "../utils/constants";

export function useMoviesSearchAndFiltration(formType) {
  const [searchInputValue, setSearchInputValue] = React.useState("");

  React.useEffect(() => {
    if (formType === "movies")
      setSearchInputValue(localStorage.getItem("searchInputValue") || "");
  }, []);

  const searchMovie = (moviesFormApiMovies, searchInputValue) => {
    return moviesFormApiMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchInputValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchInputValue.toLowerCase())
    );
  };

  const changeCheckbox = (searchedMovies, checkboxState) => {
    if (!!checkboxState) {
      return searchedMovies.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION
      );
    } else {
      return searchedMovies;
    }
  };

  const saveMovieTitleToLocalStorage = () => {
    localStorage.setItem("searchInputValue", searchInputValue);
  };

  const changeMovieTitle = (evt) => {
    setSearchInputValue(evt.target.value);
  };

  return {
    searchInputValue,
    searchMovie,
    changeCheckbox,
    saveMovieTitleToLocalStorage,
    changeMovieTitle,
  };
}
