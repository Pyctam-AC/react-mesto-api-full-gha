import React from "react";

function ImagePopup({ isOpen, onClose, card, closeOverlay }) {

  return (
    <div className={`popup popup_img ${isOpen ? "popup_opened" : ""}`}
    onClick={closeOverlay}
    >
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__close-button popup__close-button_img"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <figcaption className="popup__figurcap">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
