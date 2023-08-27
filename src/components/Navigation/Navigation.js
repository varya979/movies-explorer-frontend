import React from "react";

import { NavLink, Link } from "react-router-dom";

export default function Navigation(props) {
  const lightHeaderLocationAfterLogin =
    props.location.pathname === "/movies" ||
    props.location.pathname === "/saved-movies" ||
    props.location.pathname === "/profile";

  const darkHeaderLocationAfterLogin = props.location.pathname === "/";

  return (
    <>
      {lightHeaderLocationAfterLogin && (
        <nav className="navigation">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `navigation__link-dark opacity
          ${isActive ? "navigation__link-dark_active" : ""}`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `navigation__link-dark opacity
          ${isActive ? "navigation__link-dark_active" : ""}`
            }
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
      )}
      {darkHeaderLocationAfterLogin && (
        <nav className="navigation">
          <Link to="/movies" className="navigation__link-light opacity">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navigation__link-light opacity">
            Сохранённые фильмы
          </Link>
        </nav>
      )}
    </>
  );
}
