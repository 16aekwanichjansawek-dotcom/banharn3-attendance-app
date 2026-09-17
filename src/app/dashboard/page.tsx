export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">?????????? (Dashboard)</h1>
          <p className="text-gray-500 mt-2">?????????????????????????? {new Date().toLocaleDateString("th-TH")}</p>
        </div>
        <button className="px-4 py-2 bg-school-primary text-white rounded-lg shadow hover:bg-purple-800 transition">
          ???????????????
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium">???????????????</span>
          <span className="text-4xl font-bold text-gray-900 mt-2">1,250</span>
          <span className="text-green-500 text-sm mt-2 flex items-center">
            ? ????????? 2% ????????????
          </span>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium">?????????????</span>
          <span className="text-4xl font-bold text-green-600 mt-2">1,180</span>
          <span className="text-gray-400 text-sm mt-2">??????? 94.4%</span>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium">????????</span>
          <span className="text-4xl font-bold text-red-500 mt-2">45</span>
          <span className="text-gray-400 text-sm mt-2">??????? 3.6%</span>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <span className="text-gray-500 text-sm font-medium">?? / ???</span>
          <span className="text-4xl font-bold text-yellow-500 mt-2">25</span>
          <span className="text-gray-400 text-sm mt-2">??????? 2.0%</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">?????????????????</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">????????????</th>
                <th className="px-6 py-3">????-???????</th>
                <th className="px-6 py-3">?????????</th>
                <th className="px-6 py-3">?????</th>
                <th className="px-6 py-3">????</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {[
                { id: "65001", name: "????? ????????", room: "?.4/1", status: "???????", time: "07:45", color: "text-green-600 bg-green-50" },
                { id: "65002", name: "?????? ????????", room: "?.4/1", status: "???", time: "08:15", color: "text-yellow-600 bg-yellow-50" },
                { id: "65003", name: "????? ????", room: "?.4/1", status: "???", time: "-", color: "text-red-600 bg-red-50" },
                { id: "65004", name: "????? ?????", room: "?.4/2", status: "??????", time: "-", color: "text-blue-600 bg-blue-50" },
              ].map((student, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{student.id}</td>
                  <td className="px-6 py-4 font-medium">{student.name}</td>
                  <td className="px-6 py-4 text-gray-500">{student.room}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.color}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{student.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
