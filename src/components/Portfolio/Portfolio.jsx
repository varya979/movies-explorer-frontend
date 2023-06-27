import React from "react";

import anchor from "../../images/portfolio.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <p className="portfolio__item-title">Статичный сайт</p>
          <a href="https://github.com/varya979/russian-travel" className="portfolio__link opacity">
            <img src={anchor} className="portfolio__item-image opacity" alt="ссылка перехода на сайт"></img>
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-title">Адаптивный сайт</p>
          <a href="https://github.com/varya979" className="portfolio__link opacity">
            <img src={anchor} className="portfolio__item-image opacity" alt="ссылка перехода на сайт"></img>
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-title">Одностраничное приложение</p>
          <a href="https://github.com/varya979/react-mesto-api-full-gha" className="portfolio__link opacity">
            <img src={anchor} className="portfolio__item-image opacity" alt="ссылка перехода на сайт"></img>
          </a>
        </li>
      </ul>
    </section>
  );
}
