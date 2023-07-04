import React from "react";

import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  return (
    <nav className="navigation">
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `navigation__link opacity
          ${isActive ? "navigation__link_active" : ""}`
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={({ isActive }) =>
          `navigation__link opacity
          ${isActive ? "navigation__link_active" : ""}`
        }
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}
