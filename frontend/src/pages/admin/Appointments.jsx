import React, { useEffect, useState } from 'react';
import { Calendar, Search, Edit2, Trash2, Plus, Clock } from 'lucide-react';
import { appointmentAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentAPI.getAppointments();
      const data = response?.data || response?.appointments || [];
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Không thể tải danh sách cuộc hẹn');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchSearch = 
      apt.patientInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa cuộc hẹn này?')) {
      try {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        await fetch(`http://localhost:3001/api/appointments/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setAppointments(appointments.filter(a => a._id !== id));
        toast.success('Xóa cuộc hẹn thành công');
      } catch (error) {
        toast.error('Không thể xóa cuộc hẹn');
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      completed: 'Hoàn thành',
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      cancelled: 'Hủy'
    };
    return texts[status] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-transparent flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-orange-600" />
          Quản Lý Cuộc Hẹn
        </h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition">
          <Plus className="h-5 w-5" />
          Tạo Cuộc Hẹn
        </button>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm cuộc hẹn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterStatus === status
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Tất cả' :
                 status === 'pending' ? 'Chờ xác nhận' :
                 status === 'confirmed' ? 'Đã xác nhận' :
                 status === 'completed' ? 'Hoàn thành' :
                 'Hủy'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Không có cuộc hẹn</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Bệnh Nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Bác Sĩ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ngày</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Giờ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Lý do</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trạng thái</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{apt.patientInfo?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.doctorInfo?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.appointmentTime || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.reason || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusBadge(apt.status)}`}>
                        {getStatusText(apt.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(apt._id)}
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

export default AdminAppointments;
