import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import Input from "../components/Input";
import Button from "../components/Button";
import Switch from "../components/Switch";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { postData } from "../reqiest";
import "../style/reg.css";

const Reg = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [gender, setGender] = useState("м");
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/");
  };
  const handleGenderChange = (value) => {
    setGender(value === 1 ? "ж" : "м");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const surname = event.target.surname.value.trim();
    const patronymic = event.target.patronymic.value.trim();
    const login = event.target.login.value.trim();
    const birth_date = event.target.birth_date.value;
    const email = event.target.email.value.trim();
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают.");
      setErrorVisible(true);
      return;
    }

    try {
      const response = await postData(process.env.REACT_APP_REGISTER, {
        name,
        surname,
        patronymic,
        login,
        birth_date,
        gender, // Передаем gender в запрос как "1" или "0"
        email,
        password,
      });

      const { message } = response;
      setSuccessMessage(message || "Пользователь создан");
      setSuccessVisible(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error;
      setErrorMessage(errorMsg || "Не удалось создать пользователя.");
      setErrorVisible(true);
    }
  };

  return (
    <div className="reg-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title-text-form">Регистрация</div>
        <div className="reg-form">
          <div className="label-input-group">
            <div className="label-input">
              <div className="title-text-input">Почта:</div>
              <Input type="email" name="email" />
            </div>
            <div className="label-input">
              <div className="title-text-input">Логин:</div>
              <Input name="login" />
            </div>
            <div className="label-input">
              <div className="title-text-input">Пароль:</div>
              <Input type="password" name="password" />
            </div>
            <div className="label-input">
              <div className="title-text-input">Повторите пароль:</div>
              <Input type="password" name="confirmPassword" />
            </div>
          </div>
          <div className="label-input-group">
            <div className="label-input">
              <div className="title-text-input">Имя:</div>
              <Input name="name" />
            </div>
            <div className="label-input">
              <div className="title-text-input">Фамилия:</div>
              <Input name="surname" />
            </div>
            <div className="label-input">
              <div className="title-text-input">Отчество:</div>
              <Input name="patronymic" />
            </div>
            <div className="last-row-reg-form">
              <div className="label-input">
                <div className="title-text-input">Дата рождения:</div>
                <Input name="birth_date" type="date" />
                <div className="reg-switch">
                  <div className="title-text-input">М</div>
                  <Switch name="gender" onToggle={handleGenderChange} />
                  <div className="title-text-input">Ж</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-group">
          <Button text="Создать аккаунт" type="submit" style_b="main-b" />
          <Button text="Авторизация" style_b="secondary"  onClick={handleLoginRedirect}/>
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

export default Reg;
