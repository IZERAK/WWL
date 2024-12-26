import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Reg from "../pages/Reg";
import Main from "../pages/Main"

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<Reg />} />
      <Route path="/home" element={<Main />} />
    </Routes>
  </Router>
);

export default AppRouter;
