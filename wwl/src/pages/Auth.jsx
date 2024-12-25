import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { postData } from "../reqiest";
import "../style/auth.css";

const Auth = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const login = event.target.login.value;
    const password = event.target.password.value;

    try {
      const response = await postData(process.env.REACT_APP_LOGIN, {
        login,
        password,
      });

      const serverSuccessMessage = response?.data?.message;
      setSuccessMessage(serverSuccessMessage || "Авторизация прошла успешно!");
      setSuccessVisible(true); 
    } catch (err) {
      const serverErrorMessage = err.response?.data?.error;
      setErrorMessage(serverErrorMessage || "Не удалось авторизоваться.");
      setErrorVisible(true); 
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="title-text-form">Авторизация</div>
        <div className="auth-label-input-group">
          <div className="auth-label-input">
            <div className="title-text-input">Логин:</div>
            <Input name="login" />
          </div>
          <div className="auth-label-input">
            <div className="title-text-input">Пароль:</div>
            <Input type="password" name="password" />
          </div>
        </div>
        <div className="button-group">
          <Button text="Войти" type="submit" style_b="main-b" />
          <Button text="Регистрация" style_b="secondary" />
        </div>
      </form>

      <SuccessToast
        message={successMessage}
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
      />
      <ErrorToast
        message={errorMessage}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </div>
  );
};

export default Auth;
