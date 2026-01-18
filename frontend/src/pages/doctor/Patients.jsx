import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, FilePlus, XCircle, UserCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Lỗi tải dữ liệu');
      
      const data = await response.json();
      // Filter only patients (role: 'patients')
      const patientsList = data.data.filter(user => user.role === 'patients');
      setPatients(patientsList);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Không thể tải danh sách bệnh nhân');
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
