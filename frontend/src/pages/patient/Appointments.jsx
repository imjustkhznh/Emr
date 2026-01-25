import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, MapPin, Phone, Search, Plus, Edit2, Trash2, CheckCircle, Clock3, X, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [showDoctorSchedule, setShowDoctorSchedule] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [editFormData, setEditFormData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  // Danh sách bác sĩ với lịch làm việc
  const DOCTORS_LIST = [
    {
      id: 1,
      name: 'Dr. Trần Hữu Bình',
      specialty: 'Tim mạch',
      phone: '0912-345-678',
      location: 'Phòng 301',
      schedule: [
        { day: 'Monday', times: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
        { day: 'Tuesday', times: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
        { day: 'Wednesday', times: ['08:00', '09:00', '14:00', '15:00'] },
        { day: 'Thursday', times: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
        { day: 'Friday', times: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
      ],
      availableSlots: 7
    },
    {
      id: 2,
      name: 'Dr. Đặng Ngọc Hiểu',
      specialty: 'Tiêu hóa',
      phone: '0903-456-789',
      location: 'Phòng 205',
      schedule: [
        { day: 'Monday', times: ['09:00', '10:00', '11:00', '14:00'] },
        { day: 'Tuesday', times: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
        { day: 'Wednesday', times: ['09:00', '10:00', '11:00', '14:00'] },
        { day: 'Thursday', times: ['09:00', '14:00', '15:00'] },
        { day: 'Friday', times: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      ],
      availableSlots: 5
    },
    {
      id: 3,
      name: 'Dr. Phạm Mạnh Dũng',
      specialty: 'Ngoại khoa',
      phone: '0934-567-890',
      location: 'Phòng 401',
      schedule: [
        { day: 'Monday', times: ['07:00', '08:00', '09:00', '13:00', '14:00'] },
        { day: 'Tuesday', times: ['07:00', '08:00', '13:00', '14:00', '15:00'] },
        { day: 'Wednesday', times: ['07:00', '08:00', '09:00', '13:00', '14:00'] },
        { day: 'Thursday', times: ['07:00', '08:00', '09:00', '13:00', '14:00'] },
        { day: 'Friday', times: ['07:00', '08:00', '13:00', '14:00'] },
      ],
      availableSlots: 6
    },
    {
      id: 4,
      name: 'Dr. Lý Văn Chung',
      specialty: 'Hô hấp',
      phone: '0945-678-901',
      location: 'Phòng 302',
      schedule: [
        { day: 'Monday', times: ['10:00', '11:00', '15:00', '16:00'] },
        { day: 'Tuesday', times: ['10:00', '11:00', '15:00'] },
        { day: 'Wednesday', times: ['10:00', '11:00', '15:00', '16:00'] },
        { day: 'Thursday', times: ['10:00', '15:00', '16:00'] },
        { day: 'Friday', times: ['10:00', '11:00', '15:00', '16:00'] },
      ],
      availableSlots: 4
    },
    {
      id: 5,
      name: 'Dr. Bùi Hồng Anh',
      specialty: 'Nha khoa',
      phone: '0956-789-012',
      location: 'Phòng 501',
      schedule: [
        { day: 'Monday', times: ['08:00', '09:00', '14:00', '15:00', '16:00'] },
        { day: 'Tuesday', times: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
        { day: 'Wednesday', times: ['08:00', '14:00', '15:00', '16:00'] },
        { day: 'Thursday', times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'] },
        { day: 'Friday', times: ['08:00', '09:00', '14:00', '15:00'] },
      ],
      availableSlots: 8
    },
  ];

  const specialties = [...new Set(DOCTORS_LIST.map(d => d.specialty))];

  const [appointments, setAppointments] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', date: '2025-02-15', time: '09:00', location: 'Phòng 301', phone: '0912-345-678', status: 'confirmed', reason: 'Khám tim mạch' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', date: '2025-02-20', time: '14:00', location: 'Phòng 205', phone: '0903-456-789', status: 'pending', reason: 'Khám tiêu hóa' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', date: '2025-01-28', time: '10:30', location: 'Phòng 401', phone: '0934-567-890', status: 'completed', reason: 'Khám sau phẫu thuật' }
  ]);

  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const filteredAppointments = appointments.filter(apt =>
    apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = formData.specialty
    ? DOCTORS_LIST.filter(d => d.specialty === formData.specialty)
    : DOCTORS_LIST;

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    showToast('Đã xóa lịch khám thành công', 'success');
  };

  const startEditAppointment = (apt) => {
    setEditingId(apt.id);
    const doc = DOCTORS_LIST.find(d => d.name === apt.doctorName);
    setEditFormData({
      specialty: apt.specialty,
      doctor: doc?.id.toString() || '',
      date: apt.date,
      time: apt.time,
      reason: apt.reason
    });
    if (doc) setSelectedDoctor(doc);
  };

  const handleEditAppointment = () => {
    if (!editFormData.specialty || !editFormData.doctor || !editFormData.date || !editFormData.time || !editFormData.reason) {
      showToast('Vui lòng điền đủ thông tin', 'error');
      return;
    }

    const selectedDoc = DOCTORS_LIST.find(d => d.id === parseInt(editFormData.doctor));
    setAppointments(appointments.map(apt => 
      apt.id === editingId 
        ? {
            ...apt,
            doctorName: selectedDoc.name,
            specialty: selectedDoc.specialty,
            date: editFormData.date,
            time: editFormData.time,
            location: selectedDoc.location,
            phone: selectedDoc.phone,
            reason: editFormData.reason
          }
        : apt
    ));
    setEditingId(null);
    showToast('Cập nhật lịch khám thành công', 'success');
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

  const handleBooking = () => {
    if (!formData.specialty || !formData.doctor || !formData.date || !formData.time || !formData.reason) {
      showToast('Vui lòng điền đủ thông tin', 'error');
      return;
    }

    const selectedDoc = DOCTORS_LIST.find(d => d.id === parseInt(formData.doctor));
    const newAppointment = {
      id: appointments.length + 1,
      doctorName: selectedDoc.name,
      specialty: selectedDoc.specialty,
      date: formData.date,
      time: formData.time,
      location: selectedDoc.location,
      phone: selectedDoc.phone,
      status: 'pending',
      reason: formData.reason
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({ specialty: '', doctor: '', date: '', time: '', reason: '' });
    setShowBooking(false);
    showToast('Đặt lịch khám thành công! Chờ xác nhận từ bác sĩ', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 max-w-sm z-50 animate-in fade-in slide-in-from-top-5 duration-300 ${
          toast.type === 'success' 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
        } rounded-lg shadow-lg p-4`}>
          <div className="flex items-start gap-3">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-semibold ${toast.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                {toast.type === 'success' ? '✓ Thành công' : '⚠ Lỗi'}
              </p>
              <p className={`text-sm mt-1 ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className={`flex-shrink-0 ${toast.type === 'success' ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

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
                      <button 
                        onClick={() => startEditAppointment(apt)}
                        className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-sm flex items-center justify-center gap-1.5"
                      >
                        <Edit2 size={16} />
                        Chỉnh sửa
                      </button>
                      <button 
                        onClick={() => deleteAppointment(apt.id)} 
                        className="flex-1 bg-red-50 text-red-700 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm flex items-center justify-center gap-1.5"
                      >
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
            {bookingSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Đặt lịch khám thành công!</h4>
                  <p className="text-sm mt-1">Lịch khám của bạn đang chờ xác nhận từ bác sĩ.</p>
                </div>
              </div>
            )}

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
                    <select 
                      value={formData.specialty}
                      onChange={(e) => setFormData({...formData, specialty: e.target.value, doctor: ''})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Chọn chuyên khoa</option>
                      {specialties.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bác sĩ {formData.specialty && `(${filteredDoctors.length} bác sĩ)`}
                    </label>
                    <select 
                      value={formData.doctor}
                      onChange={(e) => {
                        setFormData({...formData, doctor: e.target.value});
                        const doctor = DOCTORS_LIST.find(d => d.id === parseInt(e.target.value));
                        setSelectedDoctor(doctor);
                      }}
                      disabled={!formData.specialty}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                    >
                      <option value="">Chọn bác sĩ</option>
                      {filteredDoctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.availableSlots} slot rảnh)
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedDoctor && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                      <div className="font-semibold text-blue-900 mb-2">Lịch làm việc tuần này:</div>
                      <div className="space-y-1">
                        {selectedDoctor.schedule.map((day, idx) => (
                          <div key={idx} className="flex justify-between text-blue-800">
                            <span className="font-medium">{day.day}:</span>
                            <span className="text-xs">{day.times.join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lý do khám</label>
                    <textarea 
                      placeholder="Mô tả tình trạng..." 
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    onClick={handleBooking}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-lg transition font-semibold text-sm mt-4"
                  >
                    Xác Nhận Đặt Lịch
                  </button>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {editingId && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Chỉnh Sửa Lịch Khám</h3>
                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa</label>
                      <select 
                        value={editFormData.specialty}
                        onChange={(e) => setEditFormData({...editFormData, specialty: e.target.value, doctor: ''})}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Chọn chuyên khoa</option>
                        {specialties.map(spec => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bác sĩ</label>
                      <select 
                        value={editFormData.doctor}
                        onChange={(e) => {
                          setEditFormData({...editFormData, doctor: e.target.value});
                          const doctor = DOCTORS_LIST.find(d => d.id === parseInt(e.target.value));
                          setSelectedDoctor(doctor);
                        }}
                        disabled={!editFormData.specialty}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                      >
                        <option value="">Chọn bác sĩ</option>
                        {(editFormData.specialty ? DOCTORS_LIST.filter(d => d.specialty === editFormData.specialty) : DOCTORS_LIST).map(doc => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                      <input 
                        type="date" 
                        value={editFormData.date}
                        onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
                      <input 
                        type="time" 
                        value={editFormData.time}
                        onChange={(e) => setEditFormData({...editFormData, time: e.target.value})}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lý do khám</label>
                      <textarea 
                        placeholder="Mô tả tình trạng..." 
                        value={editFormData.reason}
                        onChange={(e) => setEditFormData({...editFormData, reason: e.target.value})}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-16 resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg transition font-semibold text-sm"
                      >
                        Hủy
                      </button>
                      <button 
                        onClick={handleEditAppointment}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-lg transition font-semibold text-sm"
                      >
                        Cập Nhật
                      </button>
                    </div>
                  </div>
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

