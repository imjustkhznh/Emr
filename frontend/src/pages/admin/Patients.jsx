import React, { useEffect, useState } from 'react';
import { Users, Search, Edit2, Trash2, Plus } from 'lucide-react';
import { patientsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientsAPI.getPatients();
      const data = response?.data || response?.patients || [];
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Không thể tải danh sách bệnh nhân');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  );

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
                {filteredPatients.map((patient) => (
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
      </div>
    </div>
  );
};

export default AdminPatients;
