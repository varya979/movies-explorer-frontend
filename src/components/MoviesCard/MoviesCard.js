import React from "react";

export default function MoviesCard(props) {
  const moviesLikeButtonClassName = `movie-item__button-like ${
    props.savedMovies.some((movie) => movie.movieId === props.movie.id) &&
    props.isMovieSaved &&
    "movie-item__button-like_active"
  }`;

  const moviesDeleteButtonClassName = `movie-item__button-delete ${
    props.isMovieSaved && "movie-item__button-delete_visible"
  }`;

  React.useEffect(() => {
    if (props.savedMovies.some((movie) => movie.movieId === props.movie.id)) {
      props.setIsMovieSaved(true);
    }
  }, [props.savedMovies, props.movie.id]);

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }

  function handleSaveMovie() {
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
    props.saveMovie(movie);
    props.setIsMovieSaved(true);
  }

  function handleDeleteMovie() {
    props.deleteMovie(props.movie.id, props.setIsMovieSaved);
  }

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
              onClick={
                props.savedMovies.some(
                  (movie) => movie.movieId === props.movie.id
                ) && props.isMovieSaved
                  ? handleDeleteMovie
                  : handleSaveMovie
              }
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
