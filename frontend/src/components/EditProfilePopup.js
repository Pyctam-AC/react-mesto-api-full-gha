import React from "react";
import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";
import InputForm from "./InputForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  closeOverlay,
  closeEsc
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    onUpdateUser(data);
  };

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = currentUser?.name;
    defaultValues.about = currentUser?.about;
    reset({ ...defaultValues });
  }, [currentUser, reset]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      closeOverlay={closeOverlay}
      closeEsc={closeEsc}
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isLoading={isLoading}
      isDirty={isDirty}
    >
      <InputForm
        type="text"
        {...register("name", {
          required: "Напишите ваше имя",
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
        placeholder="Введите имя и фамилию"
        errors={errors}
      />
      <InputForm
        type="text"
        {...register("about", {
          required: "Заполните это поле",
          minLength: {
            value: 2,
            message: "Минимум два символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум сорок символов",
          },
        })}
        name="about"
        errors={errors}
        placeholder="Введите вашу профессию"
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
