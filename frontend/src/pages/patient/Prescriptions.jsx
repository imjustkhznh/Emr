import React, { useState } from 'react';
import { Pill, Download, Search, Eye, Calendar, AlertCircle } from 'lucide-react';

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [prescriptions] = useState([
    { id: 1, medicineName: 'Amoxicillin 500mg', doctor: 'Dr. Trần Hữu Bình', dose: '2 viên x 3 lần/ngày', duration: '7 ngày', date: '2025-01-15', status: 'active' },
    { id: 2, medicineName: 'Vitamin C 1000mg', doctor: 'Dr. Đặng Ngọc Hiểu', dose: '1 viên x 1 lần/ngày', duration: '30 ngày', date: '2025-01-20', status: 'active' },
    { id: 3, medicineName: 'Metformin 500mg', doctor: 'Dr. Phạm Mạnh Dũng', dose: '1 viên x 2 lần/ngày', duration: 'Long-term', date: '2025-01-10', status: 'active' },
    { id: 4, medicineName: 'Aspirin 100mg', doctor: 'Dr. Lê Thanh Tùng', dose: '1 viên x 1 lần/ngày', duration: '90 ngày', date: '2024-12-15', status: 'expired' }
  ]);

  const filteredPrescriptions = prescriptions.filter(p =>
    p.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = prescriptions.filter(p => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Đơn Thuốc Của Tôi</h1>
          <p className="text-base text-gray-600">Quản lý và theo dõi các đơn thuốc được kê đơn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-200 rounded-lg p-3">
                <Pill className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700">Có Hiệu Lực</p>
                <p className="text-2xl font-bold text-green-900">{activeCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-orange-200 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-orange-700">Hết Hạn</p>
                <p className="text-2xl font-bold text-orange-900">{prescriptions.length - activeCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm tên thuốc, bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Prescriptions Grid */}
        <div className="grid gap-4">
          {filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg border border-purple-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-purple-50 rounded-lg p-2.5">
                      <Pill className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{p.medicineName}</h3>
                      <p className="text-sm text-gray-600">Bác sĩ kê: {p.doctor}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      p.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {p.status === 'active' ? '✓ Có hiệu lực' : '✗ Hết hạn'}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5 text-sm bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Liều Lượng</p>
                    <p className="font-semibold text-gray-900 mt-1">{p.dose}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Thời Gian</p>
                    <p className="font-semibold text-gray-900 mt-1">{p.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Ngày Kê</p>
                    <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      {new Date(p.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> Xem Chi Tiết
                  </button>
                  <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Tải Xuống
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-purple-100">
              <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Không tìm thấy đơn thuốc nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
