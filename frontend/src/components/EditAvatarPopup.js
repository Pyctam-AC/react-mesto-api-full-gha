import React from "react";
import PopupWithForm from "./PopupWithForm";
import InputForm from "./InputForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  closeOverlay,
}) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        avatar: "",
      });
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    onUpdateAvatar(data);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      closeOverlay={closeOverlay}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isDirty={true}
    >
      <InputForm
        type="url"
        {...register("avatar", {
          required: "Напишите ссылку на картинку",
          pattern: {
            value: /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i,
            message: "Это не ссылка",
          },
        })}
        name="avatar"
        placeholder="Ссылка на картинку"
        errors={errors}
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
