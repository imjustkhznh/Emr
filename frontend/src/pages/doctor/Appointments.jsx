import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
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

  // Lấy user hiện tại từ localStorage (bác sĩ đang đăng nhập)
  const currentUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser')) || {};
  const doctorProfileId = currentUser._id;

  const pageSize = 10;
  const totalPages = Math.ceil(appointments.length / pageSize);
  const paginatedAppointments = appointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    api.get('/appointments')
      .then(res => {
        setAppointments(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    
    if (!form.patientId) {
      setError('Vui lòng nhập ID bệnh nhân.');
      return;
    }
    
    if (!doctorProfileId) {
      setError('Lỗi: Không tìm thấy thông tin bác sĩ. Vui lòng đăng nhập lại.');
      return;
    }
    
    const appointmentData = {
      patientId: form.patientId,
      doctorProfileId: doctorProfileId,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      reason: form.reason
    };
    
    console.log('Sending appointment data:', appointmentData);
    
    api.post('/appointments', appointmentData)
      .then(res => {
        setAppointments([res.data.data, ...appointments]);
        setShowForm(false);
        setForm({ patientId: '', appointmentDate: '', appointmentTime: '', reason: '' });
        setError('');
      })
      .catch(err => {
        console.error('Appointment error:', err.response?.data || err.message);
        setError('Tạo lịch hẹn thất bại: ' + (err.response?.data?.error || err.message));
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Quản lý lịch hẹn</h2>
        <div className="flex justify-center mb-6">
          <button className="px-5 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Đóng' : 'Tạo lịch hẹn mới'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-3">
            <input name="patientId" type="text" value={form.patientId} onChange={handleChange} placeholder="ID bệnh nhân (copy từ danh sách bệnh nhân)" className="border p-2 rounded" required />
            <input name="appointmentDate" type="date" value={form.appointmentDate} onChange={handleChange} className="border p-2 rounded" required />
            <input name="appointmentTime" type="time" value={form.appointmentTime} onChange={handleChange} className="border p-2 rounded" required />
            <input name="reason" value={form.reason} onChange={handleChange} placeholder="Lý do khám" className="border p-2 rounded" required />
            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Lưu</button>
          </form>
        )}
        {loading ? (
          <div className="text-center py-8">Đang tải...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left sticky top-0">
                    <th className="border px-4 py-3">ID</th>
                    <th className="border px-4 py-3">Tên BN</th>
                    <th className="border px-4 py-3">Tuổi</th>
                    <th className="border px-4 py-3 min-w-16">Giới tính</th>
                    <th className="border px-4 py-3">Ngày</th>
                    <th className="border px-4 py-3">Giờ</th>
                    <th className="border px-4 py-3">Lý do</th>
                    <th className="border px-4 py-3">Trạng thái</th>
                    <th className="border px-4 py-3">Bác sĩ</th>
                    <th className="border px-4 py-3">Tạo lúc</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAppointments.map((a, idx) => {
                    const dateStr = a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString('vi-VN') : '';
                    const statusLabels = { 'pending': 'Chờ xử lý', 'confirmed': 'Xác nhận', 'completed': 'Hoàn tất', 'cancelled': 'Huỷ', 'in_progress': 'Đang khám' };
                    const paymentLabels = { 'unpaid': 'Chưa thanh toán', 'paid': 'Đã thanh toán', 'refunded': 'Hoàn tiền' };
                    const createdStr = a.createdAt ? new Date(a.createdAt).toLocaleString('vi-VN') : '';
                    return (
                      <tr key={a._id || idx} className="hover:bg-gray-50">
                        <td className="border px-4 py-3 text-gray-600 font-mono text-xs">{a._id?.substring(0, 8)}</td>
                        <td className="border px-4 py-3 font-medium">{a.patientInfo?.name || 'N/A'}</td>
                        <td className="border px-4 py-3 text-center">{a.patientInfo?.age || '-'}</td>
                        <td className="border px-4 py-3 text-center min-w-16">{a.patientInfo?.gender || '-'}</td>
                        <td className="border px-4 py-3">{dateStr}</td>
                        <td className="border px-4 py-3 text-center">{a.appointmentTime}</td>
                        <td className="border px-4 py-3">{a.reason}</td>
                        <td className="border px-4 py-3">
                          <span className={`px-2 py-1 rounded text-white text-sm ${
                            a.status === 'pending' ? 'bg-yellow-500' :
                            a.status === 'confirmed' ? 'bg-blue-500' :
                            a.status === 'completed' ? 'bg-green-500' :
                            a.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'
                          }`}>
                            {statusLabels[a.status] || a.status}
                          </span>
                        </td>
                        <td className="border px-4 py-3">{a.doctorInfo?.name || 'N/A'}</td>
                        <td className="border px-4 py-3 text-xs text-gray-600">{createdStr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border text-xs ${currentPage === 1 ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {'<'}
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-xs border ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border text-xs ${currentPage === totalPages ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {'>'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Appointments;
