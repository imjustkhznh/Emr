import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, AlertCircle, Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

// Danh sách 25 bệnh nhân (giống như ở doctor/patients)
const FAKE_DOCTOR_PATIENTS = [
  { _id: 'dp_1', name: 'Nguyễn Văn An', gender: 'Nam' },
  { _id: 'dp_2', name: 'Trần Thị Bình', gender: 'Nữ' },
  { _id: 'dp_3', name: 'Phạm Minh Châu', gender: 'Nam' },
  { _id: 'dp_4', name: 'Hoàng Thị Dung', gender: 'Nữ' },
  { _id: 'dp_5', name: 'Vũ Quốc Gia', gender: 'Nam' },
  { _id: 'dp_6', name: 'Đặng Ngọc Hạnh', gender: 'Nữ' },
  { _id: 'dp_7', name: 'Bùi Văn Hoàn', gender: 'Nam' },
  { _id: 'dp_8', name: 'Dương Thị Linh', gender: 'Nữ' },
  { _id: 'dp_9', name: 'Cao Minh Khánh', gender: 'Nam' },
  { _id: 'dp_10', name: 'Lê Thị Linh', gender: 'Nữ' },
  { _id: 'dp_11', name: 'Võ Hữu Minh', gender: 'Nam' },
  { _id: 'dp_12', name: 'Phan Thị Nhuận', gender: 'Nữ' },
  { _id: 'dp_13', name: 'Lý Văn Oanh', gender: 'Nam' },
  { _id: 'dp_14', name: 'Huỳnh Thị Phương', gender: 'Nữ' },
  { _id: 'dp_15', name: 'Kiều Minh Quân', gender: 'Nam' },
  { _id: 'dp_16', name: 'Hà Thị Rúa', gender: 'Nữ' },
  { _id: 'dp_17', name: 'Trương Văn Sơn', gender: 'Nam' },
  { _id: 'dp_18', name: 'Quách Thị Tâm', gender: 'Nữ' },
  { _id: 'dp_19', name: 'Đỗ Hữu Uyên', gender: 'Nam' },
  { _id: 'dp_20', name: 'Tô Thị Vân', gender: 'Nữ' },
  { _id: 'dp_21', name: 'Nguyễn Minh Anh', gender: 'Nam' },
  { _id: 'dp_22', name: 'Trần Thị Bích', gender: 'Nữ' },
  { _id: 'dp_23', name: 'Phạm Quốc Cương', gender: 'Nam' },
  { _id: 'dp_24', name: 'Hoàng Hương Duyên', gender: 'Nữ' },
  { _id: 'dp_25', name: 'Vũ Thanh Anh', gender: 'Nam' }
];

// Tạo fake appointments từ danh sách bệnh nhân
const createFakeAppointments = (doctorName) => {
  const reasons = ['Khám tổng quát', 'Kiểm tra cảm cúm', 'Quản lý tiểu đường', 'Kiểm tra viêm phế quản', 'Theo dõi tim mạch', 'Điều trị dị ứng', 'Kiểm tra mỡ máu', 'Điều trị loãng xương', 'Kiểm tra dạ dày', 'Vật lý trị liệu'];
  const statuses = ['confirmed', 'pending', 'completed', 'cancelled'];
  const times = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  
  return FAKE_DOCTOR_PATIENTS.map((patient, idx) => {
    const dayOffset = Math.floor(idx / 3);
    const date = new Date(2025, 0, 22 + dayOffset);
    const dateStr = date.toISOString().split('T')[0];
    const timeIdx = idx % times.length;
    
    return {
      _id: `apt_${idx + 1}`,
      patientInfo: { name: patient.name, gender: patient.gender },
      appointmentDate: dateStr,
      appointmentTime: times[timeIdx],
      reason: reasons[idx % reasons.length],
      status: statuses[idx % 4],
      doctorInfo: { name: doctorName },
      createdAt: new Date(2025, 0, 20 + Math.floor(idx / 8)).toISOString()
    };
  });
};

