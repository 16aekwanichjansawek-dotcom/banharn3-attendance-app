"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Student, ALL_CLASSES, getStoredStudents } from "@/lib/studentStorage";

interface AttendanceRecord {
  studentId: string;
  number: number;
  code: string;
  name: string;
  gender: "ชาย" | "หญิง";
  status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
}

export default function AttendancePage() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState("ม.1/1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = getStoredStudents();
    setAllStudents(loaded);
  }, []);

  // When class changes or allStudents change, set records
  useEffect(() => {
    const classStudents = allStudents
      .filter(s => s.className === selectedClass)
      .sort((a, b) => a.number - b.number);

    setRecords(
      classStudents.map(s => ({
        studentId: s.id,
        number: s.number,
        code: s.code,
        name: s.name,
        gender: s.gender,
        status: "PRESENT",
      }))
    );
    setSaved(false);
  }, [selectedClass, allStudents]);

  const setStatus = (studentId: string, status: AttendanceRecord["status"]) => {
    setRecords(prev =>
      prev.map(r => (r.studentId === studentId ? { ...r, status } : r))
    );
    setSaved(false);
  };

  const markAll = (status: AttendanceRecord["status"]) => {
    setRecords(prev => prev.map(r => ({ ...r, status })));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const counts = {
    present: records.filter(r => r.status === "PRESENT").length,
    absent: records.filter(r => r.status === "ABSENT").length,
    leave: records.filter(r => r.status === "LEAVE").length,
    late: records.filter(r => r.status === "LATE").length,
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
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-purple-900 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {ALL_CLASSES.map(cls => (
              <option key={cls} value={cls}>ห้อง {cls}</option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button
            onClick={handleSave}
            disabled={records.length === 0}
            className="bg-purple-900 text-yellow-300 font-bold px-6 py-2 rounded-xl shadow hover:bg-purple-800 transition ml-auto md:ml-0 disabled:opacity-50"
          >
            💾 บันทึกข้อมูล
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl flex items-center shadow-sm">
          ✅ บันทึกข้อมูลการเช็คชื่อของห้อง {selectedClass} ประจำวันที่ {date} เรียบร้อยแล้ว!
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-green-700">มาเรียน</div>
            <div className="text-2xl font-bold text-green-900">{counts.present}</div>
          </div>
          {records.length > 0 && (
            <button
              onClick={() => markAll("PRESENT")}
              className="text-xs bg-green-200 text-green-800 px-2.5 py-1 rounded-lg font-bold hover:bg-green-300 transition"
            >
              มาทุกคน
            </button>
          )}
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
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">รายชื่อนักเรียนห้อง {selectedClass}</span>
            <span className="text-xs bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full">
              {records.length} คน
            </span>
          </div>
          <Link
            href="/dashboard/students"
            className="text-xs text-purple-900 font-bold hover:underline"
          >
            + จัดการรายชื่อห้องนี้
          </Link>
        </div>

        {records.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">👨‍🎓</div>
            <h3 className="text-base font-bold text-gray-700">ยังไม่มีรายชื่อนักเรียนในห้อง {selectedClass}</h3>
            <p className="text-xs text-gray-400 mt-1">
              กรุณาไปที่เมนู &quot;จัดการข้อมูลนักเรียน&quot; เพื่อเพิ่มหรือนำเข้ารายชื่อนักเรียนของห้องนี้ก่อนครับ
            </p>
            <div className="mt-4">
              <Link
                href="/dashboard/students"
                className="px-5 py-2.5 bg-purple-900 text-yellow-300 font-bold rounded-xl text-xs shadow hover:bg-purple-800 transition inline-block"
              >
                ➕ ไปเพิ่มรายชื่อนักเรียนห้อง {selectedClass}
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 bg-gray-50/50">
                  <th className="px-6 py-3 w-16">เลขที่</th>
                  <th className="px-6 py-3 w-32">รหัส</th>
                  <th className="px-6 py-3">ชื่อ - นามสกุล</th>
                  <th className="px-6 py-3 w-20">เพศ</th>
                  <th className="px-6 py-3 text-center w-64">เลือกสถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {records.map(r => (
                  <tr key={r.studentId} className="hover:bg-purple-50/30 transition">
                    <td className="px-6 py-4 font-semibold text-gray-600">{r.number}</td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{r.code}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{r.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        r.gender === "ชาย" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                      }`}>
                        {r.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-1.5">
                        <button
                          onClick={() => setStatus(r.studentId, "PRESENT")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            r.status === "PRESENT"
                              ? "bg-green-600 text-white shadow"
                              : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                          }`}
                        >
                          ✓ มา
                        </button>

                        <button
                          onClick={() => setStatus(r.studentId, "LATE")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            r.status === "LATE"
                              ? "bg-yellow-500 text-white shadow"
                              : "bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-700"
                          }`}
                        >
                          สาย
                        </button>

                        <button
                          onClick={() => setStatus(r.studentId, "LEAVE")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            r.status === "LEAVE"
                              ? "bg-blue-600 text-white shadow"
                              : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
                          }`}
                        >
                          ลา
                        </button>

                        <button
                          onClick={() => setStatus(r.studentId, "ABSENT")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            r.status === "ABSENT"
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
        )}
      </div>
    </div>
  );
}