import React, { useState, useEffect } from 'react';
import { Clock, Search, Calendar, MapPin, Users, CheckCircle } from 'lucide-react';

// Dữ liệu fake schedules cứng
const FAKE_SCHEDULES = [
  {
    _id: 'sch_1',
    date: '2026-01-19',
    dayOfWeek: 'Thứ Hai',
    shifts: [
      { 
        shiftName: 'Ca Sáng', 
        startTime: '08:00', 
        endTime: '12:00', 
        room: 'Phòng 2A', 
        maxPatients: 20, 
        currentPatients: 12 
      },
      { 
        shiftName: 'Ca Chiều', 
        startTime: '14:00', 
        endTime: '18:00', 
        room: 'Phòng 2B', 
        maxPatients: 20, 
        currentPatients: 8 
      }
    ]
  },
  {
    _id: 'sch_2',
    date: '2026-01-20',
    dayOfWeek: 'Thứ Ba',
    shifts: [
      { 
        shiftName: 'Ca Sáng', 
        startTime: '08:00', 
        endTime: '12:00', 
        room: 'Phòng 2A', 
        maxPatients: 20, 
        currentPatients: 15 
      },
      { 
        shiftName: 'Ca Chiều', 
        startTime: '14:00', 
        endTime: '18:00', 
        room: 'Phòng 2B', 
        maxPatients: 20, 
        currentPatients: 10 
      }
    ]
  },
  {
    _id: 'sch_3',
    date: '2026-01-21',
    dayOfWeek: 'Thứ Tư',
    shifts: [
      { 
        shiftName: 'Ca Sáng', 
        startTime: '08:00', 
        endTime: '12:00', 
        room: 'Phòng 2A', 
        maxPatients: 20, 
        currentPatients: 18 
      },
      { 
        shiftName: 'Ca Chiều', 
        startTime: '14:00', 
        endTime: '18:00', 
        room: 'Phòng 2B', 
        maxPatients: 20, 
        currentPatients: 11 
      }
    ]
  },
  {
    _id: 'sch_4',
    date: '2026-01-22',
    dayOfWeek: 'Thứ Năm',
    shifts: [
      { 
        shiftName: 'Ca Sáng', 
        startTime: '08:00', 
        endTime: '12:00', 
        room: 'Phòng 2A', 
        maxPatients: 20, 
        currentPatients: 14 
      },
      { 
        shiftName: 'Ca Chiều', 
        startTime: '14:00', 
        endTime: '18:00', 
        room: 'Phòng 2B', 
        maxPatients: 20, 
        currentPatients: 9 
      }
    ]
  },
  {
    _id: 'sch_5',
    date: '2026-01-23',
    dayOfWeek: 'Thứ Sáu',
    shifts: [
      { 
        shiftName: 'Ca Sáng', 
        startTime: '08:00', 
        endTime: '12:00', 
        room: 'Phòng 2A', 
        maxPatients: 20, 
        currentPatients: 16 
      },
      { 
        shiftName: 'Ca Chiều', 
        startTime: '14:00', 
        endTime: '18:00', 
        room: 'Phòng 2B', 
        maxPatients: 20, 
        currentPatients: 7 
      }
    ]
  }
];

const DoctorSchedules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Load dữ liệu fake
    setSchedules(FAKE_SCHEDULES);
  }, []);

  const filteredSchedules = schedules.filter(schedule =>
    new Date(schedule.date).toLocaleDateString('vi-VN').toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.dayOfWeek.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getOccupancyPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const getOccupancyColor = (percentage) => {
    if (percentage < 50) return 'text-green-600';
    if (percentage < 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Lịch Làm Việc của Tôi</h1>
            <p className="text-gray-600 mt-1">Xem lịch ca trực và lịch khám hàng tuần</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo ngày hoặc thứ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 shadow-md text-lg"
          />
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="space-y-6">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <div
              key={schedule._id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Date Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    <div>
                      <p className="text-2xl font-bold">{formatDate(schedule.date)}</p>
                      <p className="text-blue-100 text-sm">{schedule.dayOfWeek}</p>
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-100" />
                </div>
              </div>

              {/* Shifts */}
              <div className="p-6 space-y-4">
                {schedule.shifts.map((shift, index) => {
                  const occupancyPercentage = getOccupancyPercentage(shift.currentPatients, shift.maxPatients);
                  const occupancyColor = getOccupancyColor(occupancyPercentage);

                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{shift.shiftName}</h3>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold">
                              {shift.startTime} - {shift.endTime}
                            </span>
                          </div>
                        </div>
                        <div className="bg-blue-100 px-4 py-2 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{occupancyPercentage}%</p>
                          <p className="text-xs text-blue-700 font-semibold">Lấp đầy</p>
                        </div>
                      </div>

                      {/* Room and Capacity */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-orange-500" />
                            <span className="text-sm text-gray-600 font-semibold">Phòng khám</span>
                          </div>
                          <p className="text-xl font-bold text-gray-900">{shift.room}</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-gray-600 font-semibold">Bệnh nhân</span>
                          </div>
                          <p className={`text-xl font-bold ${occupancyColor}`}>
                            {shift.currentPatients}/{shift.maxPatients}
                          </p>
                        </div>
                      </div>

                      {/* Occupancy Bar */}
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              occupancyPercentage < 50
                                ? 'bg-green-500'
                                : occupancyPercentage < 75
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${occupancyPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-semibold">Không tìm thấy lịch làm việc</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedules;
