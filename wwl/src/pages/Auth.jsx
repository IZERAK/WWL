import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import "../style/auth.css";

const Auth = () => {
  return (
    <div className="auth-page">
      <form className="auth-form">
        <div className="title-text-form">Авторизация</div>
        <div className="auth-label-input-group">
          <div className="auth-label-input">
            <div className="title-text-input">Логин:</div>
            <Input type="email" name="login"/>
          </div>
          <div className="auth-label-input">
            <div className="title-text-input">Пароль:</div>
            <Input type="password" name="password" />
          </div>
        </div>
        <div className="button-group">
          <Button text="Войти" type="sumbit" style_b="main-b" />
          <Button text="Регистрация" style_b="secondary" />
        </div>
      </form>
    </div>
  );
};

export default Auth;
