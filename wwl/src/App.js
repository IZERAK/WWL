import React from "react";
import AppRouter from "../src/components/AppRouter";
import "./style/App.css";
import { ReactComponent as Logo } from "./images/logo.svg";

function App() {
  return (
    <div className="app">
      <div className="header">
        <Logo className="logo" />
        <div className="name-header">WebWishList</div>
      </div>
      <div className="main">
        <AppRouter />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
