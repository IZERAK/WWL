import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { postData } from "../reqiest";

const Auth = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/register");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const login = event.target.login.value;
    const password = event.target.password.value;

    try {
      const response = await postData(process.env.REACT_APP_LOGIN, {
        login,
        password,
      });

      const { access_token, refresh_token, message } = response;
      setSuccessMessage(message || "Авторизация прошла успешно!");
      setSuccessVisible(true);

      // Сохраняем уведомление в localStorage
      localStorage.setItem(
        "successMessage",
        message || "Авторизация прошла успешно!"
      );
      localStorage.setItem("successVisible", true);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      navigate("/home");
    } catch (err) {
      const serverErrorMessage = err.response?.data?.error;
      setErrorMessage(serverErrorMessage || "Не удалось авторизоваться.");
      setErrorVisible(true);

      // Сохраняем уведомление об ошибке в localStorage
      localStorage.setItem(
        "errorMessage",
        serverErrorMessage || "Не удалось авторизоваться."
      );
      localStorage.setItem("errorVisible", true);
    }
  };

  return (
    <div className="auth-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title-text-form">Авторизация</div>
        <div className="label-input-group">
          <div className="label-input">
            <div className="title-text-input">Логин:</div>
            <Input name="login" />
          </div>
          <div className="label-input">
            <div className="title-text-input">Пароль:</div>
            <Input type="password" name="password" />
          </div>
        </div>
        <div className="button-group">
          <Button text="Войти" type="submit" style_b="main-b" />
          <Button
            text="Регистрация"
            style_b="secondary"
            onClick={handleLoginRedirect}
          />
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
