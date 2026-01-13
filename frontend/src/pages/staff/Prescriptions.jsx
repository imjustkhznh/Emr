import React, { useEffect, useState } from 'react';
import { Download, Calendar, Pill, Search, User } from 'lucide-react';

const sampleStaffPrescriptions = [
  {
    id: '1',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    doctorName: 'BS. Trần Văn A',
    medications: [
      { name: 'Paracetamol 500mg', quantity: 20, dosage: '2 viên/lần - 3 lần/ngày', duration: '5 ngày' },
      { name: 'Amoxicillin 250mg', quantity: 15, dosage: '1 viên/lần - 3 lần/ngày', duration: '7 ngày' }
    ],
    diagnosis: 'Cảm cúm thông thường',
    createdDate: '2026-01-10',
    status: 'active'
  },
  {
    id: '2',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    doctorName: 'BS. Nguyễn Thị B',
    medications: [
      { name: 'Vitamin C 500mg', quantity: 30, dosage: '1 viên/lần - 1 lần/ngày', duration: '30 ngày' }
    ],
    diagnosis: 'Bổ sung vitamin',
    createdDate: '2026-01-09',
    status: 'active'
  },
  {
    id: '3',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    doctorName: 'BS. Lê Văn C',
    medications: [
      { name: 'Omeprazole 20mg', quantity: 28, dosage: '1 viên/lần - 1 lần/ngày', duration: '4 tuần' }
    ],
    diagnosis: 'Rối loạn tiêu hóa',
    createdDate: '2025-12-20',
    status: 'expired'
  },
  {
    id: '4',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    doctorName: 'BS. Trần Văn A',
    medications: [
      { name: 'Ibuprofen 400mg', quantity: 20, dosage: '1 viên/lần - 2 lần/ngày', duration: '5 ngày' }
    ],
    diagnosis: 'Đau đầu',
    createdDate: '2026-01-11',
    status: 'active'
  },
  {
    id: '5',
    patientId: 'BN005',
    patientName: 'Hoàng Minh Tuấn',
    doctorName: 'BS. Nguyễn Thị B',
    medications: [
      { name: 'Aspirin 500mg', quantity: 20, dosage: '1 viên/lần - 2 lần/ngày', duration: '7 ngày' }
    ],
    diagnosis: 'Sốt cao',
    createdDate: '2026-01-12',
    status: 'active'
  },
];

const StaffPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setPrescriptions(sampleStaffPrescriptions);
    setLoading(false);
  }, []);

  const handleDownload = (prescription) => {
    const content = `
====================================
        ĐƠN THUỐC
====================================

Bệnh nhân: ${prescription.patientName} (${prescription.patientId})
Bác sĩ kê đơn: ${prescription.doctorName}
Chẩn đoán: ${prescription.diagnosis}
Ngày kê: ${prescription.createdDate}

DANH SÁCH THUỐC:
${prescription.medications.map((med, idx) => 
  `${idx + 1}. ${med.name}
   - Liều: ${med.dosage}
   - Số lượng: ${med.quantity} viên
   - Thời gian: ${med.duration}`
).join('\n\n')}
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `don_thuoc_${prescription.patientName}_${prescription.createdDate}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:px-6 md:px-8 py-6 w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Danh sách đơn thuốc</h1>
          <p className="text-gray-600 mt-2">Xem các đơn thuốc được kê cho các bệnh nhân</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bệnh nhân, mã BN hoặc bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="active">Đang dùng</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Tổng đơn thuốc</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{prescriptions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Đang dùng</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {prescriptions.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Hết hạn</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              {prescriptions.filter(p => p.status === 'expired').length}
            </p>
          </div>
        </div>

        {/* Prescriptions List */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-blue-500 text-lg font-semibold animate-pulse">Đang tải...</span>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Không tìm thấy đơn thuốc nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrescriptions.map(prescription => (
              <div
                key={prescription.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{prescription.patientName}</h3>
                          <p className="text-sm text-gray-600">Mã BN: {prescription.patientId}</p>
                        </div>
                      </div>
                      <div className="ml-7">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Bác sĩ:</span> {prescription.doctorName}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Chẩn đoán:</span> {prescription.diagnosis}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
                          prescription.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {prescription.status === 'active' ? '✓ Đang dùng' : '✕ Hết hạn'}
                      </span>
                      <div className="flex items-center justify-end gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {prescription.createdDate}
                      </div>
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="bg-gray-50 rounded p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Danh sách thuốc
                    </h4>
                    <div className="space-y-2">
                      {prescription.medications.map((med, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          <p className="font-medium">{idx + 1}. {med.name}</p>
                          <p className="ml-4 text-gray-600">
                            Liều: {med.dosage} | SL: {med.quantity} viên | Thời gian: {med.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDownload(prescription)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPrescriptions;
