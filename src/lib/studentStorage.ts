export interface Student {
  id: string;
  code: string;
  number: number;
  name: string;
  grade: string; // ม.1 - ม.6
  room: string;  // 1 - 15 หรือ 1 - 10
  className: string; // ม.1/1
  gender: "ชาย" | "หญิง";
}

export const GRADES = [
  { grade: "ม.1", maxRooms: 15, level: "ม.ต้น" },
  { grade: "ม.2", maxRooms: 15, level: "ม.ต้น" },
  { grade: "ม.3", maxRooms: 15, level: "ม.ต้น" },
  { grade: "ม.4", maxRooms: 10, level: "ม.ปลาย" },
  { grade: "ม.5", maxRooms: 10, level: "ม.ปลาย" },
  { grade: "ม.6", maxRooms: 10, level: "ม.ปลาย" },
];

export const ALL_CLASSES: string[] = [];
GRADES.forEach(g => {
  for (let i = 1; i <= g.maxRooms; i++) {
    ALL_CLASSES.push(`${g.grade}/${i}`);
  }
});

const STORAGE_KEY = "bj3_students_data_v2";

export function getStoredStudents(): Student[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading localStorage", e);
    return [];
  }
}

export function saveStoredStudents(students: Student[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error("Error saving localStorage", e);
  }
}