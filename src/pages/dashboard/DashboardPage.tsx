import styled from "@emotion/styled";

import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";
// import Footer from "../../components/layouts/Footer";
import Announcements from "../../components/molecules/Announcements";

import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

import { useState, useEffect } from "react";
import { fetchStudentCourses } from "../../api/courseApi";

import DashboardSkeleton from "../../components/molecules/DashboardSkeleton";


const COLORS = ["#60a5fa", "#3b82f6", "#2563eb"];

const userRoleDistribution = [
  { name: "Superadmins", value: 5 },
  { name: "Admins", value: 20 },
  { name: "Students", value: 200 },
];

const studentDepartments = [
  { department: "Math", students: 40 },
  { department: "Physics", students: 25 },
  { department: "CS", students: 60 },
  { department: "Biology", students: 30 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<{ code: string; name: string; credits: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false); // new state

  useEffect(() => {
    if (!user) return; // guard until user is available

    if (user.role === "student") {
      fetchStudentCourses(user.id)
        .then((data: any) => setCourses(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // <-- important for admins & superadmins
    }
  }, [user]);

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
          // Show skeleton while data is loading
          <DashboardSkeleton />
        ) : (
          <>
            {/* Shared welcome message */}


          {/* Shared welcome message */}
          <WelcomeMessage>Welcome to Quick University, {user?.name}!</WelcomeMessage>
            <Announcements />
          {user?.role === "superadmin" && (
            <>
              <h3 style={{color: "#2c3e50" }}>User Roles Distribution</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={userRoleDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {userRoleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <h3 style={{color: "#2c3e50" }}>Students Per Department</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <BarChart data={studentDepartments}>
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

        {user?.role === "student" && (
        <>
            <h3 style={{color: "#2c3e50" }}>Courses Registered</h3>
            <CoursesContainer>
            <table>
                <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.code}  style={{color: "#2c3e50" }}>
                    <td  style={{color: "#2c3e50" }}>{course.code}</td>
                    <td  style={{color: "#2c3e50" }}>{course.name}</td>
                    <td  style={{color: "#2c3e50" }}>{course.credits}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </CoursesContainer>


              </>
            )}

        </>
        )}

        </ContentArea>
        {/* <Footer /> */}
      </MainContent>
    </Container>
  );
}

// Styled component for the welcome message
const WelcomeMessage = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #2c3e50;
`;

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
`;

const CoursesContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;

  h3 {
    margin-bottom: 12px;
    color: #2c3e50;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f5f6fa;
    color: #2c3e50;
  }
`;

