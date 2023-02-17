import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Cargando página</h1>;

  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
}
