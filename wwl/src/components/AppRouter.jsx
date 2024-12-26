import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Reg from "../pages/Reg";
import Main from "../pages/Main";

// Функция для проверки токенов
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  // Если токен не существует, перенаправляем на страницу авторизации
  if (!token) {
    return <Navigate to="/" />;
  }

  return children; // Если токен есть, показываем содержимое
};

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Auth />} /> {/* Страница логина */}
      <Route path="/register" element={<Reg />} /> {/* Страница регистрации */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main /> {/* Страница основного контента, доступная только с токеном */}
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
