import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({
  isOpen,
  onClose,
  onDeleteCard,
  card,
  isLoading,
  closeOverlay,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard(card);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar"
      title="Вы уверены?"
      buttonTitle={isLoading ? "Удаление..." : "Да"}
      onClose={onClose}
      closeOverlay={closeOverlay}
      onSubmit={handleSubmit}
      isValid={true}
      isDirty={true}
    />
  );
};

export default DeleteCardPopup;
