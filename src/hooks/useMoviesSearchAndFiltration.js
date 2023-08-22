import React from "react";

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
      return searchedMovies.filter((movie) => movie.duration <= 40);
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
