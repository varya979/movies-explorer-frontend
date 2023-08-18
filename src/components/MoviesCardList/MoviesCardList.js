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
          {props.filterMovies
            .slice(0, props.visibleMoviesCount)
            .map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                location={props.location}
                saveMovie={props.saveMovie}
                deleteMovie={props.deleteMovie}
                savedMovies={props.savedMovies}
                setSavedMovies={props.setSavedMovies}
              />
            ))}
        </ul>
      )}
      {props.location.pathname === "/saved-movies" && (
        <ul className="movies-list">
          {props.savedMovies.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              location={props.location}
              saveMovie={props.saveMovie}
              deleteMovie={props.deleteMovie}
              savedMovies={props.savedMovies}
            />
          ))}
        </ul>
      )}
    </>
  );
}
