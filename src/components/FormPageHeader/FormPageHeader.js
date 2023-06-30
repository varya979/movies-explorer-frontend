import React from "react";

import Logo from "../../components/Logo/Logo";

export default function FormPageHeader(props) {
  return (
    <header className="form-page-header">
      <Logo />
      <h1 className="form-page-header__title">{props.title}</h1>
    </header>
  );
}
