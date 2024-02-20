import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth({ allowedRole }) {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.role === allowedRole ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
}
