import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import styled from "@emotion/styled";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        <ContentArea>
          <h1>Settings</h1>

          {/* Shared content */}
          <Section>
            <h2>General Settings</h2>
            <p>Change your password, update your email, and configure basic preferences.</p>
            {/* Imagine form inputs here */}
          </Section>

          {/* Role-specific settings */}

          {user?.role === "superadmin" && (
            <Section>
              <h2>Superadmin Settings</h2>
              <p>Manage university-wide configurations, user roles, and system-wide preferences.</p>
              {/* Add forms or controls specific to superadmin */}
            </Section>
          )}

          {user?.role === "admin" && (
            <Section>
              <h2>Admin Settings</h2>
              <p>Manage department-specific settings, approve student registrations, and oversee courses.</p>
              {/* Admin specific controls */}
            </Section>
          )}

          {user?.role === "student" && (
            <Section>
              <h2>Student Settings</h2>
              <p>Manage your personal profile, notification preferences, and privacy settings.</p>
              {/* Student controls */}
            </Section>
          )}
        </ContentArea>
        <Footer />
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f5f6fa;

  h1 {
    margin-bottom: 20px;
    color: #2c3e50;
  }
`;

const Section = styled.section`
  background: white;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);

  h2 {
    margin-bottom: 12px;
    color: #2c3e50;
  }

  p {
    color: #555;
  }
`;
