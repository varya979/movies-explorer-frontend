import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => navigate(-3);

  return (
    <section className="not-found-page">
      <h3 className="not-found-page__title">404</h3>
      <p className="not-found-page__subtitle">Страница не найдена</p>
      <button className="not-found-page__button opacity" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}
