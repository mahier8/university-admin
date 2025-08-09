import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./router/ProtectedRoute";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import { useAuth } from "./contexts/AuthContext";

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
                <RoleBasedDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const RoleBasedDashboard = () => {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === "superadmin") return <SuperAdminDashboard />;
  if (user.role === "admin") return <AdminDashboard />;
  return <StudentDashboard />;
};
