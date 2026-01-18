import React, { useEffect, useState } from 'react';
import { Calendar, Search, Edit2, Trash2, Plus, Clock } from 'lucide-react';
import { appointmentAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientInfo: { name: '', age: '', phone: '', gender: 'Nam' },
    doctorInfo: { name: '' },
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    status: 'pending'
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchPatientsAndDoctors();
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

  const fetchPatientsAndDoctors = async () => {
    try {
      // Fetch patients từ patients collection
      const patientsRes = await fetch('http://localhost:3001/api/patients');
      const patientsData = await patientsRes.json();
      setPatients(patientsData?.data || patientsData || []);

      // Fetch doctors
      const doctorsRes = await fetch('http://localhost:3001/api/doctors');
      const doctorsData = await doctorsRes.json();
      setDoctors(doctorsData?.data || doctorsData || []);
    } catch (error) {
      console.error('Error fetching patients/doctors:', error);
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
      cancelled: 'bg-red-100 text-red-800',
      no_show: 'bg-orange-100 text-orange-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      completed: 'Hoàn thành',
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      cancelled: 'Hủy',
      no_show: 'Không đến'
    };
    return texts[status] || status;
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      patientInfo: { name: '', age: '', phone: '', gender: 'Nam' },
      doctorInfo: { name: '' },
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
      status: 'pending'
    });
    setShowModal(true);
  };

  const openEditModal = (apt) => {
    setEditingId(apt._id);
    setFormData({
      patientInfo: apt.patientInfo,
      doctorInfo: apt.doctorInfo,
      appointmentDate: apt.appointmentDate?.split('T')[0] || '',
      appointmentTime: apt.appointmentTime || '',
      reason: apt.reason || '',
      status: apt.status || 'pending'
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      const appointmentData = {
        ...formData,
        appointmentDate: new Date(formData.appointmentDate).toISOString()
      };

      if (editingId) {
        // Update
        await fetch(`http://localhost:3001/api/appointments/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(appointmentData)
        });
        toast.success('Cập nhật cuộc hẹn thành công');
      } else {
        // Create
        await fetch('http://localhost:3001/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(appointmentData)
        });
        toast.success('Tạo cuộc hẹn thành công');
      }

      setShowModal(false);
      fetchAppointments();
    } catch (error) {
      toast.error(editingId ? 'Không thể cập nhật cuộc hẹn' : 'Không thể tạo cuộc hẹn');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-transparent flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-orange-600" />
          Quản Lý Cuộc Hẹn
        </h2>
        <button 
          onClick={openCreateModal}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition"
        >
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
            {['all', 'pending', 'confirmed', 'completed', 'cancelled', 'no_show'].map(status => (
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
                 status === 'cancelled' ? 'Hủy' :
                 'Không đến'}
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
                        <button 
                          onClick={() => openEditModal(apt)}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition"
                        >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? 'Sửa Cuộc Hẹn' : 'Tạo Cuộc Hẹn Mới'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Tên bệnh nhân"
                  value={formData.patientInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    patientInfo: { ...formData.patientInfo, name: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="number"
                  placeholder="Tuổi"
                  value={formData.patientInfo.age}
                  onChange={(e) => setFormData({
                    ...formData,
                    patientInfo: { ...formData.patientInfo, age: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="tel"
                  placeholder="SĐT bệnh nhân"
                  value={formData.patientInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    patientInfo: { ...formData.patientInfo, phone: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                  value={formData.patientInfo.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    patientInfo: { ...formData.patientInfo, gender: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Tên bác sĩ"
                  value={formData.doctorInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    doctorInfo: { ...formData.doctorInfo, name: e.target.value }
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({
                    ...formData,
                    appointmentDate: e.target.value
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <input
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({
                    ...formData,
                    appointmentTime: e.target.value
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.value
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Hủy</option>
                  <option value="no_show">Không đến</option>
                </select>
              </div>

              <textarea
                placeholder="Lý do khám"
                value={formData.reason}
                onChange={(e) => setFormData({
                  ...formData,
                  reason: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="5"
              />
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                {editingId ? 'Cập Nhật' : 'Tạo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
