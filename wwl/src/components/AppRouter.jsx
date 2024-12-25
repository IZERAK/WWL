import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  </Router>
);

export default AppRouter;
