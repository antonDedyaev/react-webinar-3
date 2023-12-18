import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children, authStatus }) {
  // Проверка, авторизован ли пользователь
  return authStatus ? children : <Navigate to="/login" />;
}

PrivateRoute.PropTypes = {
  children: PropTypes.node,
  authStatus: PropTypes.bool,
};

export default memo(PrivateRoute);
