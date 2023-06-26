import React from "react";

import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

import header_link from "../../images/header_link.svg";

export default function Header(props) {
  return (
    <>
      {!props.loggedIn && (
        <header className="header header_type_dark">
          <Link to="/" className="header__logo opacity"/>
          <nav className="header__nav">
            <Link to="/signup" className="header__link opacity">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_type_green opacity">Войти</Link>
          </nav>
        </header>
      )}
      {props.loggedIn && (
        <header className="header header_type_light">
          <Link to="/" className="header__logo opacity"/>
          <Navigation />
          <Link to="/profile" className="header__link header__link_type_dark opacity"
          >Аккаунт
            <button className="header__link-button">
              <img src={header_link} className="header__link-image" alt="рисунок аккаунта"></img>
            </button>
          </Link>
        </header>
      )}
    </>
  );
}
