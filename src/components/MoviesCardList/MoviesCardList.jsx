import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <ul className="movies__list">
      {props.moviesArr.map((movie) => (
        <MoviesCard
          key={movie._id}
          movie={movie}
          location={props.location}
        />
      ))}
    </ul>

  );
}
