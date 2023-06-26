import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__year" lang="en"> &copy; {new Date().getFullYear()}</p>
        <nav className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link opacity">Яндекс.Практикум</a>
          <a href="https://github.com/varya979" className="footer__link opacity"> Github</a>
        </nav>
      </div>
    </footer>
  );
}
