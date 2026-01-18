import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { reportsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const StatCard = ({ icon: Icon, title, value, subtitle, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
      </div>
      <Icon className="h-12 w-12 opacity-50" />
    </div>
  </div>
);

const AdminReports = () => {
  const [reportData, setReportData] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoadingData(true);
        const data = await reportsAPI.getDoctorReports(timeRange);
        setReportData(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu báo cáo:', error);
        toast.error('Không thể lấy dữ liệu báo cáo');
      } finally {
        setLoadingData(false);
      }
    };

    fetchReports();
  }, [timeRange]);

  const getMonthName = (monthIndex) => {
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    return months[monthIndex] || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo Cáo & Thống Kê</h1>
          <p className="text-gray-600 mt-2">Giám sát hoạt động khám bệnh của toàn hệ thống</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="quarter">Quý này</option>
          <option value="year">Năm này</option>
        </select>
      </div>

      {loadingData ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      ) : reportData ? (
        <>
          {/* Thống kê chính */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              icon={Users}
              title="Tổng Số Bệnh Nhân"
              value={reportData.totalPatients}
              subtitle="Được quản lý"
              bgColor="bg-blue-500"
            />
            <StatCard
              icon={Calendar}
              title="Cuộc Hẹn Hoàn Thành"
              value={reportData.completedAppointments}
              subtitle="Tỉ lệ hoàn thành"
              bgColor="bg-green-500"
            />
            <StatCard
              icon={CheckCircle}
              title="Tỉ Lệ Hoàn Thành"
              value={`${Math.round(reportData.completionRate)}%`}
              subtitle="Trong kỳ"
              bgColor="bg-emerald-500"
            />
            <StatCard
              icon={AlertCircle}
              title="Cuộc Hẹn Chờ"
              value={reportData.pendingAppointments}
              subtitle="Cần xác nhận"
              bgColor="bg-yellow-500"
            />
            <StatCard
              icon={Users}
              title="Bệnh Nhân Mới"
              value={reportData.newPatientsThisMonth}
              subtitle="Tháng này"
              bgColor="bg-purple-500"
            />
            <StatCard
              icon={TrendingUp}
              title="Tỉ Lệ Tái Khám"
              value={`${Math.round(reportData.returningRate)}%`}
              subtitle="Bệnh nhân quay lại"
              bgColor="bg-indigo-500"
            />
          </div>

          {/* Biểu đồ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biểu đồ cuộc hẹn hàng tháng */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                Cuộc Hẹn Hàng Tháng
              </h2>
              <div className="space-y-4">
                {reportData.monthlyData && reportData.monthlyData.map((item, idx) => {
                  const percentage = (item.value / (item.max || 25)) * 100;
                  return (
                    <div key={`month-${idx}`} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-800 min-w-12">{item.month}</span>
                        <span className="text-sm font-bold text-blue-600">{item.value} cuộc</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-lg h-8 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-8 rounded-lg flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        >
                          {percentage > 15 && <span className="text-xs font-bold text-white">{Math.round(percentage)}%</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phân bố trạng thái */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Phân Bố Trạng Thái Cuộc Hẹn
              </h2>
              <div className="space-y-4">
                {reportData.statusDistribution && reportData.statusDistribution.map((item, idx) => (
                  <div key={`status-${idx}`}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{item.status}</span>
                      <span className="text-gray-600">{item.count} ({Math.round(item.percentage)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === 'Hoàn Thành' ? 'bg-green-500' :
                          item.status === 'Đang Chờ' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Thông Tin Chi Tiết</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-semibold">Thời Gian Khám Trung Bình</p>
                <p className="text-2xl font-bold text-blue-900 mt-2">{reportData.avgAppointmentTime || 30} phút</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-700 font-semibold">Đánh Giá Trung Bình</p>
                <p className="text-2xl font-bold text-purple-900 mt-2">{reportData.averageRating?.toFixed(1) || 'N/A'}/5</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-semibold">Thời Gian Báo Cáo</p>
                <p className="text-2xl font-bold text-green-900 mt-2">{timeRange === 'week' ? 'Tuần' : timeRange === 'month' ? 'Tháng' : timeRange === 'quarter' ? 'Quý' : 'Năm'}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          Không có dữ liệu báo cáo
        </div>
      )}
    </div>
  );
};

export default AdminReports;
