import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    /* Сергей, если Вас не затруднит, не могли бы Вы объяснить (или приложить какую-нибудь ссылку).

       Если установить navigate(-1) и нажать Назад, в панеле браузера видно, что возврат был совершен
       (но осталась страница 404) и теперь стало возможным перейти вперед (будет опять же - 404 страница).
       Повторное нажатие накнопку Назад уже перекинет на верную страницу, с которой я ушла на 404
       и к которой нужно было вернуться.

       Если вывести в консоль navigate.length, выводится значение 2, как я понимаю, поэтому navigate(-1)
       в моем случае не работает, а navigate(-2) работает.

       Копалась в интернете, но не нашла точного ответа почему так происходит. */
    navigate(-2);
  };

  console.log(navigate.length);

  return (
    <section className="not-found-page">
      <h3 className="not-found-page__title">404</h3>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <button className="not-found-page__button opacity" onClick={goBack}>
        Назад
      </button>
    </section>
  );
};
