import { React, useEffect } from "react";

export default function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_${name}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__button_close opacity"
          type="button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
