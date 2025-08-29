import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/layouts/Sidebar";
import Navbar from "../../components/layouts/Navbar";
import CourseTable from "../../components/molecules/CourseTable";
import CourseForm from "../../components/molecules/CourseForm";
import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { coursesAtom } from "../../components/atoms/courseAtoms";
import { useToast } from "../../contexts/ToastContext";

export default function CoursesPage() {
  const { user } = useAuth();
  const courses = useAtomValue(coursesAtom); // ✅ get reactive courses from jotai
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { showToast } = useToast();
  
  // Ref to scroll the table into view
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  if (!user) return <p>Please login to view courses.</p>;

  const handleHamburgerClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Called after CourseForm adds a new course via Jotai
  const handleCourseAdded = () => {
    showToast("✅ Course added!");

    setTimeout(() => {
      const container = tableContainerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50); // 50ms is enough for React to render new row
  };



  return (
    <Container>
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
      <MainContent>
        <Navbar onHamburgerClick={handleHamburgerClick} />
        <ContentArea>
          <CourseHeader>Courses</CourseHeader>

          {(user.role === "superadmin" || user.role === "admin") && (
            <>
              <CourseForm onCourseAdded={handleCourseAdded} />
              <hr />
            </>
          )}
          {/* Table wrapper with scroll ref */}
          <TableWrapper ref={tableContainerRef}>
            <CourseTable courses={courses} />
          </TableWrapper>


          {user.role === "student" && (
            <p style={{ color: "#2c3e50" }}>
              You are currently enrolled in {courses.length} courses.
            </p>
          )}
        </ContentArea>
      </MainContent>
    </Container>
  );
}

const TableWrapper = styled.div`
  max-height: 300px;  /* your scroll height */
  overflow-y: auto;
  margin-top: 20px;
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

const CourseHeader = styled.h1`
  color: #2c3e50;
  // margin-top: 20px;
  // margin-bottom: 20px;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 20px 20px 20px 20px;
  background-color: #f5f6fa;
`;
