import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

type ProtectedRouteProps = {
  unlocked: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({ unlocked, children }: ProtectedRouteProps) => {
  if (!unlocked) {
    return <Navigate to="/" replace />;
  }

  return children;
};
