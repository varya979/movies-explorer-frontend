import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: children, ...props }) => {
  return props.isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
