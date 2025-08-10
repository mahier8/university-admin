// src/api/courseApi.ts

// Sample courses database
const allCourses = [
  { id: 1, code: "CS101", name: "Intro to Computer Science", credits: 3 },
  { id: 2, code: "MATH201", name: "Calculus II", credits: 4 },
  { id: 3, code: "PHYS150", name: "General Physics", credits: 3 },
  { id: 4, code: "ENG101", name: "English Literature", credits: 2 },
];

// Example admin courses (subset)
const adminCourses = [
  { id: 1, code: "CS101", name: "Intro to Computer Science", credits: 3 },
  { id: 3, code: "PHYS150", name: "General Physics", credits: 3 },
];

// Example student courses (subset)
const studentCourses = [
  { id: 1, code: "CS101", name: "Intro to Computer Science", credits: 3 },
  { id: 2, code: "MATH201", name: "Calculus II", credits: 4 },
];

// Simulate async calls with Promises and setTimeout

export function fetchAllCourses() {
  return new Promise<typeof allCourses>((resolve) => {
    setTimeout(() => resolve(allCourses), 500);
  });
}

export function fetchAdminCourses(adminId: number) {
  // Can use adminId to filter but here simplified
  return new Promise<typeof adminCourses>((resolve) => {
    setTimeout(() => resolve(adminCourses), 500);
  });
}

export function fetchStudentCourses(studentId: number) {
  // Can use studentId to filter but here simplified
  return new Promise<typeof studentCourses>((resolve) => {
    setTimeout(() => resolve(studentCourses), 500);
  });
}
