import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";
// import Footer from "../../components/layouts/Footer";
import CourseTable from "../../components/molecules//CourseTable";
import CourseForm from "../../components/molecules/CourseForm";
import styled from "@emotion/styled";

import CourseSkeleton from "../../components/molecules/CourseSkeleton";


// Mock API functions to fetch data for each role
import { fetchAllCourses, fetchAdminCourses, fetchStudentCourses } from "../../api/courseApi";

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    if (user.role === "superadmin") {
      fetchAllCourses().then(data => {
        setCourses(data);
        setLoading(false);
      });
    } else if (user.role === "admin") {
      fetchAdminCourses(user.id).then(data => {
        setCourses(data);
        setLoading(false);
      });
    } else if (user.role === "student") {
      fetchStudentCourses(user.id).then(data => {
        setCourses(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) return <p>Please login to view courses.</p>;

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Navbar />
        <ContentArea>
          <h1 style={{color: "#2c3e50" }}>Courses</h1>

          {loading ? (
            <CourseSkeleton rows={6} />
          ) : (
            <>
              {/* Show course management tools only to superadmins and admins */}
              {(user.role === "superadmin" || user.role === "admin") && (
                <>
                  <CourseForm />
                  <hr />
                </>
              )}

              {/* Display course list for all roles */}
              <CourseTable courses={courses} />

              {/* Extra student info */}
              {user.role === "student" && (
                <p style={{color: "#2c3e50" }}>You are currently enrolled in {courses.length} courses.</p>
              )}
            </>
          )}
        </ContentArea>
        {/* <Footer /> */}
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
  padding: 0px 20px 20px 20px;
  background-color: #f5f6fa;
`;
