import React, { useEffect, useState } from 'react';
import { appointmentAPI, userAPI } from '../../services/apiService';
import { ChevronLeft, ChevronRight, Plus, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const patientsSampleIds = [
  { id: '507f1f77bcf86cd799439001', name: 'Nguyễn Văn An' },
  { id: '507f1f77bcf86cd799439002', name: 'Trần Thị Bình' },
  { id: '507f1f77bcf86cd799439003', name: 'Lê Văn Cường' },
  { id: '507f1f77bcf86cd799439004', name: 'Phạm Thị Dung' },
  { id: '507f1f77bcf86cd799439005', name: 'Hoàng Minh Tuấn' }
];

const patientsList = [
  { id: 'BN001', name: 'Nguyễn Văn An', gender: 'Nam', phone: '0912345678' },
  { id: 'BN002', name: 'Trần Thị Bình', gender: 'Nữ', phone: '0987654321' },
  { id: 'BN003', name: 'Lê Văn Cường', gender: 'Nam', phone: '0909123123' },
  { id: 'BN004', name: 'Phạm Thị Dung', gender: 'Nữ', phone: '0911000001' },
  { id: 'BN005', name: 'Hoàng Minh Tuấn', gender: 'Nam', phone: '091000000' },
  { id: 'BN006', name: 'Vũ Thị Lan', gender: 'Nữ', phone: '091001234' },
  { id: 'BN007', name: 'Đặng Văn Hùng', gender: 'Nam', phone: '091002468' },
  { id: 'BN008', name: 'Bùi Thị Mai', gender: 'Nữ', phone: '091003702' },
  { id: 'BN009', name: 'Phan Văn Quang', gender: 'Nam', phone: '091004936' },
  { id: 'BN010', name: 'Đỗ Thị Hạnh', gender: 'Nữ', phone: '091006170' },
  { id: 'BN011', name: 'Ngô Văn Phúc', gender: 'Nam', phone: '091007404' },
  { id: 'BN012', name: 'Lý Thị Thu', gender: 'Nữ', phone: '091008638' },
  { id: 'BN013', name: 'Trịnh Văn Sơn', gender: 'Nam', phone: '091009872' },
  { id: 'BN014', name: 'Tạ Thị Kim', gender: 'Nữ', phone: '091011106' },
  { id: 'BN015', name: 'Phùng Văn Tài', gender: 'Nam', phone: '091012340' },
  { id: 'BN016', name: 'Lâm Thị Hoa', gender: 'Nữ', phone: '091013574' },
  { id: 'BN017', name: 'Vương Văn Khánh', gender: 'Nam', phone: '091014808' },
  { id: 'BN018', name: 'Châu Thị Yến', gender: 'Nữ', phone: '091016042' },
  { id: 'BN019', name: 'Kiều Văn Phong', gender: 'Nam', phone: '091017276' },
  { id: 'BN020', name: 'Lưu Thị Hương', gender: 'Nữ', phone: '091018510' }
];

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patientId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser')) || {};

  // Fetch appointments và patients từ MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointments
        const appointmentsRes = await appointmentAPI.getAll();
        console.log('📋 Appointments response:', appointmentsRes.data);
        if (appointmentsRes.data && appointmentsRes.data.data) {
          setAppointments(appointmentsRes.data.data);
          console.log('✅ Set appointments:', appointmentsRes.data.data);
        }

        // Fetch patients list
        const patientsRes = await userAPI.getAll();
        if (patientsRes.data && patientsRes.data.data) {
          setPatients(patientsRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Lỗi khi tải dữ liệu từ MongoDB');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const doctorProfileId = currentUser._id;

  const pageSize = 10;
  const totalPages = Math.ceil(appointments.length / pageSize);
  const paginatedAppointments = appointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment._id);
    setForm({
      patientId: appointment.patientId,
      appointmentDate: appointment.appointmentDate?.split('T')[0] || '',
      appointmentTime: appointment.appointmentTime || '',
      reason: appointment.reason || ''
    });
    setShowForm(true);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
      appointmentAPI.delete(appointmentId)
        .then(() => {
          setAppointments(appointments.filter(a => a._id !== appointmentId));
          toast.success('Xóa lịch hẹn thành công');
        })
        .catch(err => {
          const message = err.response?.data?.message || err.message;
          setError('Xóa lịch hẹn thất bại: ' + message);
          toast.error('Xóa lịch hẹn thất bại');
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    
    if (!form.patientId) {
      setError('Vui lòng chọn bệnh nhân.');
      return;
    }
    
    // Sử dụng một doctorProfileId mẫu nếu không có
    const doctorId = doctorProfileId || '507f1f77bcf86cd799438999';
    
    const appointmentData = {
      patientId: form.patientId,
      doctorProfileId: doctorId,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      reason: form.reason
    };
    
    console.log('Sending appointment data:', appointmentData);
    
    if (editingId) {
      // Update appointment
      appointmentAPI.update(editingId, appointmentData)
        .then(res => {
          setAppointments(appointments.map(a => a._id === editingId ? res.data.data : a));
          setShowForm(false);
          setEditingId(null);
          setForm({ patientId: '', appointmentDate: '', appointmentTime: '', reason: '' });
          setError('');
          toast.success('Cập nhật lịch hẹn thành công');
        })
        .catch(err => {
          const message = err.response?.data?.message || err.message;
          setError('Cập nhật lịch hẹn thất bại: ' + message);
          toast.error('Cập nhật lịch hẹn thất bại');
        });
    } else {
      // Create new appointment
      appointmentAPI.create(appointmentData)
        .then(res => {
          console.log('Appointment created:', res.data);
          setAppointments([res.data.data, ...appointments]);
          setShowForm(false);
          setForm({ patientId: '', appointmentDate: '', appointmentTime: '', reason: '' });
          setError('');
          toast.success('Tạo lịch hẹn thành công');
        })
        .catch(err => {
          console.error('Appointment error:', err.response?.data || err.message);
          const message = err.response?.data?.message || err.response?.data?.error || err.message;
          setError('Tạo lịch hẹn thất bại: ' + message);
          toast.error('Tạo lịch hẹn thất bại');
        });
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Bệnh nhân</label>
                <input 
                  name="patientId" 
                  type="text" 
                  value={form.patientId} 
                  onChange={handleChange}
                  placeholder="Chọn bệnh nhân"
                  list="patients-list"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
                <datalist id="patients-list">
                  {patients.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </datalist>
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
                  setForm({ patientId: '', appointmentDate: '', appointmentTime: '', reason: '' });
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
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-blue-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">STT</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên Bệnh Nhân</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Giới tính</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ngày</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Giờ</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Lý do</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bác sĩ</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tạo lúc</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedAppointments.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
                          Không có lịch hẹn nào
                        </td>
                      </tr>
                    ) : (
                      paginatedAppointments.map((a, idx) => {
                        const dateStr = a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString('vi-VN') : '';
                        const statusLabels = { 'pending': 'Chờ xử lý', 'confirmed': 'Xác nhận', 'completed': 'Hoàn tất', 'cancelled': 'Huỷ', 'in_progress': 'Đang khám' };
                        const createdStr = a.createdAt ? new Date(a.createdAt).toLocaleString('vi-VN') : '';
                        return (
                          <tr key={a._id || idx} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">{(currentPage - 1) * pageSize + idx + 1}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{a.patientInfo?.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{a.patientInfo?.gender || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{dateStr}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{a.appointmentTime}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{a.reason}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                a.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                a.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                a.status === 'completed' ? 'bg-green-100 text-green-800' :
                                a.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                a.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {statusLabels[a.status] || a.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{a.doctorInfo?.name || a.doctorProfileId?.name || 'N/A'}</td>
                            <td className="px-6 py-4 text-xs text-gray-600">{createdStr}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex gap-2 justify-center">
                                <button onClick={() => handleEdit(a)} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs">
                                  <Edit2 className="w-4 h-4" /> Sửa
                                </button>
                                <button onClick={() => handleDelete(a._id)} className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs">
                                  <Trash2 className="w-4 h-4" /> Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                  Hiển thị <span className="font-semibold">{Math.min((currentPage - 1) * pageSize + 1, appointments.length)}</span> - <span className="font-semibold">{Math.min(currentPage * pageSize, appointments.length)}</span> trên <span className="font-semibold">{appointments.length}</span> lịch hẹn
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
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
                    className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-4 h-4" />
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
