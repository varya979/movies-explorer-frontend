import React from "react";

import LandingTitle from "../LandingTitle/LandingTitle";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <LandingTitle title={"О проекте"} />
      <div className="about-project__info">
        <article className="about-project__article">
          <h3 className="about-project__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="about-project__time-scale">
        <div className="about-project__time-block">
          <p className="about-project__weeks about-project__weeks_green">
            1 неделя
          </p>
          <p className="about-project__course">Back-end</p>
        </div>
        <div className="about-project__time-block">
          <p className="about-project__weeks">4 недели</p>
          <p className="about-project__course">Front-end</p>
        </div>
      </div>
    </section>
  );
}
