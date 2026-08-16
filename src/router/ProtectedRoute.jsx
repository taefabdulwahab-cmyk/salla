import React, { useContext } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(UserContext);
  const outletContext = useOutletContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={outletContext} />;
}
