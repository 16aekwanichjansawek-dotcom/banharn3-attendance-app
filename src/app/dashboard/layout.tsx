import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-purple-900 text-white flex flex-col p-6">
        <div className="text-center pb-6 border-b border-purple-700 mb-6">
          <h2 className="text-lg font-bold text-yellow-400">บรรหารแจ่มใสวิทยา 3</h2>
          <p className="text-xs text-purple-200 mt-1">ระบบเช็คชื่อนักเรียน</p>
        </div>
        <nav className="flex-1 space-y-3">
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition">
            📊 หน้าแรกสรุปผล
          </Link>
          <Link href="/dashboard/attendance" className="block px-4 py-2 rounded-lg hover:bg-purple-800 transition">
            📝 บันทึกการเช็คชื่อ
          </Link>
          <Link href="/dashboard/students" className="block px-4 py-2 rounded-lg hover:bg-purple-800 transition">
            👨‍🎓 รายชื่อนักเรียน
          </Link>
        </nav>
        <div className="pt-6 border-t border-purple-700 mt-6">
          <Link href="/" className="block text-center text-sm text-purple-300 hover:text-white">
            ← กลับหน้าหลัก
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}