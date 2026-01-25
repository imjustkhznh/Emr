import React, { useState } from 'react';
import { Pill, Download, Search, Eye, Calendar, AlertCircle, X, CheckCircle2, AlertTriangle } from 'lucide-react';

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions] = useState([
    { id: 1, medicineName: 'Amoxicillin 500mg', doctor: 'Dr. Trần Hữu Bình', dose: '2 viên x 3 lần/ngày', duration: '7 ngày', date: '2025-01-15', status: 'active' },
    { id: 2, medicineName: 'Vitamin C 1000mg', doctor: 'Dr. Đặng Ngọc Hiểu', dose: '1 viên x 1 lần/ngày', duration: '30 ngày', date: '2025-01-20', status: 'active' },
    { id: 3, medicineName: 'Metformin 500mg', doctor: 'Dr. Phạm Mạnh Dũng', dose: '1 viên x 2 lần/ngày', duration: 'Long-term', date: '2025-01-10', status: 'active' },
    { id: 4, medicineName: 'Aspirin 100mg', doctor: 'Dr. Lê Thanh Tùng', dose: '1 viên x 1 lần/ngày', duration: '90 ngày', date: '2024-12-15', status: 'expired' }
  ]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleDownload = (prescription) => {
    const prescriptionText = `ĐƠNHOÀN THUỐC
==================================
Tên Thuốc: ${prescription.medicineName}
Bác Sĩ Kê: ${prescription.doctor}
Liều Lượng: ${prescription.dose}
Thời Gian Sử Dụng: ${prescription.duration}
Ngày Kê: ${new Date(prescription.date).toLocaleDateString('vi-VN')}
Trạng Thái: ${prescription.status === 'active' ? 'Có Hiệu Lực' : 'Hết Hạn'}

Ghi Chú:
- Uống đúng liều lượng theo hướng dẫn
- Uống cùng lúc mỗi ngày
- Tương tác với thực phẩm: Không có
- Tác dụng Phụ: Hiếm gặp

Ngày Xuất: ${new Date().toLocaleDateString('vi-VN')}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(prescriptionText));
    element.setAttribute('download', `prescription_${prescription.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Tải xuống đơn thuốc thành công`, 'success');
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = prescriptions.filter(p => p.status === 'active').length;

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
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-purple-200 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">Chi Tiết Đơn Thuốc</h3>
              <button 
                onClick={() => setSelectedPrescription(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="bg-purple-50 rounded-lg p-2">
                  <Pill className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase font-semibold">Tên Thuốc</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPrescription.medicineName}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Bác Sĩ Kê</p>
                <p className="text-gray-900 font-medium">{selectedPrescription.doctor}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Liều Lượng</p>
                <p className="text-gray-900 font-medium">{selectedPrescription.dose}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Thời Gian Sử Dụng</p>
                <p className="text-gray-900 font-medium">{selectedPrescription.duration}</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Ngày Kê</p>
                <p className="text-gray-900 font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  {new Date(selectedPrescription.date).toLocaleDateString('vi-VN')}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Trạng Thái</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedPrescription.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {selectedPrescription.status === 'active' ? '✓ Có Hiệu Lực' : '✗ Hết Hạn'}
                </span>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-purple-700 font-semibold mb-1">⚠ Hướng Dẫn Sử Dụng</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• Uống đúng liều lượng theo hướng dẫn</li>
                  <li>• Uống cùng lúc mỗi ngày</li>
                  <li>• Nên uống cùng bữa ăn</li>
                  <li>• Không bỏ liều</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleDownload(selectedPrescription);
                  setSelectedPrescription(null);
                }}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Tải Xuống Đơn Thuốc
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <button 
                    onClick={() => handleViewDetails(p)}
                    className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> Xem Chi Tiết
                  </button>
                  <button 
                    onClick={() => handleDownload(p)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
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
