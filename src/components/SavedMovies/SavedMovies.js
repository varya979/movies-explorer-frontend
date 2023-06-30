import React from "react";

import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies(props) {
  return (
    <main className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList
        isLikedMovies={props.isLikedMovies}
        location={props.location}
      />
    </main>
  );
}
