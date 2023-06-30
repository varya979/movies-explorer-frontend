import { React } from "react";

import { Link, NavLink } from "react-router-dom";

import header_link from "../../images/header_link.svg";

export default function BurgerPopup(props) {
  return (
    <div className={`${props.isOpen ? "burger-popup_open" : "burger-popup"}`}>
      <div className="burger-popup__container">
        <button
          className="burger-popup__close-button"
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
        <Link to="/profile" className="burger-popup__account-link opacity">
          Аккаунт
          <button className="burger-popup__account-button">
            <img
              src={header_link}
              className="burger-popup__account-image"
              alt="рисунок аккаунта"
            ></img>
          </button>
        </Link>
      </div>
    </div>
  );
}
