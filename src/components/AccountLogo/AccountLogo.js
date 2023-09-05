import { React } from "react";

import { Link } from "react-router-dom";

export default function AccountLogo(props) {
  const lightHeaderLocationAfterLogin =
    props.location.pathname === "/movies" ||
    props.location.pathname === "/saved-movies" ||
    props.location.pathname === "/profile";

  const darkHeaderLocationAfterLogin = props.location.pathname === "/";

  return (
    <>
      {(lightHeaderLocationAfterLogin || props.isBurgerPopupOpen) && (
        <Link
          to="/profile"
          className="account-logo opacity"
          onClick={props.onClose}
        >
          Аккаунт
          <span className="account-logo__img-dark"></span>
        </Link>
      )}
      {darkHeaderLocationAfterLogin && !props.isBurgerPopupOpen && (
        <Link
          to="/profile"
          className={
            props.isBurgerPopupOpen
              ? "account-logo opacity"
              : "account-logo account-logo_light opacity"
          }
          onClick={props.onClose}
        >
          Аккаунт
          <span className="account-logo__img-light"></span>
        </Link>
      )}
    </>
  );
}
