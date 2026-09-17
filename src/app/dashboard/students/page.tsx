"use client";

import { useState } from "react";

interface Student {
  id: string;
  code: string;
  number: number;
  name: string;
  class: string;
  gender: "ชาย" | "หญิง";
}

const mockStudents: Student[] = [
  { id: "1", code: "67001", number: 1, name: "เด็กชายกิตติศักดิ์ มั่นคง", class: "ม.1/1", gender: "ชาย" },
  { id: "2", code: "67002", number: 2, name: "เด็กชายจิรภัทร ชัยชนะ", class: "ม.1/1", gender: "ชาย" },
  { id: "3", code: "67003", number: 3, name: "เด็กชายณัฐวุฒิ สุขสวัสดิ์", class: "ม.1/1", gender: "ชาย" },
  { id: "4", code: "67004", number: 4, name: "เด็กชายธนากร เกียรติคุณ", class: "ม.1/1", gender: "ชาย" },
  { id: "5", code: "67005", number: 5, name: "เด็กหญิงกัญญาณัฐ วงศ์ษา", class: "ม.1/1", gender: "หญิง" },
  { id: "6", code: "67006", number: 6, name: "เด็กหญิงชลธิชา บุญช่วย", class: "ม.1/1", gender: "หญิง" },
  { id: "7", code: "67007", number: 7, name: "เด็กหญิงธัญญารัตน์ รัตนผล", class: "ม.1/1", gender: "หญิง" },
  { id: "8", code: "67008", number: 8, name: "เด็กหญิงปนัดดา พลอยดี", class: "ม.1/1", gender: "หญิง" },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = students.filter(s =>
    s.name.includes(searchTerm) || s.code.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">จัดการข้อมูลนักเรียน</h1>
          <p className="text-sm text-gray-500 mt-1">รายชื่อนักเรียนทั้งหมด โรงเรียนบรรหารแจ่มใสวิทยา 3</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="ค้นหาชื่อ หรือ รหัส..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-50"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">เลขที่</th>
                <th className="px-6 py-3">รหัสนักเรียน</th>
                <th className="px-6 py-3">ชื่อ - นามสกุล</th>
                <th className="px-6 py-3">ระดับชั้น</th>
                <th className="px-6 py-3">เพศ</th>
                <th className="px-6 py-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/40 transition">
                  <td className="px-6 py-4 font-semibold">{s.number}</td>
                  <td className="px-6 py-4 text-gray-500">{s.code}</td>
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {s.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{s.gender}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-purple-700 hover:text-purple-900 font-medium text-xs">
                      แก้ไข
                    </button>
                    <button className="text-red-500 hover:text-red-700 font-medium text-xs">
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}