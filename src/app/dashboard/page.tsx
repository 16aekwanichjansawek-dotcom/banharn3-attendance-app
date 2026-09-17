export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ภาพรวมการมาเรียน</h1>
        <p className="text-gray-600 mt-1">ข้อมูลสถิติประจำวันนี้</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-600">
          <div className="text-sm font-medium text-gray-500">นักเรียนทั้งหมด</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">1,250 คน</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-500">มาเรียนปกติ</div>
          <div className="text-3xl font-bold text-green-600 mt-2">1,180 คน</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-sm font-medium text-gray-500">มาสาย / ลา</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">25 คน</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <div className="text-sm font-medium text-gray-500">ขาดเรียน</div>
          <div className="text-3xl font-bold text-red-600 mt-2">45 คน</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">สถานะล่าสุด</h2>
        <div className="text-gray-500 text-sm">
          ระบบพร้อมสำหรับการเช็คชื่อประจำวัน สามารถกดเข้าเมนู &quot;บันทึกการเช็คชื่อ&quot; ด้านซ้ายมือเพื่อเริ่มใช้งานได้ทันที
        </div>
      </div>
    </div>
  );
}