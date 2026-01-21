import React, { useEffect, useState } from 'react';
import { Users, Search, Edit2, Trash2, Plus } from 'lucide-react';
import { patientsAPI } from '../../services/api';
import { toast } from 'react-toastify';

// Tạo dữ liệu fake 1250 bệnh nhân với seed để cứ cố định
const generateFakePatients = () => {
  const firstNames = ['Nguyễn', 'Trần', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Dương', 'Cao', 'Lê', 'Võ', 'Phan', 'Lý', 'Huỳnh', 'Kiều', 'Hà', 'Trương', 'Quách', 'Đỗ', 'Tô'];
  const lastNames = ['Văn', 'Thị', 'Minh', 'Hữu', 'Mạnh', 'Quốc', 'Ngọc', 'Hồng', 'Kiên', 'Long', 'Hương', 'Linh', 'Mai', 'Hạnh', 'Khánh', 'Sơn', 'Tuấn', 'Dũng', 'Ân', 'Bảo'];
  const cities = ['Hà Nội', 'TP. HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Biên Hòa', 'Nha Trang', 'Huế', 'Hải Dương', 'Thái Nguyên'];
  const streets = ['Phố Nguyễn Huệ', 'Đường Trần Hưng Đạo', 'Phố Cổ Loa', 'Đường Hoàng Văn Thụ', 'Phố Kim Mã', 'Đường Lê Lợi', 'Phố Hàng Bông', 'Đường Pasteur', 'Phố Bà Triệu', 'Đường Võ Văn Kiệt'];
  const genders = ['Nam', 'Nữ'];
  const statuses = ['Hoạt động', 'Tạm dừng', 'Đang điều trị'];

  // Seeded random function để dữ liệu luôn cố định
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Hàm loại bỏ dấu tiếng Việt
  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const patients = [];
  for (let i = 1; i <= 1250; i++) {
    const seed1 = i * 73856093;
    const seed2 = i * 19349663;
    const seed3 = i * 83492791;
    const seed4 = i * 12345678;
    const seed5 = i * 87654321;
    const seed6 = i * 45678901;

    const firstName = firstNames[Math.floor(seededRandom(seed1) * firstNames.length)];
    const lastName = lastNames[Math.floor(seededRandom(seed2) * lastNames.length)];
    const middleName = lastNames[Math.floor(seededRandom(seed3) * lastNames.length)];
    const fullName = `${firstName} ${middleName} ${lastName}`;
    
    // Email: loại bỏ dấu, không có space, không có . giữa
    const emailName = removeAccents(fullName).toLowerCase().replace(/\s+/g, '');
    const phone = `09${String(Math.floor(seededRandom(seed1 + seed2) * 900000000)).padStart(8, '0')}`;
    
    patients.push({
      _id: `patient_${i}`,
      name: fullName,
      age: Math.floor(seededRandom(seed4) * (80 - 18 + 1)) + 18,
      gender: genders[Math.floor(seededRandom(seed5) * genders.length)],
      phone: phone,
      email: `${emailName}${i}@gmail.com`,
      address: `Số ${Math.floor(seededRandom(seed2 + seed3) * 999) + 1} ${streets[Math.floor(seededRandom(seed3 + seed4) * streets.length)]}, ${cities[Math.floor(seededRandom(seed6) * cities.length)]}`,
      status: statuses[Math.floor(seededRandom(seed5 + seed6) * statuses.length)]
    });
  }
  return patients;
};

const FAKE_PATIENTS = generateFakePatients();

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // Sử dụng dữ liệu fake
      setPatients(FAKE_PATIENTS);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Fallback vẫn dùng dữ liệu fake
      setPatients(FAKE_PATIENTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  );

  // Tính toán pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa bệnh nhân này?')) {
      try {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        await fetch(`http://localhost:3001/api/patients/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setPatients(patients.filter(p => p._id !== id));
        toast.success('Xóa bệnh nhân thành công');
      } catch (error) {
        toast.error('Không thể xóa bệnh nhân');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          Quản Lý Bệnh Nhân
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus className="h-5 w-5" />
          Thêm Bệnh Nhân
        </button>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="mb-6 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bệnh nhân..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Không có bệnh nhân</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tuổi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Giới tính</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Điện thoại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.age || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.gender || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.status || 'N/A'}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(patient._id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredPatients.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {startIndex + 1} đến {Math.min(endIndex, filteredPatients.length)} trong {filteredPatients.length} bệnh nhân
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Trước
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    const distance = Math.abs(page - currentPage);
                    return distance <= 2 || page === 1 || page === totalPages;
                  })
                  .map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && <span className="px-2">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPatients;
