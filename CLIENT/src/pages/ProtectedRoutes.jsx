import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isLoggedIn, authLoading } = useAuthContext();
  if (authLoading) return;
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
