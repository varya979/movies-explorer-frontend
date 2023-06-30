import { React, useState } from "react";

import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import BurgerPopup from "../../components/BurgerPopup/BurgerPopup";

import header_link from "../../images/header_link.svg";

export default function Header(props) {
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);

  function handleOpenBurgerPopup() {
    setIsBurgerPopupOpen(true);
  }

  function handleCloseBurgerPopup() {
    setIsBurgerPopupOpen(false);
  }

  return (
    <>
      {!props.isLoggedIn && (
        <header className="header header_dark">
          <Link to="/" className="header__logo main-logo opacity" />
          <nav className="header__nav">
            <Link to="/signup" className="header__link opacity">
              Регистрация
            </Link>
            <Link
              to="/signin"
              className="header__link header__link_green opacity"
            >
              Войти
            </Link>
          </nav>
        </header>
      )}
      {props.isLoggedIn && (
        <header className="header header_light">
          <Link to="/" className="header__logo main-logo opacity" />
          <Navigation />
          <Link
            to="/profile"
            className="header__link header__link_dark opacity"
          >
            Аккаунт
            <button className="header__link-button">
              <img
                src={header_link}
                className="header__link-image"
                alt="рисунок аккаунта"
              ></img>
            </button>
          </Link>
          <button
            className="header__account-button opacity"
            onClick={handleOpenBurgerPopup}
          ></button>
        </header>
      )}
      <BurgerPopup
        isOpen={isBurgerPopupOpen}
        onClose={handleCloseBurgerPopup}
      />
    </>
  );
}
