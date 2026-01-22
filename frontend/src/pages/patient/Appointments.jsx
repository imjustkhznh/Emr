import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, MapPin, Phone, Search, Plus, Edit2, Trash2, CheckCircle, Clock3, X } from 'lucide-react';

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', date: '2025-02-15', time: '09:00 AM', location: 'Phòng 301', phone: '0912-345-678', status: 'confirmed', reason: 'Khám tim mạch' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', date: '2025-02-20', time: '02:00 PM', location: 'Phòng 205', phone: '0903-456-789', status: 'pending', reason: 'Khám tiêu hóa' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', date: '2025-01-28', time: '10:30 AM', location: 'Phòng 401', phone: '0934-567-890', status: 'completed', reason: 'Khám sau phẫu thuật' }
  ]);

  const filteredAppointments = appointments.filter(apt =>
    apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-50 border-green-200 text-green-900';
      case 'pending': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'completed': return 'bg-gray-50 border-gray-200 text-gray-900';
      default: return 'bg-white';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Lịch Khám Của Tôi</h1>
        <p className="text-gray-600">Quản lý và theo dõi các cuộc hẹn khám bệnh</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointments List */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo bác sĩ..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <div key={apt.id} className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border-l-4 ${
                    apt.status === 'confirmed' ? 'border-l-green-500' : 
                    apt.status === 'pending' ? 'border-l-yellow-500' : 
                    'border-l-gray-500'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-800">{apt.doctorName}</h3>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusBadge(apt.status)}`}>
                            {apt.status === 'confirmed' ? '✓ Đã xác nhận' : apt.status === 'pending' ? '⏳ Chờ duyệt' : '✓ Hoàn thành'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{apt.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-blue-500 flex-shrink-0" />
                        <span>{new Date(apt.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-blue-500 flex-shrink-0" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-blue-500 flex-shrink-0" />
                        <span>{apt.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} className="text-blue-500 flex-shrink-0" />
                        <span>{apt.phone}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4"><strong>Lý do:</strong> {apt.reason}</p>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-sm flex items-center justify-center gap-1.5">
                        <Edit2 size={16} />
                        Chỉnh sửa
                      </button>
                      <button onClick={() => deleteAppointment(apt.id)} className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm flex items-center justify-center gap-1.5">
                        <Trash2 size={16} />
                        Xóa
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Không có lịch khám nào</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => setShowBooking(!showBooking)}
              className="w-full mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition font-semibold"
            >
              <Plus size={20} />
              Đặt Lịch Mới
            </button>

            {showBooking && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sticky top-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Tạo Lịch Khám</h3>
                  <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa</label>
                    <select className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>Chọn chuyên khoa</option>
                      <option>Tim Mạch</option>
                      <option>Tiêu Hóa</option>
                      <option>Ngoại Khoa</option>
                      <option>Hô Hấp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bác sĩ</label>
                    <select className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>Chọn bác sĩ</option>
                      <option>Dr. Trần Hữu Bình</option>
                      <option>Dr. Đặng Ngọc Hiểu</option>
                      <option>Dr. Phạm Mạnh Dũng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                    <input type="date" className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
                    <input type="time" className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lý do khám</label>
                    <textarea placeholder="Mô tả tình trạng..." className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20 resize-none"></textarea>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-lg transition font-semibold text-sm mt-4">
                    Xác Nhận Đặt Lịch
                  </button>
                </div>
              </div>
            )}

            {/* Stats Card */}
            {!showBooking && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4">Thống kê</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Đã xác nhận</span>
                    <span className="text-lg font-bold text-green-600">{appointments.filter(a => a.status === 'confirmed').length}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Đang chờ duyệt</span>
                    <span className="text-lg font-bold text-yellow-600">{appointments.filter(a => a.status === 'pending').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tổng cộng</span>
                    <span className="text-lg font-bold text-blue-600">{appointments.length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

