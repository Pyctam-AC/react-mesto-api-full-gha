import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputForm from "./InputForm";
import Header from "./Header";

function Login({ authData, loggedIn }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    authData(data);
  };

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, [reset]);

  return (
    <>
      <Header
        loggedIn={loggedIn}
      />
      <form
        name="login"
        className={`form`}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="sing-title">Вход</h3>
        <InputForm
          type="text"
          {...register("email", {
            required: "Напишите ваш email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Напишите правильный адрес",
            },
          })}
          name="email"
          placeholder="Email"
          errors={errors}
          sing={true}
        />
        <InputForm
          type="password"
          {...register("password", {
            required: "Введите пароль"
          })}
          name="password"
          errors={errors}
          placeholder="Пароль"
          sing={true}
          autoComplete="on"
        />
        <button
          type="submit"
          className={`form-button form-button__white-theme`}
        >
          Войти
        </button>
      </form>
    </>
  );
};

export default Login;
