import { React, useEffect } from "react";

export default function MessagePopup(props) {
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
      className={`message-popup ${props.isOpen ? "message-popup_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="message-popup__container">
        <button
          className="message-popup__button-close opacity"
          type="button"
          onClick={props.onClose}
        />
        <span className="message-popup__message">
          {props.apiSuccessMessage}
        </span>
      </div>
    </div>
  );
}
