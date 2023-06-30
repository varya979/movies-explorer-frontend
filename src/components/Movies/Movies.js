import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies(props) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesArr={props.moviesArr} location={props.location} />
      <button className="movies__button opacity" type="button">
        Ещё
      </button>
    </main>
  );
}
