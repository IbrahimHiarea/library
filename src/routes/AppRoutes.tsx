import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// *@ Pages
// * Auth Pages
const SigninPage = lazy(() => import("@pages/auth/SigninPage"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SigninPage />
            </PublicRoute>
          }
        />

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
        {/* // TODO  */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
