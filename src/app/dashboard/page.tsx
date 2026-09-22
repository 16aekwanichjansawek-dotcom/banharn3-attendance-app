"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Student, GRADES, getStoredStudents } from "@/lib/studentStorage";

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);

  useEffect(() => {
    setStudents(getStoredStudents());
  }, []);

  const totalCount = students.length;
  const maleCount = students.filter(s => s.gender === "ชาย").length;
  const femaleCount = students.filter(s => s.gender === "หญิง").length;

  const juniorCount = students.filter(s => ["ม.1", "ม.2", "ม.3"].includes(s.grade)).length;
  const seniorCount = students.filter(s => ["ม.4", "ม.5", "ม.6"].includes(s.grade)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ภาพรวมการมาเรียน</h1>
          <p className="text-sm text-gray-500 mt-1">โรงเรียนบรรหารแจ่มใสวิทยา 3 ประจำปีการศึกษาปัจจุบัน</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/students"
            className="px-4 py-2.5 bg-purple-900 text-yellow-300 font-bold rounded-xl shadow hover:bg-purple-800 transition text-sm flex items-center gap-2"
          >
            👥 เพิ่ม / จัดการรายชื่อนักเรียน
          </Link>
          <Link
            href="/dashboard/attendance"
            className="px-4 py-2.5 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow hover:bg-yellow-300 transition text-sm flex items-center gap-2"
          >
            📝 เช็คชื่อวันนี้
          </Link>
        </div>
      </div>

      {/* Main KPI Stats (เริ่มต้นเป็น 0 หากยังไม่มีการเพิ่ม) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-purple-800 flex flex-col justify-between">
          <div className="text-xs font-semibold text-gray-500 uppercase">นักเรียนทั้งหมด</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-gray-900">{totalCount}</span>
            <span className="text-xs text-gray-500">คน</span>
          </div>
          <div className="text-[11px] text-purple-800 mt-2 font-medium">
            ชาย {maleCount} คน | หญิง {femaleCount} คน
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-indigo-600 flex flex-col justify-between">
          <div className="text-xs font-semibold text-gray-500 uppercase">ระดับมัธยมต้น (ม.1 - ม.3)</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-indigo-700">{juniorCount}</span>
            <span className="text-xs text-gray-500">คน</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            ม.1 ถึง ม.3 (ชั้นละ 15 ห้อง รวม 45 ห้อง)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-pink-600 flex flex-col justify-between">
          <div className="text-xs font-semibold text-gray-500 uppercase">ระดับมัธยมปลาย (ม.4 - ม.6)</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-pink-700">{seniorCount}</span>
            <span className="text-xs text-gray-500">คน</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2">
            ม.4 ถึง ม.6 (ชั้นละ 11 ห้อง รวม 33 ห้อง)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-green-600 flex flex-col justify-between">
          <div className="text-xs font-semibold text-gray-500 uppercase">สถานะการเช็คชื่อวันนี้</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-green-600">
              {totalCount > 0 ? "พร้อมใช้งาน" : "รอข้อมูล"}
            </span>
          </div>
          <div className="text-[11px] text-green-700 mt-2 font-medium">
            ระบบอัปเดตแบบเรียลไทม์
          </div>
        </div>
      </div>

      {/* แจกแจงรายชั้น และคลิกเข้าไปดูรายห้อง */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-800">จำนวนนักเรียนแยกตามระดับชั้น</h2>
            <p className="text-xs text-gray-500">คลิกที่แต่ละชั้นเพื่อดูจำนวนนักเรียนแยกรายห้อง</p>
          </div>
          <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            รวมทั้งโรงเรียน 78 ห้อง
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GRADES.map(g => {
            const countInGrade = students.filter(s => s.grade === g.grade).length;
            const isExpanded = expandedGrade === g.grade;

            return (
              <div
                key={g.grade}
                className={`border rounded-2xl p-4 transition ${
                  isExpanded ? "border-purple-600 bg-purple-50/20 shadow-sm" : "border-gray-200 hover:border-purple-300 bg-white"
                }`}
              >
                <div
                  onClick={() => setExpandedGrade(isExpanded ? null : g.grade)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-900 text-yellow-300 font-bold flex items-center justify-center text-sm">
                      {g.grade}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-base">{g.grade} ({g.level})</div>
                      <div className="text-xs text-gray-400">มีทั้งหมด {g.maxRooms} ห้องเรียน</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-purple-900">{countInGrade}</div>
                    <div className="text-[11px] text-gray-500">คน {isExpanded ? "▲ ย่อ" : "▼ ดูห้อง"}</div>
                  </div>
                </div>

                {/* รายละเอียดรายห้องเมื่อคลิกขยาย */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-purple-100">
                    <div className="text-xs font-semibold text-gray-600 mb-2">รายชื่อห้องเรียนในชั้น {g.grade}:</div>
                    <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {Array.from({ length: g.maxRooms }, (_, i) => i + 1).map(r => {
                        const cls = `${g.grade}/${r}`;
                        const inRoom = students.filter(s => s.className === cls).length;
                        return (
                          <Link
                            key={r}
                            href={`/dashboard/students`}
                            className="p-1.5 rounded-lg border text-center text-xs hover:bg-purple-100 hover:border-purple-400 transition"
                          >
                            <div className="font-bold text-gray-700">/{r}</div>
                            <div className={`text-[10px] font-semibold ${inRoom > 0 ? "text-purple-900" : "text-gray-400"}`}>
                              {inRoom} คน
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}