const Appointments = () => {
  // Lấy tên bác sĩ từ localStorage
  const currentUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser')) || {};
  const doctorName = currentUser.name || 'Bác sĩ';
  
  const [appointments, setAppointments] = useState(createFakeAppointments(doctorName));
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patientName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const pageSize = 10;
  const totalPages = Math.ceil(appointments.length / pageSize);
  const paginatedAppointments = appointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment._id);
    setForm({
      patientName: appointment.patientInfo?.name || '',
      appointmentDate: appointment.appointmentDate?.split('T')[0] || '',
      appointmentTime: appointment.appointmentTime || '',
      reason: appointment.reason || ''
    });
    setShowForm(true);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
      setAppointments(appointments.filter(a => a._id !== appointmentId));
      toast.success('Xóa lịch hẹn thành công');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    
    if (!form.patientName) {
      setError('Vui lòng nhập tên bệnh nhân.');
      return;
    }
    
    if (editingId) {
      // Update appointment
      setAppointments(appointments.map(a => 
        a._id === editingId 
          ? {
              ...a,
              patientInfo: { ...a.patientInfo, name: form.patientName },
              appointmentDate: form.appointmentDate,
              appointmentTime: form.appointmentTime,
              reason: form.reason
            }
          : a
      ));
      setShowForm(false);
      setEditingId(null);
      setForm({ patientName: '', appointmentDate: '', appointmentTime: '', reason: '' });
      toast.success('Cập nhật lịch hẹn thành công');
    } else {
      // Create new appointment
      const newAppointment = {
        _id: `apt_${Date.now()}`,
        patientInfo: { name: form.patientName, gender: 'Nam' },
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        reason: form.reason,
        status: 'pending',
        doctorInfo: { name: doctorName },
        createdAt: new Date().toISOString()
      };
      setAppointments([newAppointment, ...appointments]);
      setShowForm(false);
      setForm({ patientName: '', appointmentDate: '', appointmentTime: '', reason: '' });
      toast.success('Tạo lịch hẹn thành công');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Quản lý lịch hẹn</h1>
            <p className="text-gray-500 mt-1">Xem và tạo lịch hẹn khám bệnh cho bệnh nhân</p>
          </div>
          <button onClick={() => {
            setEditingId(null);
            setForm({ patientId: '', appointmentDate: '', appointmentTime: '', reason: '' });
            setShowForm(!showForm);
          }} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            <Plus className="w-5 h-5" /> {showForm ? 'Đóng' : 'Tạo lịch hẹn'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{editingId ? 'Cập nhật lịch hẹn' : 'Tạo lịch hẹn mới'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên bệnh nhân</label>
                <input 
                  name="patientName" 
                  type="text" 
                  value={form.patientName} 
                  onChange={handleChange}
                  placeholder="Nhập tên bệnh nhân"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày khám</label>
                <input 
                  name="appointmentDate" 
                  type="date" 
                  value={form.appointmentDate} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giờ khám</label>
                <input 
                  name="appointmentTime" 
                  type="time" 
                  value={form.appointmentTime} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lý do khám</label>
                <input 
                  name="reason" 
                  value={form.reason} 
                  onChange={handleChange} 
                  placeholder="VD: Khám tổng quát" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              {error && (
                <div className="md:col-span-2 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  {editingId ? 'Cập nhật' : 'Lưu'} lịch hẹn
                </button>
                <button type="button" onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({ patientName: '', appointmentDate: '', appointmentTime: '', reason: '' });
                }} className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-blue-500 text-lg font-semibold animate-pulse">Đang tải dữ liệu...</span>
          </div>
        ) : (
          <>
            {paginatedAppointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Không có lịch hẹn nào</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {paginatedAppointments.map((a, idx) => {
                  const dateStr = a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString('vi-VN') : '';
                  const statusLabels = { 'pending': 'Chờ xử lý', 'confirmed': 'Xác nhận', 'completed': 'Hoàn tất', 'cancelled': 'Huỷ', 'in_progress': 'Đang khám' };
                  const statusColors = {
                    'pending': 'bg-yellow-50 border-l-4 border-yellow-400',
                    'confirmed': 'bg-blue-50 border-l-4 border-blue-400',
                    'completed': 'bg-green-50 border-l-4 border-green-400',
                    'cancelled': 'bg-red-50 border-l-4 border-red-400',
                    'in_progress': 'bg-purple-50 border-l-4 border-purple-400'
                  };
                  const statusBadgeColors = {
                    'pending': 'bg-yellow-100 text-yellow-800',
                    'confirmed': 'bg-blue-100 text-blue-800',
                    'completed': 'bg-green-100 text-green-800',
                    'cancelled': 'bg-red-100 text-red-800',
                    'in_progress': 'bg-purple-100 text-purple-800'
                  };
                  
                  return (
                    <div key={a._id || idx} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ${statusColors[a.status] || 'border-l-4 border-gray-400'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                        {/* STT & Tên bệnh nhân */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">STT #{(currentPage - 1) * pageSize + idx + 1}</p>
                          <p className="text-lg font-bold text-gray-900">{a.patientInfo?.name || 'N/A'}</p>
                          <p className="text-sm text-gray-600 mt-1">{a.patientInfo?.gender || '-'}</p>
                        </div>

                        {/* Ngày & Giờ */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Lịch khám</p>
                          <p className="text-base font-semibold text-gray-900">{dateStr}</p>
                          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {a.appointmentTime}
                          </div>
                        </div>

                        {/* Lý do khám */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Lý do khám</p>
                          <p className="text-sm font-medium text-gray-900">{a.reason}</p>
                        </div>

                        {/* Trạng thái */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Trạng thái</p>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColors[a.status] || 'bg-gray-100 text-gray-800'}`}>
                            {statusLabels[a.status] || a.status}
                          </span>
                        </div>

                        {/* Thao tác */}
                        <div className="flex gap-2 justify-end md:flex-col md:items-end">
                          <button onClick={() => handleEdit(a)} className="inline-flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                            <Edit2 className="w-4 h-4" /> Sửa
                          </button>
                          <button onClick={() => handleDelete(a._id)} className="inline-flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium">
                            <Trash2 className="w-4 h-4" /> Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600">
                  Hiển thị <span className="font-semibold">{Math.min((currentPage - 1) * pageSize + 1, appointments.length)}</span> - <span className="font-semibold">{Math.min(currentPage * pageSize, appointments.length)}</span> trên <span className="font-semibold">{appointments.length}</span> lịch hẹn
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                              : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Appointments;
