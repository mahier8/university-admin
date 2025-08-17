import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import styled from "@emotion/styled";

// skeleton
import ProfileSkeleton from "../../components/molecules/ProfileSkeleton"; 


// Example mock users (replace with API later)
const mockUsers = [
  { id: 1, name: "Alice Superadmin", email: "alice@uni.com", role: "superadmin" },
  { id: 2, name: "Bob Admin", email: "bob@uni.com", role: "admin" },
  { id: 3, name: "Charlie Student", email: "charlie@uni.com", role: "student" },
  { id: 4, name: "Diana Student", email: "diana@uni.com", role: "student" },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(user?.id);
  const [loading, setLoading] = useState(false);

  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false); // new state

  // Filter selectable users based on role
  const getSelectableUsers = () => {
    if (user?.role === "superadmin") {
      return mockUsers;
    }
    if (user?.role === "admin") {
      return mockUsers.filter((u) => u.role === "student");
    }
    return [];
  };
  const selectableUsers = getSelectableUsers();

  // Determine which profile to show
  const selectedUser =
    mockUsers.find((u) => u.id === selectedUserId) || user;

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));
  };

  // sidebar
  const handleHamburgerClick = () => {
    setSidebarOpen((prev) => !prev);
  }

  return (
    <Container>
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
      <MainContent>
        <Navbar onHamburgerClick={handleHamburgerClick} />
        <ContentArea>


          {loading ? (
            <ProfileSkeleton />
          ) : (
            <>


                  <h1>My Profile</h1>

                  {/* Role-based profile switcher */}
                  {(user?.role === "superadmin" || user?.role === "admin") && (
                    <UserSelectContainer>
                      <label>
                        Select User:{" "}
                        <select value={selectedUserId} onChange={handleUserChange}>
                          <option value={user?.id}>My Profile</option>
                          {selectableUsers.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.name} ({u.role})
                            </option>
                          ))}
                        </select>
                      </label>
                    </UserSelectContainer>
                  )}

                  {/* Profile Info */}
                  <ProfileCard>
                    <p><strong>Name:</strong> {selectedUser?.name}</p>
                    <p><strong>Email:</strong> {selectedUser?.email}</p>
                    <p><strong>Role:</strong> {selectedUser?.role}</p>
                  </ProfileCard>

                  {/* Shared message */}
                  <Section>
                    <h3>General Information</h3>
                    <p style={{ color: "#2c3e50" }}>
                      Welcome to your profile! This section contains your basic account details.
                    </p>
                  </Section>

                  {/* Role-based sections */}
                  {selectedUser?.role === "superadmin" && (
                    <Section>
                      <h3>Superadmin Tools</h3>
                      <ul>
                        <li>Manage system-wide settings</li>
                        <li>View platform usage statistics</li>
                        <li>Manage all user accounts</li>
                      </ul>
                    </Section>
                  )}

                  {selectedUser?.role === "admin" && (
                    <Section>
                      <h3>Admin Tools</h3>
                      <ul>
                        <li>Manage courses and content</li>
                        <li>View and approve student enrollments</li>
                        <li>Communicate with instructors</li>
                      </ul>
                    </Section>
                  )}

                  {selectedUser?.role === "student" && (
                    <Section>
                      <h3>Student Info</h3>
                      <ul>
                        <li>View enrolled courses</li>
                        <li>Track your grades</li>
                        <li>Update your personal details</li>
                      </ul>
                    </Section>
                  )}


              
            </>
        )}

        </ContentArea>
        <Footer />
      </MainContent>
    </Container>
  );
}

// ====== Styles ======

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

const UserSelectContainer = styled.div`
  margin-bottom: 15px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  select {
    margin-left: 8px;
    padding: 4px;
  }
`;

const ProfileCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  p {
    margin: 8px 0;
    color: #2c3e50;
  }
`;

const Section = styled.div`
  background: white;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 10px;
    color: #2c3e50;
  }

  ul {
    padding-left: 20px;
    list-style: disc;
  }

  li {
    margin-bottom: 6px;
    color: #2c3e50;
  }
`;
