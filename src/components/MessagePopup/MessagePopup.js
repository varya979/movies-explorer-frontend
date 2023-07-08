import { React, useEffect } from "react";

export default function Popup(props) {
  useEffect(() => {
    if (!props.isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [props.isOpen, props.onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__button_type_close opacity"
          type="button"
          onClick={props.onClose}
        />
        <span className="popup__message">{props.apiSuccessMessage}</span>
      </div>
    </div>
  );
}
