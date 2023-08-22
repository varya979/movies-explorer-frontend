import React from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function MoviesCard(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const moviesLikeButtonClassName = isMovieSaved
    ? "movie-item__button-like-red"
    : "movie-item__button-like-white";

  const moviesDeleteButtonClassName = `movie-item__button-delete ${
    isMovieSaved && "movie-item__button-delete_visible"
  }`;

  React.useEffect(() => {
    if (props.location.pathname === "/movies") {
      const isMovieOwn = props.savedMovies.some(
        (movie) =>
          movie.movieId === props.movie.id &&
          movie.owner._id === currentUser._id
      );
      setIsMovieSaved(isMovieOwn);
    }
  }, []);

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  };

  const handleSaveOrDeleteMovie = () => {
    const movie = {
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: props.movie.image.url,
      trailerLink: props.movie.trailerLink,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN,
      thumbnail: props.movie.thumbnail,
      movieId: props.movie.id,
    };
    if (props.location.pathname === "/saved-movies") {
      props.deleteMovie(props.movie);
    } else {
      const selectedMovie = props.savedMovies.find(
        (movie) => movie.movieId === props.movie.id
      );
      isMovieSaved
        ? props.deleteMovie(selectedMovie._id)
        : props.saveMovie(movie);
      setIsMovieSaved(!isMovieSaved);
    }
  };

  return (
    <li className="movie-item">
      <a
        href={props.movie.trailerLink}
        className="movie-item__trailer-link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-item__image"
          src={`https://api.nomoreparties.co/${props.movie.image.url}`}
          alt={props.movie.nameRu || props.movie.nameEN}
        />
      </a>
      <div className="movie-item__info">
        <div className="movie-item__info-container">
          <p className="movie-item__name">
            {props.movie.nameRU || props.movie.nameEN}
          </p>
          <p className="movie-item__duration">
            {getTimeFromMins(props.movie.duration)}
          </p>
        </div>
        <div className="movie-item__likes-container">
          {props.location.pathname === "/movies" && (
            <button
              className={`${moviesLikeButtonClassName} opacity`}
              type="button"
              onClick={handleSaveOrDeleteMovie}
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
