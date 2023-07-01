import React from "react";

import LandingTitle from "../LandingTitle/LandingTitle";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__wrapper">
        <LandingTitle title={"Технологии"} />
        <article className="techs__article">
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </article>
        <ul className="techs__icons">
          <li className="techs__icon">HTML</li>
          <li className="techs__icon">CSS</li>
          <li className="techs__icon">JS</li>
          <li className="techs__icon">React</li>
          <li className="techs__icon">Git</li>
          <li className="techs__icon">Express.js</li>
          <li className="techs__icon">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
