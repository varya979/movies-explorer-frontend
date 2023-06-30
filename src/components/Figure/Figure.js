import { React } from "react";

export default function Figure(props) {
  return (
    <figure className="popup__figure">
      <img className="popup__figure-image" src={props.img} alt={props.alt} />
      <h3 className="popup__figure-text">{props.text}</h3>
    </figure>
  );
}
