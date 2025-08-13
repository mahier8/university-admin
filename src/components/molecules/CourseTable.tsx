import React from "react";
import styled from "@emotion/styled";

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

interface CourseTableProps {
  courses: Course[];
}

export default function CourseTable({ courses }: CourseTableProps) {
  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={3}>No courses found.</td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id}>
                <td style={{color: "#2c3e50" }}>{course.code}</td>
                <td style={{color: "#2c3e50" }}>{course.name}</td>
                <td style={{color: "#2c3e50" }}>{course.credits}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 20px;

  max-height: 200px;       /* Limit the height */
  overflow-y: auto;        /* Scroll vertically if needed */

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
