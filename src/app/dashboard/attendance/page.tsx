"use client";

import { useState } from "react";

interface StudentItem {
  id: string;
  code: string;
  name: string;
  number: number;
  status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
}

const initialStudents: StudentItem[] = [
  { id: "1", code: "67001", number: 1, name: "เด็กชายกิตติศักดิ์ มั่นคง", status: "PRESENT" },
  { id: "2", code: "67002", number: 2, name: "เด็กชายจิรภัทร ชัยชนะ", status: "PRESENT" },
  { id: "3", code: "67003", number: 3, name: "เด็กชายณัฐวุฒิ สุขสวัสดิ์", status: "ABSENT" },
  { id: "4", code: "67004", number: 4, name: "เด็กชายธนากร เกียรติคุณ", status: "PRESENT" },
  { id: "5", code: "67005", number: 5, name: "เด็กหญิงกัญญาณัฐ วงศ์ษา", status: "LATE" },
  { id: "6", code: "67006", number: 6, name: "เด็กหญิงชลธิชา บุญช่วย", status: "LEAVE" },
  { id: "7", code: "67007", number: 7, name: "เด็กหญิงธัญญารัตน์ รัตนผล", status: "PRESENT" },
  { id: "8", code: "67008", number: 8, name: "เด็กหญิงปนัดดา พลอยดี", status: "PRESENT" },
  { id: "9", code: "67009", number: 9, name: "เด็กหญิงพัชราภรณ์ เจริญยิ่ง", status: "PRESENT" },
  { id: "10", code: "67010", number: 10, name: "เด็กหญิงศศิธร ศรีสุข", status: "PRESENT" },
];

export default function AttendancePage() {
  const [students, setStudents] = useState<StudentItem[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState("ม.1/1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saved, setSaved] = useState(false);

  const setStatus = (id: string, status: StudentItem["status"]) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, status } : s))
    );
    setSaved(false);
  };

  const markAll = (status: StudentItem["status"]) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const counts = {
    present: students.filter(s => s.status === "PRESENT").length,
    absent: students.filter(s => s.status === "ABSENT").length,
    leave: students.filter(s => s.status === "LEAVE").length,
    late: students.filter(s => s.status === "LATE").length,
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">บันทึกการเช็คชื่อประจำวัน</h1>
          <p className="text-sm text-gray-500 mt-1">โรงเรียนบรรหารแจ่มใสวิทยา 3</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="ม.1/1">ห้อง ม.1/1</option>
            <option value="ม.1/2">ห้อง ม.1/2</option>
            <option value="ม.2/1">ห้อง ม.2/1</option>
            <option value="ม.3/1">ห้อง ม.3/1</option>
            <option value="ม.4/1">ห้อง ม.4/1</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button
            onClick={handleSave}
            className="bg-purple-900 text-yellow-300 font-bold px-6 py-2 rounded-xl shadow hover:bg-purple-800 transition ml-auto md:ml-0"
          >
            💾 บันทึกข้อมูล
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl flex items-center shadow-sm">
          ✅ บันทึกข้อมูลการเช็คชื่อของห้อง {selectedClass} วันที่ {date} เรียบร้อยแล้ว!
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-green-700">มาเรียน</div>
            <div className="text-2xl font-bold text-green-900">{counts.present}</div>
          </div>
          <button
            onClick={() => markAll("PRESENT")}
            className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded hover:bg-green-300"
          >
            มาทั้งหมด
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-yellow-700">มาสาย</div>
            <div className="text-2xl font-bold text-yellow-900">{counts.late}</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-blue-700">ลาป่วย/ลากิจ</div>
            <div className="text-2xl font-bold text-blue-900">{counts.leave}</div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-red-700">ขาดเรียน</div>
            <div className="text-2xl font-bold text-red-900">{counts.absent}</div>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="font-bold text-gray-700">รายชื่อนักเรียน ({students.length} คน)</span>
          <span className="text-xs text-gray-500">คลิกที่สถานะเพื่อเปลี่ยนทันที</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 bg-gray-50/50">
                <th className="px-6 py-3">เลขที่</th>
                <th className="px-6 py-3">รหัส</th>
                <th className="px-6 py-3">ชื่อ - สกุล</th>
                <th className="px-6 py-3 text-center">เลือกสถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-purple-50/30 transition">
                  <td className="px-6 py-4 font-semibold text-gray-600">{student.number}</td>
                  <td className="px-6 py-4 text-gray-500">{student.code}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => setStatus(student.id, "PRESENT")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          student.status === "PRESENT"
                            ? "bg-green-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                        }`}
                      >
                        ✓ มา
                      </button>

                      <button
                        onClick={() => setStatus(student.id, "LATE")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          student.status === "LATE"
                            ? "bg-yellow-500 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-700"
                        }`}
                      >
                        สาย
                      </button>

                      <button
                        onClick={() => setStatus(student.id, "LEAVE")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          student.status === "LEAVE"
                            ? "bg-blue-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                        }`}
                      >
                        ลา
                      </button>

                      <button
                        onClick={() => setStatus(student.id, "ABSENT")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          student.status === "ABSENT"
                            ? "bg-red-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700"
                        }`}
                      >
                        ✗ ขาด
                      </button>
                    </div>
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