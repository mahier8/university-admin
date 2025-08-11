import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./router/ProtectedRoute";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CoursesPage from "./pages/courses/CoursesPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";

export default function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}
