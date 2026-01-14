import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
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

const Reports = () => {
  const { doctor, loading } = useOutletContext();
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

  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo Cáo & Thống Kê</h1>
          <p className="text-gray-600 mt-2">Giám sát hoạt động khám bệnh và tương tác bệnh nhân</p>
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
              title="Tổng Cuộc Hẹn"
              value={reportData.totalAppointments}
              subtitle="Tất cả thời gian"
              bgColor="bg-purple-500"
            />
            <StatCard
              icon={CheckCircle}
              title="Cuộc Hẹn Hoàn Thành"
              value={reportData.completedAppointments}
              subtitle={`${reportData.completionRate}% tỷ lệ hoàn thành`}
              bgColor="bg-green-500"
            />
            <StatCard
              icon={AlertCircle}
              title="Cuộc Hẹn Bị Hủy"
              value={reportData.cancelledAppointments}
              subtitle={`${reportData.cancellationRate}% tỷ lệ`}
              bgColor="bg-red-500"
            />
            <StatCard
              icon={TrendingUp}
              title="Cuộc Hẹn Tháng Này"
              value={reportData.appointmentsThisMonth}
              subtitle="Tháng hiện tại"
              bgColor="bg-indigo-500"
            />
            <StatCard
              icon={BarChart3}
              title="Đánh Giá Trung Bình"
              value={reportData.averageRating}
              subtitle="Từ bệnh nhân"
              bgColor="bg-orange-500"
            />
          </div>

          {/* Biểu đồ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Biểu đồ cuộc hẹn hàng tháng */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cuộc Hẹn Hàng Tháng</h2>
              <div className="space-y-4">
                {reportData.monthlyData.map((item, index) => (
                  <div key={`month-${index}`} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all"
                        style={{ width: `${(item.value / item.max) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm font-medium text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phân bố tình trạng */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Phân Bố Tình Trạng Cuộc Hẹn</h2>
              <div className="space-y-4">
                {reportData.statusDistribution.map((item, index) => (
                  <div key={`status-${index}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`${item.color} w-3 h-3 rounded-full`}></div>
                        <span className="text-sm font-medium text-gray-700">{item.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{item.count}</span>
                        <span className="text-xs text-gray-600">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${item.color} h-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thống kê chi tiết */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thống Kê Chi Tiết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-600">Cuộc hẹn chưa hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.pendingAppointments}</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm text-gray-600">Bệnh nhân mới tháng này</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.newPatientsThisMonth}</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm text-gray-600">Tỷ lệ bệnh nhân quay lại</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.returningRate}%</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-sm text-gray-600">Thời gian hẹn trung bình</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.avgAppointmentTime} phút</p>
              </div>
            </div>
          </div>

          {/* Ghi chú về quyền truy cập */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-900">
              <strong>Lưu ý:</strong> Trang báo cáo này chỉ dành cho bác sĩ (<strong>role: doctor</strong>) và admin. 
              Bệnh nhân và điều dưỡng không có quyền xem trang này.
            </p>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-yellow-900">Không thể tải dữ liệu báo cáo. Vui lòng thử lại!</p>
        </div>
      )}    </div>
  );
};

export default Reports;