import React, { useState } from 'react';
import { History, MapPin, Calendar, Clock, Download, Eye, Search, X, CheckCircle2, AlertTriangle } from 'lucide-react';

const Visits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [visits] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', date: '2025-01-15', time: '09:00 AM', location: 'Phòng 301', duration: '30 phút', diagnosis: 'Huyết áp cao, cần theo dõi', status: 'completed' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', date: '2025-01-08', time: '02:00 PM', location: 'Phòng 205', duration: '25 phút', diagnosis: 'Trào ngược dạ dày, kê đơn thuốc', status: 'completed' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', date: '2024-12-20', time: '10:30 AM', location: 'Phòng 401', duration: '45 phút', diagnosis: 'Khám sau phẫu thuật, kết quả tốt', status: 'completed' },
    { id: 4, doctorName: 'Dr. Lê Thanh Tùng', specialty: 'Hô hấp', date: '2024-12-10', time: '03:00 PM', location: 'Phòng 102', duration: '20 phút', diagnosis: 'Viêm phế quản, kê thuốc', status: 'completed' }
  ]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewDetails = (visit) => {
    setSelectedVisit(visit);
  };

  const handleDownload = (visit) => {
    const visitText = `HỒ SƠ LẦN KHÁM BỆNH
==================================
Bác Sĩ: ${visit.doctorName}
Chuyên Khoa: ${visit.specialty}
Ngày Khám: ${new Date(visit.date).toLocaleDateString('vi-VN')}
Thời Gian: ${visit.time}
Thời Lượng: ${visit.duration}
Địa Điểm: ${visit.location}

CHẨN ĐOÁN:
${visit.diagnosis}

TRẠNG THÁI: Hoàn thành

Ghi Chú:
- Thông tin này được cấp bởi phòng khám MediCare EMR
- Giữ bản sao an toàn
- Tuân theo hướng dẫn của bác sĩ

Ngày Xuất: ${new Date().toLocaleDateString('vi-VN')}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(visitText));
    element.setAttribute('download', `visit_${visit.id}_${new Date(visit.date).getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Tải xuống hồ sơ khám bệnh thành công`, 'success');
  };

  const filteredVisits = visits.filter(v =>
    v.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = visits.filter(v => v.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 max-w-sm z-50 animate-in fade-in slide-in-from-top-5 duration-300 ${
          toast.type === 'success' 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
        } rounded-lg shadow-lg p-4`}>
          <div className="flex items-start gap-3">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-semibold ${toast.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                {toast.type === 'success' ? '✓ Thành công' : '⚠ Lỗi'}
              </p>
              <p className={`text-sm mt-1 ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className={`flex-shrink-0 ${toast.type === 'success' ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-purple-200 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">Chi Tiết Lần Khám</h3>
              <button 
                onClick={() => setSelectedVisit(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="bg-purple-50 rounded-lg p-2">
                  <History className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">Bác Sĩ</p>
                  <p className="text-lg font-bold text-gray-900">{selectedVisit.doctorName}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedVisit.specialty}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Ngày Khám</p>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  {new Date(selectedVisit.date).toLocaleDateString('vi-VN')}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Thời Gian</p>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  {selectedVisit.time}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Thời Lượng</p>
                <p className="text-gray-900 font-medium">{selectedVisit.duration}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Địa Điểm</p>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  {selectedVisit.location}
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs text-purple-700 font-semibold mb-2">📋 Chẩn Đoán</p>
                <p className="text-sm text-purple-600">{selectedVisit.diagnosis}</p>
              </div>

              <button
                onClick={() => {
                  handleDownload(selectedVisit);
                  setSelectedVisit(null);
                }}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Tải Xuống Hồ Sơ
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Lịch Sử Khám Bệnh</h1>
          <p className="text-base text-gray-600">Xem chi tiết các lần khám bệnh trước đó</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-200 rounded-lg p-3">
                <History className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700">Lần Khám Hoàn Thành</p>
                <p className="text-2xl font-bold text-green-900">{completedCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 rounded-lg p-3">
                <Calendar className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Tổng Số Khám</p>
                <p className="text-2xl font-bold text-blue-900">{visits.length}</p>
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
              placeholder="Tìm kiếm tên bác sĩ, chuyên khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Visits Grid */}
        <div className="grid gap-4">
          {filteredVisits.length > 0 ? (
            filteredVisits.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-lg border border-purple-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-purple-50 rounded-lg p-2.5">
                      <History className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{v.doctorName}</h3>
                      <p className="text-sm text-gray-600">Chuyên khoa: {v.specialty}</p>
                    </div>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-green-100 text-green-800">
                    ✓ Hoàn thành
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5 text-sm bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Ngày Khám</p>
                    <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      {new Date(v.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Thời Gian</p>
                    <p className="font-semibold text-gray-900 mt-1">{v.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Thời Lượng</p>
                    <p className="font-semibold text-gray-900 mt-1">{v.duration}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Địa Điểm</p>
                    <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      {v.location}
                    </p>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="mb-5 text-sm bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-gray-600 text-xs uppercase tracking-wide mb-2 font-semibold">Chẩn Đoán</p>
                  <p className="text-gray-900">{v.diagnosis}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewDetails(v)}
                    className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> Xem Chi Tiết
                  </button>
                  <button 
                    onClick={() => handleDownload(v)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Tải Xuống
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-purple-100">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Không tìm thấy lần khám nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visits;
