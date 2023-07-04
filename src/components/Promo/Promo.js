import React from "react";

import promoLogo from "../../images/promo_logo.svg";

export default function Promo() {
  return (
    <section className="promo">
      <img
        className="promo__logo"
        src={promoLogo}
        alt="логотип дипломной работы"
      />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}
