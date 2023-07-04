import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <p className="footer__year" lang="en">
            {" "}
            &copy; {new Date().getFullYear()}
          </p>
          <nav className="footer__links">
            <a
              href="https://practicum.yandex.ru/"
              className="footer__link opacity"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/varya979"
              className="footer__link opacity"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
