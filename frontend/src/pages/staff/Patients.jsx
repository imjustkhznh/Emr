import React, { useEffect, useState } from 'react';
import { Eye, UserCircle2, Search } from 'lucide-react';

const samplePatientsData = [
  { id: 'BN001', name: 'Nguyễn Văn An', gender: 'Nam', phone: '0912345678', age: 35, status: 'chua_kham' },
  { id: 'BN002', name: 'Trần Thị Bình', gender: 'Nữ', phone: '0987654321', age: 28, status: 'da_kham' },
  { id: 'BN003', name: 'Lê Văn Cường', gender: 'Nam', phone: '0909123123', age: 45, status: 'dang_kham' },
  { id: 'BN004', name: 'Phạm Thị Dung', gender: 'Nữ', phone: '0911000001', age: 32, status: 'da_huy' },
  { id: 'BN005', name: 'Hoàng Minh Tuấn', gender: 'Nam', phone: '091000000', age: 50, status: 'chua_kham' },
  { id: 'BN006', name: 'Vũ Thị Lan', gender: 'Nữ', phone: '091001234', age: 29, status: 'dang_kham' },
  { id: 'BN007', name: 'Đặng Văn Hùng', gender: 'Nam', phone: '091002468', age: 38, status: 'da_kham' },
  { id: 'BN008', name: 'Bùi Thị Mai', gender: 'Nữ', phone: '091003702', age: 26, status: 'da_huy' },
  { id: 'BN009', name: 'Phan Văn Quang', gender: 'Nam', phone: '091004936', age: 42, status: 'chua_kham' },
  { id: 'BN010', name: 'Đỗ Thị Hạnh', gender: 'Nữ', phone: '091006170', age: 31, status: 'dang_kham' },
];

const StaffPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPatients(samplePatientsData);
  }, []);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const handleViewInfo = (id) => {
    alert(`Xem thông tin chi tiết bệnh nhân ${id}`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-blue-700">Danh sách bệnh nhân</h1>
          <p className="text-gray-500">Quản lý và theo dõi thông tin bệnh nhân</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mã BN hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">STT</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mã BN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên Bệnh Nhân</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Giới tính</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tuổi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Số điện thoại</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    <UserCircle2 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    Không tìm thấy bệnh nhân nào
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, index) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">{patient.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        patient.status === 'da_kham' ? 'bg-green-100 text-green-800' :
                        patient.status === 'dang_kham' ? 'bg-blue-100 text-blue-800' :
                        patient.status === 'da_huy' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.status === 'da_kham' ? 'Đã khám' :
                         patient.status === 'dang_kham' ? 'Đang khám' :
                         patient.status === 'da_huy' ? 'Đã hủy' :
                         'Chưa khám'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button
                        onClick={() => handleViewInfo(patient.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition text-xs font-semibold"
                      >
                        <Eye className="w-4 h-4" /> Xem
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Tổng bệnh nhân</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{patients.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Đã khám</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {patients.filter(p => p.status === 'da_kham').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Đang khám</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {patients.filter(p => p.status === 'dang_kham').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Chưa khám</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              {patients.filter(p => p.status === 'chua_kham').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPatients;
