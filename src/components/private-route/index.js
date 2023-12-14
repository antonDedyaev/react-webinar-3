import React, { memo } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const authorizedUser = !!localStorage.getItem("currentUser");
  // Проверка, авторизован ли пользователь
  return authorizedUser ? children : <Navigate to="/login" />;
}

export default memo(PrivateRoute);
