import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Calendar, CheckCircle, AlertCircle, 
  Activity, Clock, Star, Target, TrendingDown, Eye, Download, Filter
} from 'lucide-react';
import { reportsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const StatCard = ({ icon: Icon, title, value, subtitle, bgColor, trend, accentColor }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <p className={`text-3xl font-bold ${accentColor || 'text-gray-900'} mt-2`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
      </div>
      <div className={`${bgColor} p-4 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Báo Cáo & Thống Kê</h1>
          </div>
          <p className="text-gray-600 mt-2 ml-0 sm:ml-14">Giám sát hiệu suất hoạt động của toàn hệ thống theo thời gian thực</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md border border-gray-200">
            <Download className="h-5 w-5 text-gray-600" />
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer shadow-md"
          >
            <option value="week">📅 Tuần này</option>
            <option value="month">📅 Tháng này</option>
            <option value="quarter">📅 Quý này</option>
            <option value="year">📅 Năm này</option>
          </select>
        </div>
      </div>

      {loadingData ? (
        <div className="flex items-center justify-center h-80 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Đang tải dữ liệu báo cáo...</p>
          </div>
        </div>
      ) : reportData ? (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              title="Tổng Bệnh Nhân"
              value={reportData.totalPatients}
              subtitle="Được quản lý trong hệ thống"
              bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
              accentColor="text-blue-600"
            />
            <StatCard
              icon={Calendar}
              title="Cuộc Hẹn Hoàn Thành"
              value={reportData.completedAppointments}
              subtitle="Đã được xử lý"
              bgColor="bg-gradient-to-br from-green-500 to-green-600"
              accentColor="text-green-600"
              trend={8}
            />
            <StatCard
              icon={CheckCircle}
              title="Tỉ Lệ Hoàn Thành"
              value={`${Math.round(reportData.completionRate)}%`}
              subtitle="Trong kỳ báo cáo"
              bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
              accentColor="text-emerald-600"
            />
            <StatCard
              icon={AlertCircle}
              title="Chờ Xác Nhận"
              value={reportData.pendingAppointments}
              subtitle="Cần thao tác ngay"
              bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
              accentColor="text-amber-600"
            />
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              icon={Users}
              title="Bệnh Nhân Mới"
              value={reportData.newPatientsThisMonth}
              subtitle="Tháng này"
              bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
              accentColor="text-purple-600"
            />
            <StatCard
              icon={TrendingUp}
              title="Tái Khám"
              value={`${Math.round(reportData.returningRate)}%`}
              subtitle="Bệnh nhân quay lại"
              bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
              accentColor="text-indigo-600"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Appointments Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Cuộc Hẹn Hàng Tháng</h2>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Biểu Đồ</span>
              </div>
              <div className="space-y-2">
                {reportData.monthlyData && reportData.monthlyData.map((item, idx) => {
                  const value = item.value || 0;
                  const max = item.max || 30;
                  const percentage = Math.min((value / max) * 100, 100);
                  return (
                    <div key={`month-${idx}`} className="group cursor-pointer">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-lg min-w-10 text-center group-hover:bg-blue-100 transition-colors">{item.month}</span>
                          <span className="text-xs font-bold text-blue-600">{value} cuộc</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500 group-hover:from-blue-500 group-hover:to-blue-700"
                          style={{ width: `${Math.max(percentage, 2)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Phân Bố Trạng Thái</h2>
              </div>
              <div className="space-y-4">
                {reportData.statusDistribution && reportData.statusDistribution.map((item, idx) => (
                  <div key={`status-${idx}`} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'Hoàn Thành' ? 'bg-green-500' :
                          item.status === 'Đang Chờ' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-semibold text-gray-700">{item.status}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 group-hover:shadow-lg ${
                          item.status === 'Hoàn Thành' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                          item.status === 'Đang Chờ' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                          'bg-gradient-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">{Math.round(item.percentage)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">Không có dữ liệu báo cáo</p>
          <p className="text-gray-400 text-sm mt-2">Vui lòng thử lại hoặc chọn khoảng thời gian khác</p>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
