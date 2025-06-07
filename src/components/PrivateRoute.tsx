import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLogged = !!localStorage.getItem("token");
  return isLogged ? children : <Navigate to="/auth" replace />;
}
