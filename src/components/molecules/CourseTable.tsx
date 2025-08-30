import React from "react";
import styled from "@emotion/styled";

// jotai
import { useSetAtom } from "jotai";
import { removeCourseAtom } from "../atoms/courseAtoms";

// context
import { useAuth } from "../../contexts/AuthContext";

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
  const removeCourse = useSetAtom(removeCourseAtom);
  
  // uget the users
  const { user } = useAuth();

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th></th>
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
                
                          {user?.role === "superadmin" && (

                <td>
                  <DeleteButton onClick={() => removeCourse(course.id)}>
                    Delete
                  </DeleteButton>
                </td>

          )}

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

  // max-height: 200px;       /* Limit the height */
  // overflow-y: auto;        /* Scroll vertically if needed */

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

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #b91c1c;
  }
`;
