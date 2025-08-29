import { atom } from "jotai";

export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

// Load from localStorage initially
const storedCourses = localStorage.getItem("courses");
const initialCourses: Course[] = storedCourses ? JSON.parse(storedCourses) : [
  { id: 1, code: "CS101", name: "Intro to Computer Science", credits: 3 },
  { id: 2, code: "MATH201", name: "Calculus II", credits: 4 },
  { id: 3, code: "PHYS150", name: "General Physics", credits: 3 },
  { id: 4, code: "ENG101", name: "English Literature", credits: 2 },
];

export const coursesAtom = atom<Course[]>(initialCourses);

// derived atom for writing new courses
export const addCourseAtom = atom(
  null,
  (get, set, newCourse: Omit<Course, "id">) => {
    const current = get(coursesAtom);
    const newId = current.length ? Math.max(...current.map(c => c.id)) + 1 : 1;
    const updated = [...current, { id: newId, ...newCourse }];
    set(coursesAtom, updated);
    localStorage.setItem("courses", JSON.stringify(updated));
  }
);

export const removeCourseAtom = atom(
  null,
  (get, set, courseId: number) => {
    const current = get(coursesAtom);
    const updated = current.filter(c => c.id !== courseId);
    set(coursesAtom, updated);
    localStorage.setItem("courses", JSON.stringify(updated));
  }
);

