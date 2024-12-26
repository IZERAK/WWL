import React, { useState } from "react";
import { ReactComponent as HomeImg } from "../images/home.svg";
import { ReactComponent as GiftImg } from "../images/gift.svg";
import { ReactComponent as FriendImg } from "../images/friend.svg";
import { ReactComponent as GroupImg } from "../images/group.svg";
import { ReactComponent as EventsImg } from "../images/calendar.svg";
import Gift from "./Gift";
import Home from "./Home";
import "../style/main.css";

const Main = () => {
  const [activeMenu, setActiveMenu] = useState("Главная");

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  // Функция для рендеринга контента в зависимости от активного пункта меню
  const renderContent = () => {
    switch (activeMenu) {
      case "Главная":
        return <Home />;
      case "Подарки":
        return <Gift />;
      case "Друзья":
        return <Gift />;
      case "Группы":
        return <Gift />;
      case "События":
        return <Gift />;
      default:
        <div></div>;
    }
  };

  return (
    <div className="main-page">
      <div className="menu">
        <div
          className={`point-menu ${activeMenu === "Главная" ? "active" : ""}`}
          onClick={() => handleMenuClick("Главная")}
        >
          Главная
          <HomeImg className="img-point-menu" />
        </div>
        <div
          className={`point-menu ${activeMenu === "Подарки" ? "active" : ""}`}
          onClick={() => handleMenuClick("Подарки")}
        >
          Подарки
          <GiftImg className="img-point-menu" />
        </div>
        <div
          className={`point-menu ${activeMenu === "Друзья" ? "active" : ""}`}
          onClick={() => handleMenuClick("Друзья")}
        >
          Друзья
          <FriendImg className="img-point-menu" />
        </div>
        <div
          className={`point-menu ${activeMenu === "Группы" ? "active" : ""}`}
          onClick={() => handleMenuClick("Группы")}
        >
          Группы
          <GroupImg className="img-point-menu" />
        </div>
        <div
          className={`point-menu ${activeMenu === "События" ? "active" : ""}`}
          onClick={() => handleMenuClick("События")}
        >
          События
          <EventsImg className="img-point-menu" />
        </div>
      </div>
      <div className="content">
        {renderContent()} {/* Условный рендеринг контента */}
      </div>
    </div>
  );
};

export default Main;
