import React from "react";

import image from "../../images/input_button.svg";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" placeholder="Фильм" type="text"></input>
        <button className="search__button opacity">
          <img src={image} className="search__button-image" alt="рисунок лупы"></img>
        </button>
      </form>
      <FilterCheckbox />
      <hr className="search__line"/>
    </section>
  );
}
