import React, { useState, useEffect } from 'react';
import { Clock, Search, Filter, Edit, Calendar, MapPin, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const DoctorSchedules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/schedules/my-schedules', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success && data.data) {
        setSchedules(data.data);
      } else {
        console.log('No data received:', data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Lỗi khi tải lịch làm việc');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchedules = schedules.filter(schedule => 
    new Date(schedule.date).toLocaleDateString('vi-VN').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getShiftDisplay = (shifts) => {
    if (!shifts || shifts.length === 0) return { morning: 'Không', afternoon: 'Không' };
    
    const hasMorning = shifts.some(s => s.shiftName.includes('Sáng'));
    const hasAfternoon = shifts.some(s => s.shiftName.includes('Chiều'));
    
    return {
      morning: hasMorning ? 'Có' : 'Không',
      afternoon: hasAfternoon ? 'Có' : 'Không'
    };
  };

  const getShiftColor = (hasShift) => {
    return hasShift === 'Có' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700';
  };

  const getWeekDay = (dateString) => {
    const date = new Date(dateString);
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return days[date.getDay()];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-3 rounded-lg">
          <Clock className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Lịch Làm Việc của Tôi</h1>
          <p className="text-gray-600 mt-1">Xem lịch ca trực và lịch khám</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo ngày..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto text-orange-500" />
          </div>
        ) : filteredSchedules.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ngày</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Thứ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ca Sáng</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ca Chiều</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Phòng</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Ghi Chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => {
                  const shiftDisplay = getShiftDisplay(schedule.shifts);

                  return (
                    <tr key={schedule._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          <span className="font-semibold text-gray-900">
                            {new Date(schedule.date).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{getWeekDay(schedule.date)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getShiftColor(shiftDisplay.morning)}`}>
                          {shiftDisplay.morning}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getShiftColor(shiftDisplay.afternoon)}`}>
                          {shiftDisplay.afternoon}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          <span className="text-gray-900 font-semibold">
                            {schedule.shifts?.[0]?.room || '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-600 text-sm">{schedule.notes || '-'}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">Không có lịch làm việc</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedules;
