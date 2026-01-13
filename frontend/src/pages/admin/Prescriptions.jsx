import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Download, Pill, Calendar, User, Search } from 'lucide-react';

const sampleAllPrescriptions = [
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
    expiryDate: '2026-02-10',
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
    expiryDate: '2026-02-09',
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
    expiryDate: '2026-01-20',
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
    expiryDate: '2026-02-11',
    status: 'active'
  },
];

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load sample data
    setPrescriptions(sampleAllPrescriptions);
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn thuốc này?')) {
      setPrescriptions(prescriptions.filter(p => p.id !== id));
    }
  };

  const handleDownload = (prescription) => {
    const content = `
====================================
        ĐƠN THUỐC
====================================

Bệnh nhân: ${prescription.patientName} (${prescription.patientId})
Bác sĩ kê đơn: ${prescription.doctorName}
Chẩn đoán: ${prescription.diagnosis}
Ngày kê: ${prescription.createdDate}
Hết hạn: ${prescription.expiryDate}

DANH SÁCH THUỐC:
${prescription.medications.map((med, idx) => 
  `${idx + 1}. ${med.name} - ${med.dosage} - ${med.duration}`
).join('\n')}
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
                         p.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:px-6 md:px-8 py-6 w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn thuốc</h1>
          <p className="text-gray-600 mt-2">Xem và quản lý tất cả đơn thuốc trong hệ thống</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bệnh nhân, mã BN, bác sĩ hoặc chẩn đoán..."
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

        {/* Table */}
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
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mã BN</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên Bệnh Nhân</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bác sĩ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Chẩn đoán</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ngày kê</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">{prescription.patientId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{prescription.patientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{prescription.doctorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{prescription.diagnosis}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {prescription.createdDate}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          prescription.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {prescription.status === 'active' ? '✓ Đang dùng' : '✕ Hết hạn'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleDownload(prescription)}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-xs font-semibold"
                            title="Tải xuống"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(prescription.id)}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-semibold"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPrescriptions;
