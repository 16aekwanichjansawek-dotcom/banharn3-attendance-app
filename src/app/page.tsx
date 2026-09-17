import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="max-w-3xl flex flex-col items-center">
        <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-md mb-6 flex items-center justify-center shadow-xl text-4xl">
          🏫
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          ระบบเช็คชื่อนักเรียน
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-yellow-300 mb-8">
          โรงเรียนบรรหารแจ่มใสวิทยา 3
        </h2>
        <p className="text-gray-200 mb-10 max-w-xl text-base md:text-lg">
          ระบบจัดการและติดตามเวลาเรียนของนักเรียน สะดวก รวดเร็ว ตรวจสอบได้แบบเรียลไทม์
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="px-8 py-3 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow-lg hover:bg-yellow-300 transition">
            เข้าสู่ระบบ Dashboard
          </Link>
          <Link href="/dashboard/attendance" className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition">
            เริ่มเช็คชื่อทันที
          </Link>
        </div>
      </div>
    </main>
  );
}