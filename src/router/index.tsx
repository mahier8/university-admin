import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import AppSkeleton from "../components/molecules/AppSkeleton";

// Lazy load pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const CoursesPage = lazy(() => import("../pages/courses/CoursesPage"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

export function AppRoutes() {
  return (
    <Suspense fallback={<AppSkeleton />}>      
      <Routes>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
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

        {/* Catch-all */}
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </Suspense>
  );
}
