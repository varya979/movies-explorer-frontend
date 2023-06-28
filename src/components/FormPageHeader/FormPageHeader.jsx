import React from "react";

import { Link } from "react-router-dom";

export default function FormPageHeader(props) {
  return (
    <header className="form-page-header">
      <Link to="/" className="form-page-header__logo main-logo opacity"/>
      <h1 className="form-page-header__title">{props.title}</h1>
    </header>
  );
}
