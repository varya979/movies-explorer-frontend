import React from "react";

export default function MoviesCard(props) {
  const moviesLikeButtonClassName = `movies__button-like ${
    props.movie.isLiked && "movies__button-like_active"
  }`;

  const moviesDeleteButtonClassName = `movies__button-delete ${
    props.movie.isLiked && "movies__button-delete_visible"
  }`;

  return (
    <li className="movies__item">
      <img
        className="movies__image"
        src={props.movie.link}
        alt={props.movie.name}
      />
      <div className="movies__info">
        <div className="movie__info-container">
          <p className="movies__name">{props.movie.name}</p>
          <p className="movies__duration">{props.movie.duration}</p>
        </div>
        <div className="movies__likes-container">
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
