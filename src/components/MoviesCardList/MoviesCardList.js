import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {
  return (
    <>
      {props.location.pathname === "/movies" && (
        <ul
          className={`movies-list ${
            props.isMoviesBlockVisible && "movies-list_visiable"
          }`}
        >
          {props.moviesArr.slice(0, props.visibleCard).map((movie) => (
            <MoviesCard
              key={movie._id}
              movie={movie}
              location={props.location}
            />
          ))}
        </ul>
      )}
      {props.location.pathname === "/saved-movies" && (
        <ul className="movies-list">
          {props.isLikedMovies.map((movie) => (
            <MoviesCard
              key={movie._id}
              movie={movie}
              location={props.location}
            />
          ))}
        </ul>
      )}
    </>
  );
}
