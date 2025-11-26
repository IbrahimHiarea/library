import { useAuth } from "@providers/AuthProvider";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export const PublicRoute = ({
  children,
  redirectPath = "/home",
}: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
