import React from "react";

export default function NavTab() {
  return (
    <nav className="nav-bar">
      <a href="#about-project" className="nav-bar__link opacity">
        О проекте
      </a>
      <a href="#techs" className="nav-bar__link opacity">
        Технологии
      </a>
      <a href="#about-me" className="nav-bar__link opacity">
        Студент
      </a>
    </nav>
  );
}
