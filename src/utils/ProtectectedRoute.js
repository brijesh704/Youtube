import React from "react";
import { Navigate } from "react-router-dom";
import useAuthSync from "../hooks/useAuthSync";
import { useDispatch, useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
