"use client";

import { useState, useEffect } from "react";
import { Student, GRADES, getStoredStudents, saveStoredStudents } from "@/lib/studentStorage";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("ม.1");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  
  // Single Student Form
  const [newNumber, setNewNumber] = useState(1);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState<"ชาย" | "หญิง">("ชาย");

  useEffect(() => {
    setStudents(getStoredStudents());
  }, []);

  const currentGradeConfig = GRADES.find(g => g.grade === selectedGrade) || GRADES[0];
  const currentClassName = `${selectedGrade}/${selectedRoom}`;

  // Filter students for current class
  const classStudents = students
    .filter(s => s.className === currentClassName)
    .filter(s => s.name.includes(searchTerm) || s.code.includes(searchTerm))
    .sort((a, b) => a.number - b.number);

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const newStudent: Student = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      number: Number(newNumber),
      code: newCode.trim(),
      name: newName.trim(),
      grade: selectedGrade,
      room: selectedRoom.toString(),
      className: currentClassName,
      gender: newGender,
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    saveStoredStudents(updated);

    // Reset Form
    setNewNumber(classStudents.length + 2);
    setNewCode("");
    setNewName("");
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายชื่อนักเรียนคนนี้?")) return;
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    saveStoredStudents(updated);
  };

  const handleClearClass = () => {
    if (!confirm(`คุณต้องการลบนักเรียนทั้งหมดในห้อง ${currentClassName} ใช่หรือไม่?`)) return;
    const updated = students.filter(s => s.className !== currentClassName);
    setStudents(updated);
    saveStoredStudents(updated);
  };

  // Import from Text / CSV File
  const handleImport = () => {
    if (!importText.trim()) return;
    const lines = importText.split("\n").map(l => l.trim()).filter(Boolean);
    const addedList: Student[] = [];

    lines.forEach((line, index) => {
      // Format expected: เลขที่, รหัส, ชื่อ-สกุล, เพศ (หรือคั่นด้วย comma/tab/space)
      const parts = line.split(/[,\t]+/).map(p => p.trim());
      let num = index + 1;
      let code = "";
      let name = "";
      let gender: "ชาย" | "หญิง" = "ชาย";

      if (parts.length >= 3) {
        num = parseInt(parts[0]) || index + 1;
        code = parts[1];
        name = parts[2];
        if (parts[3] && (parts[3].includes("หญิง") || parts[3].toLowerCase() === "f")) {
          gender = "หญิง";
        }
      } else if (parts.length === 2) {
        code = parts[0];
        name = parts[1];
      } else {
        name = parts[0];
        code = (67000 + index + 1).toString();
      }

      if (name.includes("เด็กหญิง") || name.includes("นางสาว") || name.includes("น.ส.")) {
        gender = "หญิง";
      }

      addedList.push({
        id: Date.now().toString() + index + Math.random().toString(36).substr(2, 4),
        number: num,
        code: code || (67000 + num).toString(),
        name,
        grade: selectedGrade,
        room: selectedRoom.toString(),
        className: currentClassName,
        gender,
      });
    });

    const updated = [...students, ...addedList];
    setStudents(updated);
    saveStoredStudents(updated);
    setImportText("");
    setShowImportModal(false);
    alert(`นำเข้ารายชื่อนักเรียนเข้าห้อง ${currentClassName} เรียบร้อยแล้ว ${addedList.length} คน!`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportText(content);
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">จัดการข้อมูลนักเรียน</h1>
          <p className="text-sm text-gray-500 mt-1">
            แบ่งตามระดับชั้นและห้องเรียน (ม.ต้น 1-15 ห้อง | ม.ปลาย 1-11 ห้อง)
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              setNewNumber(classStudents.length + 1);
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 bg-purple-900 text-yellow-300 font-bold rounded-xl shadow hover:bg-purple-800 transition text-sm flex items-center gap-1.5"
          >
            ➕ เพิ่มนักเรียน
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2.5 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow hover:bg-yellow-300 transition text-sm flex items-center gap-1.5"
          >
            📂 นำเข้าจากไฟล์ (CSV/Excel)
          </button>
        </div>
      </div>

      {/* Grade Selector (ระดับชั้น) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          1. เลือกระดับชั้น (ม.1 - ม.6)
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {GRADES.map(g => {
            const countInGrade = students.filter(s => s.grade === g.grade).length;
            const isSelected = selectedGrade === g.grade;
            return (
              <button
                key={g.grade}
                onClick={() => {
                  setSelectedGrade(g.grade);
                  setSelectedRoom(1);
                }}
                className={`py-3 px-2 rounded-xl text-center font-bold transition flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-purple-900 text-yellow-300 shadow-md ring-2 ring-purple-600"
                    : "bg-gray-50 text-gray-700 hover:bg-purple-50"
                }`}
              >
                <span className="text-base">{g.grade}</span>
                <span className={`text-xs mt-0.5 ${isSelected ? "text-yellow-200" : "text-gray-400"}`}>
                  {g.level} ({countInGrade} คน)
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Room Selector (ห้องเรียนในชั้น) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            2. เลือกห้องเรียนของชั้น {selectedGrade} ({currentGradeConfig.level}: มีทั้งหมด {currentGradeConfig.maxRooms} ห้อง)
          </div>
          <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
            กำลังดูห้อง {currentClassName}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: currentGradeConfig.maxRooms }, (_, i) => i + 1).map(r => {
            const cls = `${selectedGrade}/${r}`;
            const countInRoom = students.filter(s => s.className === cls).length;
            const isSelected = selectedRoom === r;
            return (
              <button
                key={r}
                onClick={() => setSelectedRoom(r)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-yellow-400 text-purple-950 shadow-sm ring-2 ring-yellow-500"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>ห้อง {r}</span>
                {countInRoom > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-purple-900 text-white" : "bg-purple-200 text-purple-900 font-semibold"
                  }`}>
                    {countInRoom}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Class Students Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-base">
              รายชื่อนักเรียนห้อง {currentClassName}
            </span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
              {classStudents.length} คน
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="ค้นหาชื่อหรือรหัส..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 w-full sm:w-48"
            />
            {classStudents.length > 0 && (
              <button
                onClick={handleClearClass}
                className="text-xs text-red-600 hover:text-red-800 hover:underline whitespace-nowrap"
              >
                ล้างทั้งห้อง
              </button>
            )}
          </div>
        </div>

        {classStudents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-base font-bold text-gray-700">ยังไม่มีรายชื่อนักเรียนในห้อง {currentClassName}</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              คุณสามารถกดปุ่ม &quot;+ เพิ่มนักเรียน&quot; หรือ &quot;📂 นำเข้าจากไฟล์&quot; เพื่อใส่รายชื่อนักเรียนของห้องนี้ได้เลยครับ
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  setNewNumber(1);
                  setShowAddModal(true);
                }}
                className="px-4 py-2 bg-purple-900 text-yellow-300 font-bold rounded-xl text-xs shadow hover:bg-purple-800"
              >
                ➕ เพิ่มนักเรียนคนแรก
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="px-4 py-2 bg-yellow-400 text-purple-900 font-bold rounded-xl text-xs shadow hover:bg-yellow-300"
              >
                📂 นำเข้าไฟล์
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 w-16">เลขที่</th>
                  <th className="px-6 py-3 w-32">รหัสนักเรียน</th>
                  <th className="px-6 py-3">ชื่อ - นามสกุล</th>
                  <th className="px-6 py-3 w-28">เพศ</th>
                  <th className="px-6 py-3 w-24 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {classStudents.map(student => (
                  <tr key={student.id} className="hover:bg-purple-50/30 transition">
                    <td className="px-6 py-3.5 font-bold text-gray-900">{student.number}</td>
                    <td className="px-6 py-3.5 font-mono text-gray-500 text-xs">{student.code}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        student.gender === "ชาย" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                      }`}>
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 rounded hover:bg-red-50 transition"
                      >
                        🗑️ ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: เพิ่มนักเรียนทีละคน */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-gray-800">เพิ่มนักเรียนเข้าห้อง {currentClassName}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleAddSingle} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">เลขที่</label>
                  <input
                    type="number"
                    min="1"
                    value={newNumber}
                    onChange={e => setNewNumber(Number(e.target.value))}
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">รหัสนักเรียน</label>
                  <input
                    type="text"
                    placeholder="เช่น 67001"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">ชื่อ - นามสกุล (พร้อมคำนำหน้า)</label>
                <input
                  type="text"
                  placeholder="เช่น เด็กชายสมศักดิ์ รักเรียน"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">ระบุเพศ</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={newGender === "ชาย"}
                      onChange={() => setNewGender("ชาย")}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    👦 เพศชาย
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={newGender === "หญิง"}
                      onChange={() => setNewGender("หญิง")}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    👧 เพศหญิง
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-sm bg-purple-900 text-yellow-300 font-bold hover:bg-purple-800 shadow"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: นำเข้ารายชื่อจากไฟล์ */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-800">นำเข้ารายชื่อเข้าห้อง {currentClassName}</h3>
                <p className="text-xs text-gray-500">อัปโหลดไฟล์ หรือ คัดลอกรายชื่อมาวางได้โดยตรง</p>
              </div>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                วิธีที่ 1: เลือกไฟล์ (.csv หรือ .txt)
              </label>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                วิธีที่ 2: วางรายชื่อที่คัดลอกจาก Excel (1 คนต่อ 1 บรรทัด)
              </label>
              <textarea
                rows={6}
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder={"ตัวอย่างรูปแบบ:\n1, 67001, เด็กชายสมชาย ใจดี, ชาย\n2, 67002, เด็กหญิงสมหญิง รักเรียน, หญิง\nหรือก๊อปปี้จาก Excel มาวางได้เลยครับ"}
                className="w-full border rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-purple-600 outline-none bg-gray-50"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!importText.trim()}
                className="px-5 py-2 rounded-xl text-sm bg-yellow-400 text-purple-900 font-bold hover:bg-yellow-300 shadow disabled:opacity-50"
              >
                ยืนยันการนำเข้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}