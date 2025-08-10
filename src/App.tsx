import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./router/ProtectedRoute";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CoursesPage from "./pages/courses/CoursesPage";

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
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
