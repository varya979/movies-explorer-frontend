import { React } from "react";

import { Link } from "react-router-dom";

export default function AccountLogo(props) {
  return (
    <Link
      to="/profile"
      className="account-logo opacity"
      onClick={props.onClose}
    >
      Аккаунт
      <span className="account-logo__img"></span>
    </Link>
  );
}
