import React from "react";

function PopupWithForm(props) {

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
        <h3 className="popup__container-title">{props.title}</h3>
        <form
          name={props.name}
          className={`form form_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`form-button ${
              !props.isValid || !props.isDirty ? "form-button_disabled" : ""
            }`}
            disabled={!props.isValid || !props.isDirty}
          >
            {props.buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
