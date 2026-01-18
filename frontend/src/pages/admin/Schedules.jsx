import React, { useState, useEffect } from 'react';
import { Clock, Search, Filter, Edit, Plus, Calendar, MapPin, Users, Loader } from 'lucide-react';
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
      const response = await fetch('http://localhost:5000/api/schedules', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await response.json();
      if (data.success) {
        setSchedules(data.data);
      }
    } catch (error) {
      toast.error('Lỗi khi tải lịch làm việc');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.doctor?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.doctor?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-3 rounded-lg">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Lịch Làm Việc Bác Sĩ</h1>
            <p className="text-gray-600 mt-1">Quản lý lịch làm việc và ca trực</p>
          </div>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Thêm Lịch
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white">
            <Filter className="h-5 w-5 text-gray-400" />
            <select className="outline-none bg-white font-semibold text-gray-700 cursor-pointer">
              <option value="">Tất Cả Khoa</option>
              <option value="cardio">Tim Mạch</option>
              <option value="surgery">Ngoại</option>
              <option value="internal">Nội</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
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
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Bác Sĩ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ngày</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Thứ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ca Sáng</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ca Chiều</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          BS. {schedule.doctor?.firstName} {schedule.doctor?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{schedule.doctor?.specialty || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(schedule.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{schedule.dayOfWeek}</td>
                    <td className="px-6 py-4">
                      {schedule.shifts && schedule.shifts[0] ? (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                          {schedule.shifts[0].startTime} - {schedule.shifts[0].endTime}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Không có</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {schedule.shifts && schedule.shifts[1] ? (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          {schedule.shifts[1].startTime} - {schedule.shifts[1].endTime}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Không có</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Không có lịch làm việc nào
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedules;
