import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Lazy load pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const CoursesPage = lazy(() => import("../pages/courses/CoursesPage"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "student"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "student"]}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "student"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "student"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </Suspense>
  );
}
