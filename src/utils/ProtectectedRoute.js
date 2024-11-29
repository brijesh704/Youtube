import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  console.log(user, "user");
  // if (!user?.email) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default ProtectedRoute;
