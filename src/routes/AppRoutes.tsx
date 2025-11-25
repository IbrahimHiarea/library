import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<>Login</>} />
      <Route path="/signUp" element={<>signUp</>} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>Home</>
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};
