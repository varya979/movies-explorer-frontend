import { React } from "react";

import { Link, NavLink } from "react-router-dom";

import AccountLogo from "../../components/AccountLogo/AccountLogo";

export default function BurgerPopup(props) {
  return (
    <div
      className={`${
        props.isOpen ? "burger-popup burger-popup_open" : "burger-popup"
      }`}
    >
      <div className="burger-popup__container">
        <button
          className="burger-popup__close-button opacity"
          onClick={props.onClose}
          type="button"
        ></button>
        <nav className="burger-popup__links-container">
          <Link to="/" className="burger-popup__link opacity">
            Главная
          </Link>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `burger-popup__link opacity
                  ${isActive ? "burger-popup__link_active" : ""}`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `burger-popup__link opacity
                  ${isActive ? "burger-popup__link_active" : ""}`
            }
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <AccountLogo />
      </div>
    </div>
  );
}
