import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <span className="bg-amber-400 text-blue-950 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              ระบบสารสนเทศสถานศึกษา
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3">
              โรงเรียนบรรหารแจ่มใสวิทยา 3
            </h1>
            <p className="text-blue-200 mt-1">
              ระบบเช็คชื่อนักเรียนและจัดการเลื่อนชั้นประจำปีการศึกษา
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-blue-800 p-4 rounded-xl border border-blue-700 text-center">
            <p className="text-xs text-blue-300">สถานะระบบ</p>
            <p className="text-emerald-400 font-bold text-sm flex items-center justify-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              พร้อมใช้งาน (Online)
            </p>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Menu 1: เช็คชื่อ */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
              📝
            </div>
            <h2 className="text-xl font-bold text-slate-900">เช็คชื่อประจำวัน</h2>
            <p className="text-slate-500 text-sm mt-1 mb-4">
              บันทึกสถิติ มา, ขาด, ลา, สาย ของนักเรียนแต่ละห้องเรียนแบบ Real-time
            </p>
            <span className="text-blue-600 font-medium text-sm inline-flex items-center gap-1 cursor-not-allowed">
              กำลังพัฒนา...
            </span>
          </div>

          {/* Menu 2: จัดการนักเรียน */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
              👥
            </div>
            <h2 className="text-xl font-bold text-slate-900">ข้อมูลนักเรียน</h2>
            <p className="text-slate-500 text-sm mt-1 mb-4">
              เพิ่ม ลบ แก้ไขรายชื่อนักเรียน และจัดห้องเรียนตามระดับชั้น
            </p>
            <span className="text-emerald-600 font-medium text-sm inline-flex items-center gap-1 cursor-not-allowed">
              กำลังพัฒนา...
            </span>
          </div>

          {/* Menu 3: ระบบเลื่อนชั้น */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
              🎓
            </div>
            <h2 className="text-xl font-bold text-slate-900">ระบบเลื่อนชั้น</h2>
            <p className="text-slate-500 text-sm mt-1 mb-4">
              เลื่อนระดับชั้นนักเรียนขึ้นปีการศึกษาใหม่ (เช่น ม.1 เป็น ม.2) รวดเดียวทั้งระบบ
            </p>
            <span className="text-amber-600 font-medium text-sm inline-flex items-center gap-1 cursor-not-allowed">
              กำลังพัฒนา...
            </span>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-slate-400 text-xs">
          พัฒนาด้วย Next.js & Tailwind CSS • สำหรับโรงเรียนบรรหารแจ่มใสวิทยา 3
        </div>

      </div>
    </main>
  );
}