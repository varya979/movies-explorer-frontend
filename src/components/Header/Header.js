import { React, useState } from "react";

import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import BurgerPopup from "../../components/BurgerPopup/BurgerPopup";
import Logo from "../../components/Logo/Logo";
import AccountLogo from "../../components/AccountLogo/AccountLogo";

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
        </header>
      )}
      {props.isLoggedIn && (
        <header className="header header_light">
          <Logo />
          <Navigation />
          <div className="header__account-logo-visibility">
            <AccountLogo />
          </div>
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
