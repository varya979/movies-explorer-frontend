import { React } from "react";

import { Link } from "react-router-dom";

export default function AccountLogo() {
  return (
    <Link to="/profile" className="account-logo opacity">
      Аккаунт
      <span className="account-logo__img"></span>
    </Link>
  );
}
