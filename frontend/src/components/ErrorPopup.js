import React from "react";

function ErrorPopup(props) {

  return (
    <div
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.closeOverlay}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div className="popup__registr-icon popup__registr-icon_er"
          onClick={props.onClose}
        />
        <h3 className="popup__container-title
            popup__container-title_sing">
              Что-то пошло не так! Попробуйте ещё раз.
        </h3>
      </div>
    </div>
  );
};

export default ErrorPopup;



