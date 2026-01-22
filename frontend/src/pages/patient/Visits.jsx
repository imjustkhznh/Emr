import React, { useState } from 'react';
import { History, MapPin, Calendar, Clock, User, Phone } from 'lucide-react';

const Visits = () => {
  const [visits] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', date: '2025-01-15', time: '09:00 AM', location: 'Phòng 301', duration: '30 phút', diagnosis: 'Huyết áp cao, cần theo dõi' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', date: '2025-01-08', time: '02:00 PM', location: 'Phòng 205', duration: '25 phút', diagnosis: 'Trào ngược dạ dày, kê đơn thuốc' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', date: '2024-12-20', time: '10:30 AM', location: 'Phòng 401', duration: '45 phút', diagnosis: 'Khám sau phẫu thuật, kết quả tốt' },
    { id: 4, doctorName: 'Dr. Lê Thanh Tùng', specialty: 'Hô hấp', date: '2024-12-10', time: '03:00 PM', location: 'Phòng 102', duration: '20 phút', diagnosis: 'Viêm phế quản, kê thuốc' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-6">
      <div className="mb-8 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Lịch Sử Khám Bệnh</h1>
        <p className="text-cyan-100">Xem chi tiết các lần khám bệnh trước đó</p>
      </div>

      <div className="grid gap-4">
        {visits.map((v) => (
          <div key={v.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-cyan-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                👨‍⚕️
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{v.doctorName}</h3>
                <p className="text-cyan-600 font-semibold">{v.specialty}</p>
              </div>
              <span className="text-sm font-semibold bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
                <History size={14} className="inline mr-1" />
                Hoàn thành
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Calendar size={16} className="text-cyan-500" />
                <div>
                  <p className="text-xs text-gray-600">Ngày khám</p>
                  <p className="font-semibold">{new Date(v.date).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Clock size={16} className="text-cyan-500" />
                <div>
                  <p className="text-xs text-gray-600">Thời gian</p>
                  <p className="font-semibold">{v.time} ({v.duration})</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg col-span-2">
                <MapPin size={16} className="text-cyan-500" />
                <div>
                  <p className="text-xs text-gray-600">Địa điểm</p>
                  <p className="font-semibold">{v.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-2 border-blue-300">
              <p className="text-sm font-semibold text-gray-700 mb-1">Chẩn đoán:</p>
              <p className="text-gray-700">{v.diagnosis}</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-cyan-100 text-cyan-700 py-2 rounded-lg hover:bg-cyan-200 transition font-semibold">Chi tiết</button>
              <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition font-semibold">Tải xuống</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visits;
