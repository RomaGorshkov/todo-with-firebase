import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import ProtectedRoute from "./ProtectedRoute";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<div>Main Page</div>} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
