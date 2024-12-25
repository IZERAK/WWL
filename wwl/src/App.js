import React from "react";
import AppRouter from "../src/components/AppRouter";
import "./style/App.css";

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <div className="main">
        <AppRouter />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
