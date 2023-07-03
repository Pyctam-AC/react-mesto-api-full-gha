import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import InputForm from "./InputForm";
import { useForm } from "react-hook-form";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
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

  const onSubmit = (data) => {
    onAddPlace(data);
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        link: "",
      });
    }
  }, [isOpen, reset]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="place"
      title="Новое место"
      buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      closeOverlay={closeOverlay}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isDirty={true}
    >
      <InputForm
        type="text"
        {...register("name", {
          required: "Напишите название",
          minLength: {
            value: 2,
            message: "Минимум два символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум сорок символов",
          },
        })}
        name="name"
        placeholder="Название"
        errors={errors}
      />
      <InputForm
        type="url"
        {...register("link", {
          required: "Заполните это поле",
          pattern: {
            value: /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i,
            message: "Это не ссылка",
          },
        })}
        name="link"
        errors={errors}
        placeholder="Ссылка на картинку"
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
