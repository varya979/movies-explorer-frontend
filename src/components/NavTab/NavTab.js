import React from "react";

export default function NavTab() {
  return (
    <nav className="nav">
      <a href="#about-project" className="nav__link opacity">
        О проекте
      </a>
      <a href="#techs" className="nav__link opacity">
        Технологии
      </a>
      <a href="#about-me" className="nav__link opacity">
        Студент
      </a>
    </nav>
  );
}
