import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-school-primary text-white flex flex-col hidden md:flex">
        <div className="p-6 text-center border-b border-white/20">
          <h2 className="text-xl font-bold text-school-secondary">????????????????? 3</h2>
          <p className="text-sm opacity-80 mt-1">??????????????????</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition">
            ?? ?????? (Dashboard)
          </Link>
          <Link href="/dashboard/attendance" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition">
            ?? ????????????????
          </Link>
          <Link href="/dashboard/students" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition">
            ?? ????????????????????
          </Link>
          <Link href="/dashboard/promotion" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition">
            ?? ??????????????????
          </Link>
        </nav>
        <div className="p-4 border-t border-white/20">
          <Link href="/" className="block px-4 py-2 text-center text-red-300 hover:text-red-100 transition">
            ??????????
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">????????????, ??????</h1>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
