import React, { useEffect, useState } from 'react';
import { Download, Calendar, Clock, User, Search, Phone } from 'lucide-react';

const sampleStaffAppointments = [
  {
    id: '1',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    patientPhone: '0912345678',
    doctorName: 'BS. Trần Văn A',
    specialty: 'Nội khoa',
    appointmentDate: '2026-01-15',
    appointmentTime: '09:00',
    reason: 'Khám tổng quát',
    status: 'pending'
  },
  {
    id: '2',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    patientPhone: '0987654321',
    doctorName: 'BS. Nguyễn Thị B',
    specialty: 'Da liễu',
    appointmentDate: '2026-01-15',
    appointmentTime: '10:30',
    reason: 'Khám da',
    status: 'confirmed'
  },
  {
    id: '3',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    patientPhone: '0909123123',
    doctorName: 'BS. Lê Văn C',
    specialty: 'Tim mạch',
    appointmentDate: '2026-01-16',
    appointmentTime: '14:00',
    reason: 'Khám tim',
    status: 'confirmed'
  },
  {
    id: '4',
    patientId: 'BN004',
    patientName: 'Phạm Thị Dung',
    patientPhone: '0911000001',
    doctorName: 'BS. Trần Văn A',
    specialty: 'Nội khoa',
    appointmentDate: '2026-01-16',
    appointmentTime: '15:30',
    reason: 'Tái khám',
    status: 'pending'
  },
  {
    id: '5',
    patientId: 'BN005',
    patientName: 'Hoàng Minh Tuấn',
    patientPhone: '0910000000',
    doctorName: 'BS. Nguyễn Thị B',
    specialty: 'Da liễu',
    appointmentDate: '2026-01-17',
    appointmentTime: '11:00',
    reason: 'Khám da mặt',
    status: 'confirmed'
  },
];

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setAppointments(sampleStaffAppointments);
    setLoading(false);
  }, []);

  const handleDownload = (appointment) => {
    const content = `
====================================
        LỊCH HẸN
====================================

Bệnh nhân: ${appointment.patientName} (${appointment.patientId})
Số điện thoại: ${appointment.patientPhone}

Bác sĩ: ${appointment.doctorName}
Chuyên khoa: ${appointment.specialty}

Ngày hẹn: ${appointment.appointmentDate}
Giờ hẹn: ${appointment.appointmentTime}
Lý do khám: ${appointment.reason}
Trạng thái: ${appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}

====================================
Lưu ý:
- Vui lòng đến đúng giờ
- Mang theo CMND/CCCD và bảo hiểm y tế (nếu có)
- Nếu muốn hủy hoặc dời lịch, vui lòng liên hệ trước 24 giờ

====================================
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `lich_hen_${appointment.patientName}_${appointment.appointmentDate}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         a.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         a.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;

  return (
    <div className="p-4 sm:px-6 md:px-8 py-6 w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Danh sách lịch hẹn</h1>
          <p className="text-gray-600 mt-2">Xem và quản lý tất cả lịch hẹn khám bệnh</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bệnh nhân, mã BN hoặc bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Tổng lịch hẹn</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{appointments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Chờ xác nhận</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Đã xác nhận</p>
            <p className="text-2xl font-bold text-green-600 mt-2">{confirmedCount}</p>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-blue-500 text-lg font-semibold animate-pulse">Đang tải...</span>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Không tìm thấy lịch hẹn nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mã BN</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên Bệnh Nhân</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bác sĩ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ngày</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Giờ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Lý do</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">{appointment.patientId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{appointment.patientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{appointment.doctorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {appointment.appointmentDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {appointment.appointmentTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{appointment.reason}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status === 'confirmed' ? '✓ Đã xác nhận' : '⏳ Chờ xác nhận'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDownload(appointment)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                          title="Tải xuống"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAppointments;
