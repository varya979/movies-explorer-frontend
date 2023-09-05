import { React, useState } from "react";

import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import BurgerPopup from "../../components/BurgerPopup/BurgerPopup";
import Logo from "../../components/Logo/Logo";
import AccountLogo from "../../components/AccountLogo/AccountLogo";

export default function Header(props) {
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);

  const lightHeaderLocationAfterLogin =
    props.location.pathname === "/movies" ||
    props.location.pathname === "/saved-movies" ||
    props.location.pathname === "/profile";

  const darkHeaderLocationAfterLogin = props.location.pathname === "/";

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
          <div className="header__wrapper">
            <Logo />
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
          </div>
        </header>
      )}
      {props.isLoggedIn && lightHeaderLocationAfterLogin && (
        <header className="header header_light">
          <div className="header__wrapper header__wrapper_movies">
            <Logo />
            <Navigation location={props.location} />
            <div className="header__account-logo-visibility">
              <AccountLogo
                location={props.location}
                isBurgerPopupOpen={isBurgerPopupOpen}
              />
            </div>
            <button
              className="header__account-button opacity"
              onClick={handleOpenBurgerPopup}
            ></button>
          </div>
        </header>
      )}
      {props.isLoggedIn && darkHeaderLocationAfterLogin && (
        <header className="header header_dark">
          <div className="header__wrapper header__wrapper_movies">
            <Logo />
            <Navigation location={props.location} />
            <div className="header__account-logo-visibility">
              <AccountLogo
                location={props.location}
                isBurgerPopupOpen={isBurgerPopupOpen}
              />
            </div>
            <button
              className="header__account-button header__account-button_light opacity"
              onClick={handleOpenBurgerPopup}
            ></button>
          </div>
        </header>
      )}
      <BurgerPopup
        isOpen={isBurgerPopupOpen}
        onClose={handleCloseBurgerPopup}
        location={props.location}
      />
    </>
  );
}
