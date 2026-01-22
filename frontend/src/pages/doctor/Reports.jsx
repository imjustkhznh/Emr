import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, CheckCircle, AlertCircle, Download, Filter } from 'lucide-react';
import { toast } from 'react-toastify';

// Fake data for reports
const FAKE_REPORT_DATA = {
  totalPatients: 42,
  totalAppointments: 156,
  completedAppointments: 134,
  pendingAppointments: 15,
  cancelledAppointments: 7,
  completionRate: 86,
  cancellationRate: 4,
  averageRating: 4.8,
  appointmentsThisMonth: 28,
  newPatientsThisMonth: 12,
  monthlyData: [
    { month: 'T1', value: 18, max: 100 },
    { month: 'T2', value: 22, max: 100 },
    { month: 'T3', value: 28, max: 100 },
    { month: 'T4', value: 25, max: 100 },
    { month: 'T5', value: 31, max: 100 },
    { month: 'T6', value: 28, max: 100 }
  ],
  weeklyData: [
    { day: 'Thứ 2', value: 5 },
    { day: 'Thứ 3', value: 7 },
    { day: 'Thứ 4', value: 6 },
    { day: 'Thứ 5', value: 8 },
    { day: 'Thứ 6', value: 9 },
    { day: 'Thứ 7', value: 4 },
    { day: 'CN', value: 2 }
  ],
  statusDistribution: [
    { status: 'Hoàn thành', count: 134, percentage: 86, color: 'bg-green-500' },
    { status: 'Chưa hoàn thành', count: 15, percentage: 10, color: 'bg-blue-500' },
    { status: 'Đã hủy', count: 7, percentage: 4, color: 'bg-red-500' }
  ]
};

const StatCard = ({ icon: Icon, title, value, subtitle, bgColor, trend }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
        )}
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="h-4 w-4" />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className={`${bgColor} p-3 rounded-lg`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
    </div>
  </div>
);

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const reportData = FAKE_REPORT_DATA;

  const handleDownload = () => {
    const content = `BÁO CÁO HOẠT ĐỘNG KHÁM BỆNH
${'═'.repeat(60)}
Kỳ báo cáo: ${timeRange === 'week' ? 'Tuần này' : timeRange === 'month' ? 'Tháng này' : timeRange === 'quarter' ? 'Quý này' : 'Năm này'}

THỐNG KÊ CHUNG:
- Tổng số bệnh nhân: ${reportData.totalPatients}
- Tổng cuộc hẹn: ${reportData.totalAppointments}
- Hoàn thành: ${reportData.completedAppointments} (${reportData.completionRate}%)
- Chưa hoàn thành: ${reportData.pendingAppointments}
- Đã hủy: ${reportData.cancelledAppointments} (${reportData.cancellationRate}%)
- Đánh giá trung bình: ${reportData.averageRating}⭐

THỐNG KÊ THÁNG NÀY:
- Cuộc hẹn tháng này: ${reportData.appointmentsThisMonth}
- Bệnh nhân mới: ${reportData.newPatientsThisMonth}

PHÂN BỐ TÌNH TRẠNG:
${reportData.statusDistribution.map(item => `- ${item.status}: ${item.count} (${item.percentage}%)`).join('\n')}

${'═'.repeat(60)}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bao-cao-${new Date().getTime()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Tải báo cáo thành công!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Báo Cáo & Thống Kê</h1>
            <p className="text-gray-600 mt-1">Phân tích hoạt động khám bệnh và hiệu suất</p>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
        >
          <Download className="h-5 w-5" />
          Xuất Báo Cáo
        </button>
      </div>

      {/* Time Range Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-700"
        >
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="quarter">Quý này</option>
          <option value="year">Năm này</option>
        </select>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Tổng Số Bệnh Nhân"
          value={reportData.totalPatients}
          subtitle="Được quản lý"
          bgColor="bg-blue-600"
          trend={8}
        />
        <StatCard
          icon={Calendar}
          title="Tổng Cuộc Hẹn"
          value={reportData.totalAppointments}
          subtitle="Tất cả thời gian"
          bgColor="bg-purple-600"
          trend={12}
        />
        <StatCard
          icon={CheckCircle}
          title="Hoàn Thành"
          value={reportData.completedAppointments}
          subtitle={`${reportData.completionRate}% tỷ lệ`}
          bgColor="bg-green-600"
          trend={5}
        />
        <StatCard
          icon={TrendingUp}
          title="Đánh Giá Trung Bình"
          value={`${reportData.averageRating}⭐`}
          subtitle="Từ bệnh nhân"
          bgColor="bg-orange-600"
          trend={2}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Cuộc Hẹn 6 Tháng Gần Đây</h2>
          <div className="space-y-4">
            {reportData.monthlyData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 text-sm font-bold text-gray-600 text-center">{item.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right text-sm font-bold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Cuộc Hẹn Tuần Này (Theo Ngày)</h2>
          <div className="flex items-end justify-around h-64 gap-2">
            {reportData.weeklyData.map((item, index) => {
              const maxValue = Math.max(...reportData.weeklyData.map(d => d.value));
              const heightPercent = (item.value / maxValue) * 100;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-semibold text-gray-700">{item.value}</div>
                  <div
                    className="w-8 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all hover:from-purple-600 hover:to-purple-500"
                    style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                  ></div>
                  <div className="text-xs font-semibold text-gray-600">{item.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Phân Bố Tình Trạng Cuộc Hẹn</h2>
        <div className="space-y-6">
          {reportData.statusDistribution.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`${item.color} w-4 h-4 rounded-full`}></div>
                  <span className="font-semibold text-gray-900">{item.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{item.count}</span>
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`${item.color} h-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <p className="text-sm font-semibold text-blue-600 uppercase">Chưa hoàn thành</p>
          <p className="text-4xl font-bold text-blue-900 mt-3">{reportData.pendingAppointments}</p>
          <p className="text-xs text-blue-600 mt-2">Đang chờ xử lý</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <p className="text-sm font-semibold text-green-600 uppercase">Mới Tháng Này</p>
          <p className="text-4xl font-bold text-green-900 mt-3">{reportData.newPatientsThisMonth}</p>
          <p className="text-xs text-green-600 mt-2">Bệnh nhân mới</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <p className="text-sm font-semibold text-purple-600 uppercase">Tháng Này</p>
          <p className="text-4xl font-bold text-purple-900 mt-3">{reportData.appointmentsThisMonth}</p>
          <p className="text-xs text-purple-600 mt-2">Cuộc hẹn</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
          <p className="text-sm font-semibold text-red-600 uppercase">Đã Hủy</p>
          <p className="text-4xl font-bold text-red-900 mt-3">{reportData.cancelledAppointments}</p>
          <p className="text-xs text-red-600 mt-2">{reportData.cancellationRate}% tỷ lệ</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;