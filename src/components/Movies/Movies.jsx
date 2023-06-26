import React from "react";

import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies(props) {
  return (
    <main className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList moviesArr={props.moviesArr} location={props.location}/>
      <button className="movies__button-more opacity" type="button">Ещё</button>
    </main>
  );
}
