import React from "react";

export default function MoviesCard(props) {
  const moviesLikeButtonClassName = `movie-item__button-like ${
    props.movie.isLiked && "movie-item__button-like_active"
  }`;

  const moviesDeleteButtonClassName = `movie-item__button-delete ${
    props.movie.isLiked && "movie-item__button-delete_visible"
  }`;

  return (
    <li className="movie-item">
      <img
        className="movie-item__image"
        src={props.movie.link}
        alt={props.movie.name}
      />
      <div className="movie-item__info">
        <div className="movie-item__info-container">
          <p className="movie-item__name">{props.movie.name}</p>
          <p className="movie-item__duration">{props.movie.duration}</p>
        </div>
        <div className="movie-item__likes-container">
          {props.location.pathname === "/movies" && (
            <button
              className={`${moviesLikeButtonClassName} opacity`}
              type="button"
            />
          )}
          {props.location.pathname === "/saved-movies" && (
            <button
              className={`${moviesDeleteButtonClassName} opacity`}
              type="button"
            />
          )}
        </div>
      </div>
    </li>
  );
}
