import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, FilePlus, XCircle, UserCircle2 } from 'lucide-react';

const patientsSampleData = [
  { id: 'BN001', name: 'Nguyễn Văn An', gender: 'Nam', phone: '0912345678', status: 'chua_kham' },
  { id: 'BN002', name: 'Trần Thị Bình', gender: 'Nữ', phone: '0987654321', status: 'da_kham' },
  { id: 'BN003', name: 'Lê Văn Cường', gender: 'Nam', phone: '0909123123', status: 'dang_kham' },
  { id: 'BN004', name: 'Phạm Thị Dung', gender: 'Nữ', phone: '0911000001', status: 'da_huy' },
  { id: 'BN005', name: 'Hoàng Minh Tuấn', gender: 'Nam', phone: '091000000', status: 'chua_kham' },
  { id: 'BN006', name: 'Vũ Thị Lan', gender: 'Nữ', phone: '091001234', status: 'dang_kham' },
  { id: 'BN007', name: 'Đặng Văn Hùng', gender: 'Nam', phone: '091002468', status: 'da_kham' },
  { id: 'BN008', name: 'Bùi Thị Mai', gender: 'Nữ', phone: '091003702', status: 'da_huy' },
  { id: 'BN009', name: 'Phan Văn Quang', gender: 'Nam', phone: '091004936', status: 'chua_kham' },
  { id: 'BN010', name: 'Đỗ Thị Hạnh', gender: 'Nữ', phone: '091006170', status: 'dang_kham' },
  { id: 'BN011', name: 'Ngô Văn Phúc', gender: 'Nam', phone: '091007404', status: 'da_kham' },
  { id: 'BN012', name: 'Lý Thị Thu', gender: 'Nữ', phone: '091008638', status: 'da_huy' },
  { id: 'BN013', name: 'Trịnh Văn Sơn', gender: 'Nam', phone: '091009872', status: 'chua_kham' },
  { id: 'BN014', name: 'Tạ Thị Kim', gender: 'Nữ', phone: '091011106', status: 'dang_kham' },
  { id: 'BN015', name: 'Phùng Văn Tài', gender: 'Nam', phone: '091012340', status: 'da_kham' },
  { id: 'BN016', name: 'Lâm Thị Hoa', gender: 'Nữ', phone: '091013574', status: 'da_huy' },
  { id: 'BN017', name: 'Vương Văn Khánh', gender: 'Nam', phone: '091014808', status: 'chua_kham' },
  { id: 'BN018', name: 'Châu Thị Yến', gender: 'Nữ', phone: '091016042', status: 'dang_kham' },
  { id: 'BN019', name: 'Kiều Văn Phong', gender: 'Nam', phone: '091017276', status: 'da_kham' },
  { id: 'BN020', name: 'Lưu Thị Hương', gender: 'Nữ', phone: '091018510', status: 'da_huy' }
];

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sử dụng dữ liệu mẫu từ seed
    setPatients(patientsSampleData);
  }, []);

  const handleViewInfo = (id) => navigate(`/doctor/patient/${id}`);
  const handleCreateRecord = (id) => alert(`Tạo hồ sơ bệnh lý cho bệnh nhân ${id}`);
  const handleCancelReception = (id) => alert(`Hủy tiếp nhận bệnh nhân ${id}`);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Danh sách bệnh nhân</h1>
        <p className="text-gray-500 mb-6">Quản lý và theo dõi thông tin bệnh nhân một cách đơn giản, trực quan.</p>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">STT</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mã BN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên Bệnh Nhân</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Giới tính</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Số điện thoại</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    <UserCircle2 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    Không có bệnh nhân nào
                  </td>
                </tr>
              ) : (
                patients.map((patient, index) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">{patient.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
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
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleViewInfo(patient.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition text-xs font-semibold">
                          <Eye className="w-4 h-4" /> Xem
                        </button>
                        <button onClick={() => handleCreateRecord(patient.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition text-xs font-semibold">
                          <FilePlus className="w-4 h-4" /> Hồ sơ
                        </button>
                        <button onClick={() => handleCancelReception(patient.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-xs font-semibold">
                          <XCircle className="w-4 h-4" /> Hủy
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <p className="text-sm text-gray-600">
            Tổng cộng: <span className="font-semibold">{patients.length}</span> bệnh nhân
          </p>
        </div>
      </div>
    </div>
  );
};

export default Patients;
