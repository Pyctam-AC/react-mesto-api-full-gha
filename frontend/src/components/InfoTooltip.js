import React from "react";

function InfoTooltip(props) {

  return (
    <div
      className={`popup popup_${props.name} ${
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
        <div className={`popup__registr-icon ${
            props.loggedIn ?
              "popup__registr-icon_ok" :
              "popup__registr-icon_er"
          }`}
        />

        <h3 className="popup__container-title
            popup__container-title_sing">{
              props.loggedIn ?
              "Вы успешно зарегистрировались!" :
              "Что-то пошло не так! Попробуйте ещё раз."
            }

        </h3>

      </div>
    </div>
  );
};

export default InfoTooltip;
