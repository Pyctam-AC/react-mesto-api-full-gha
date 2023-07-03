import React from "react";

function RegisterOkPopup(props) {

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
        <div className="popup__registr-icon popup__registr-icon_ok"
          onClick={props.onClose}
        />
        <h3 className="popup__container-title
            popup__container-title_sing">
              Вы успешно зарегистрировались!
        </h3>
      </div>
    </div>
  );
};

export default RegisterOkPopup;
