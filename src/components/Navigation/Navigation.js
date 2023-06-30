import React from "react";

import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  return (
    <nav className="header__navigation">
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `header__navigation-link opacity
          ${isActive ? "header__navigation-link_active" : ""}`
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={({ isActive }) =>
          `header__navigation-link opacity
          ${isActive ? "header__navigation-link_active" : ""}`
        }
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}
