import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/Salla" replace />;
  }

  return <Outlet />;
}
