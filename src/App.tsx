import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";
import { PrivateRoute } from "./components/PrivateRoute";
import "@mantine/core/styles.css";

export const App = () => (
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    <Route
      path="/home"
      element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/auth" replace />} />
  </Routes>
);
