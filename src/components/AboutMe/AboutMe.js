import React from "react";

import photo from "../../images/about-me_photo.svg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__name name" id="about-me">
        Студент
      </h2>
      <div className="about-me__article-cover">
        <article className="about-me__article">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__paragraph">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/varya979"
            className="about-me__link-github opacity"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </article>
        <img src={photo} className="about-me__photo" alt="фото студента"></img>
      </div>
    </section>
  );
}
