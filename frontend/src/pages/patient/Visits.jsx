import React from 'react';

const Visits = () => {
  const visits = [
    {
      date: '05/03/2026',
      doctor: 'BS. Nguyễn Thị Lan',
      department: 'Nội tổng quát',
      diagnosis: 'Viêm họng cấp',
      type: 'Khám trực tiếp',
    },
    {
      date: '10/02/2026',
      doctor: 'BS. Trần Văn Minh',
      department: 'Tim mạch',
      diagnosis: 'Tăng huyết áp độ 1',
      type: 'Khám trực tiếp',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-secondary-900 mb-4">Lịch sử khám bệnh</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 text-sm">
          <p className="text-secondary-600">
            Bạn có <span className="font-semibold text-secondary-900">{visits.length}</span> lần
            khám đã lưu trong hệ thống.
          </p>
          <div className="flex gap-2">
            <input
              placeholder="Tìm theo bác sĩ, chẩn đoán..."
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Tất cả</option>
              <option>6 tháng gần đây</option>
              <option>1 năm gần đây</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto text-sm">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-secondary-500">Ngày</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-secondary-500">
                  Bác sĩ
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-secondary-500">
                  Chuyên khoa
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-secondary-500">
                  Chẩn đoán
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-secondary-500">
                  Hình thức
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visits.map((v, idx) => (
                <tr key={idx} className="hover:bg-secondary-50/60">
                  <td className="px-4 py-2 whitespace-nowrap text-secondary-900">{v.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-secondary-900">{v.doctor}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-secondary-700">{v.department}</td>
                  <td className="px-4 py-2 text-secondary-700">{v.diagnosis}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-secondary-700">{v.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Visits;

