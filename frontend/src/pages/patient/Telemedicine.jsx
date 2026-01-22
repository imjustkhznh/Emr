import React, { useState } from 'react';
import { Video, Calendar, Clock, User, Phone, MapPin, Plus, Trash2 } from 'lucide-react';

const Telemedicine = () => {
  const [consultations, setConsultations] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', date: '2025-02-15', time: '10:00 AM', status: 'scheduled', link: 'https://meet.google.com/xyz123', reason: 'Tư vấn huyết áp cao' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', date: '2025-02-10', time: '02:00 PM', status: 'completed', duration: '30 phút', reason: 'Follow-up tiêu hóa' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', date: '2025-02-08', time: '03:30 PM', status: 'cancelled', reason: 'Tư vấn sau phẫu thuật' }
  ]);

  const deleteConsultation = (id) => {
    setConsultations(consultations.filter(c => c.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Sắp diễn ra';
      case 'completed':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="mb-8 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Tư Vấn Trực Tuyến</h1>
        <p className="text-teal-100">Khám bệnh trực tuyến với các bác sĩ</p>
      </div>

      {/* Book New Consultation */}
      <div className="mb-6 bg-white rounded-xl p-6 shadow-lg border-2 border-teal-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Plus size={24} className="text-teal-600" />
          Đặt Tư Vấn Trực Tuyến Mới
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Chọn chuyên khoa</option>
            <option>Tim Mạch</option>
            <option>Tiêu Hóa</option>
            <option>Ngoại Khoa</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Chọn bác sĩ</option>
            <option>Dr. Trần Hữu Bình</option>
            <option>Dr. Đặng Ngọc Hiểu</option>
            <option>Dr. Phạm Mạnh Dũng</option>
          </select>
          <input type="date" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="time" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <textarea placeholder="Mô tả tình trạng..." className="col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-20"></textarea>
        </div>
        <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-3 rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2">
          <Video size={20} /> Đặt Tư Vấn
        </button>
      </div>

      {/* Consultations List */}
      <div className="grid gap-4">
        {consultations.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-teal-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{c.doctorName}</h3>
                  <p className="text-teal-600 font-semibold">{c.specialty}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-xs font-bold border ${getStatusColor(c.status)}`}>
                {getStatusLabel(c.status)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Calendar size={16} className="text-teal-500" />
                <div>
                  <p className="text-xs text-gray-600">Ngày</p>
                  <p className="font-semibold">{new Date(c.date).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Clock size={16} className="text-teal-500" />
                <div>
                  <p className="text-xs text-gray-600">Giờ</p>
                  <p className="font-semibold">{c.time}</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4"><strong>Lý do:</strong> {c.reason}</p>

            <div className="flex gap-2">
              {c.status === 'scheduled' && (
                <>
                  <button className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-2 rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2">
                    <Video size={16} /> Vào phòng họp
                  </button>
                  <button onClick={() => deleteConsultation(c.id)} className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-1 font-semibold">
                    <Trash2 size={16} /> Hủy
                  </button>
                </>
              )}
              {c.status === 'completed' && (
                <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg font-semibold">
                  Xem lịch sử
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Telemedicine;
