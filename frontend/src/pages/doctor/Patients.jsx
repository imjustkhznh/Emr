import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, FilePlus, XCircle, UserCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

// Dữ liệu fake 25 bệnh nhân cứng (cố định mỗi lần F5)
const FAKE_DOCTOR_PATIENTS = [
  { _id: 'dp_1', name: 'Nguyễn Văn An', age: 35, gender: 'Nam', phone: '0912345670', email: 'nguyenvanan1@gmail.com', address: 'Số 10 Phố Nguyễn Huệ, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_2', name: 'Trần Thị Bình', age: 28, gender: 'Nữ', phone: '0912345671', email: 'tranthbinh2@gmail.com', address: 'Số 25 Đường Trần Hưng Đạo, TP. HCM', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_3', name: 'Phạm Minh Châu', age: 42, gender: 'Nam', phone: '0912345672', email: 'phamminhchau3@gmail.com', address: 'Số 55 Phố Cổ Loa, Hà Nội', status: 'Đang điều trị', role: 'patients' },
  { _id: 'dp_4', name: 'Hoàng Thị Dung', age: 31, gender: 'Nữ', phone: '0912345673', email: 'hoangthidung4@gmail.com', address: 'Số 88 Đường Hoàng Văn Thụ, Đà Nẵng', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_5', name: 'Vũ Quốc Gia', age: 55, gender: 'Nam', phone: '0912345674', email: 'vuquocgia5@gmail.com', address: 'Số 15 Phố Kim Mã, Hà Nội', status: 'Tạm dừng', role: 'patients' },
  { _id: 'dp_6', name: 'Đặng Ngọc Hạnh', age: 26, gender: 'Nữ', phone: '0912345675', email: 'dangngochahn6@gmail.com', address: 'Số 42 Đường Lê Lợi, TP. HCM', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_7', name: 'Bùi Văn Hoàn', age: 48, gender: 'Nam', phone: '0912345676', email: 'buivanhoan7@gmail.com', address: 'Số 77 Phố Hàng Bông, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_8', name: 'Dương Thị Linh', age: 33, gender: 'Nữ', phone: '0912345677', email: 'duongthilinh8@gmail.com', address: 'Số 99 Đường Pasteur, Hà Nội', status: 'Đang điều trị', role: 'patients' },
  { _id: 'dp_9', name: 'Cao Minh Khánh', age: 29, gender: 'Nam', phone: '0912345678', email: 'caominhkhanh9@gmail.com', address: 'Số 33 Phố Bà Triệu, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_10', name: 'Lê Thị Linh', age: 37, gender: 'Nữ', phone: '0912345679', email: 'lethilinh10@gmail.com', address: 'Số 60 Đường Võ Văn Kiệt, TP. HCM', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_11', name: 'Võ Hữu Minh', age: 45, gender: 'Nam', phone: '0912345680', email: 'vohuuminh11@gmail.com', address: 'Số 18 Phố Nguyễn Huệ, Hà Nội', status: 'Tạm dừng', role: 'patients' },
  { _id: 'dp_12', name: 'Phan Thị Nhuận', age: 32, gender: 'Nữ', phone: '0912345681', email: 'phanthinhuan12@gmail.com', address: 'Số 44 Đường Trần Hưng Đạo, Hải Phòng', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_13', name: 'Lý Văn Oanh', age: 51, gender: 'Nam', phone: '0912345682', email: 'lyvanoanh13@gmail.com', address: 'Số 72 Phố Cổ Loa, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_14', name: 'Huỳnh Thị Phương', age: 30, gender: 'Nữ', phone: '0912345683', email: 'huynhthiphuong14@gmail.com', address: 'Số 85 Đường Hoàng Văn Thụ, Cần Thơ', status: 'Đang điều trị', role: 'patients' },
  { _id: 'dp_15', name: 'Kiều Minh Quân', age: 40, gender: 'Nam', phone: '0912345684', email: 'kieuminhquan15@gmail.com', address: 'Số 29 Phố Kim Mã, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_16', name: 'Hà Thị Rúa', age: 27, gender: 'Nữ', phone: '0912345685', email: 'hathirua16@gmail.com', address: 'Số 56 Đường Lê Lợi, Hải Phòng', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_17', name: 'Trương Văn Sơn', age: 52, gender: 'Nam', phone: '0912345686', email: 'truongvanson17@gmail.com', address: 'Số 91 Phố Hàng Bông, Hà Nội', status: 'Tạm dừng', role: 'patients' },
  { _id: 'dp_18', name: 'Quách Thị Tâm', age: 34, gender: 'Nữ', phone: '0912345687', email: 'quachthitam18@gmail.com', address: 'Số 63 Đường Pasteur, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_19', name: 'Đỗ Hữu Uyên', age: 46, gender: 'Nam', phone: '0912345688', email: 'dohuuuyen19@gmail.com', address: 'Số 37 Phố Bà Triệu, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_20', name: 'Tô Thị Vân', age: 29, gender: 'Nữ', phone: '0912345689', email: 'tothivan20@gmail.com', address: 'Số 74 Đường Võ Văn Kiệt, Biên Hòa', status: 'Đang điều trị', role: 'patients' },
  { _id: 'dp_21', name: 'Nguyễn Minh Anh', age: 38, gender: 'Nam', phone: '0912345690', email: 'nguyenminhanh21@gmail.com', address: 'Số 22 Phố Nguyễn Huệ, Hà Nội', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_22', name: 'Trần Thị Bích', age: 43, gender: 'Nữ', phone: '0912345691', email: 'tranthbich22@gmail.com', address: 'Số 51 Đường Trần Hưng Đạo, Nha Trang', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_23', name: 'Phạm Quốc Cương', age: 49, gender: 'Nam', phone: '0912345692', email: 'phamquoccuong23@gmail.com', address: 'Số 68 Phố Cổ Loa, Hà Nội', status: 'Tạm dừng', role: 'patients' },
  { _id: 'dp_24', name: 'Hoàng Hương Duyên', age: 31, gender: 'Nữ', phone: '0912345693', email: 'hoanghuongduyen24@gmail.com', address: 'Số 80 Đường Hoàng Văn Thụ, Huế', status: 'Hoạt động', role: 'patients' },
  { _id: 'dp_25', name: 'Vũ Thanh Anh', age: 54, gender: 'Nam', phone: '0912345694', email: 'vuthanhanh25@gmail.com', address: 'Số 47 Phố Kim Mã, Hà Nội', status: 'Hoạt động', role: 'patients' }
];

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // Sử dụng dữ liệu fake cứng
      setPatients(FAKE_DOCTOR_PATIENTS);
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Fallback vẫn dùng dữ liệu fake
      setPatients(FAKE_DOCTOR_PATIENTS);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInfo = (id) => navigate(`/doctor/patient/${id}`);
  const handleCreateRecord = (id) => toast.info(`Tạo hồ sơ bệnh lý cho bệnh nhân ${id}`);
  const handleCancelReception = (id) => toast.info(`Hủy tiếp nhận bệnh nhân ${id}`);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Danh sách bệnh nhân</h1>
        <p className="text-gray-500 mb-6">Quản lý và theo dõi thông tin bệnh nhân một cách đơn giản, trực quan.</p>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm bệnh nhân theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">STT</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên Bệnh Nhân</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Số điện thoại</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Địa chỉ</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      <UserCircle2 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      Không có bệnh nhân nào
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <tr key={patient._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{patient.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.address || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-center">
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => handleViewInfo(patient._id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition text-xs font-semibold">
                            <Eye className="w-4 h-4" /> Xem
                          </button>
                          <button onClick={() => handleCreateRecord(patient._id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition text-xs font-semibold">
                            <FilePlus className="w-4 h-4" /> Hồ sơ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <p className="text-sm text-gray-600">
            Tổng cộng: <span className="font-semibold">{filteredPatients.length}</span> bệnh nhân
          </p>
        </div>
      </div>
    </div>
  );
};

export default Patients;
