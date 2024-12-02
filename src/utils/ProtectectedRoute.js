import React from "react";
import { Navigate } from "react-router-dom";
import useAuthSync from "../hooks/useAuthSync";
import { useDispatch, useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const loading = useAuthSync();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
