import React, { useEffect, useState } from 'react';
import { Users, Calendar, FileText, AlertCircle, TrendingUp } from 'lucide-react';

const sampleStats = {
  totalPatients: 20,
  todayAppointments: 6,
  pendingAppointments: 3,
  prescriptionsCount: 5,
};

const sampleAppointments = [
  {
    id: '1',
    patientName: 'Nguyễn Văn An',
    doctorName: 'Dr. Trần Văn A',
    appointmentTime: '09:00',
    reason: 'Khám tổng quát',
    status: 'pending'
  },
  {
    id: '2',
    patientName: 'Trần Thị Bình',
    doctorName: 'Dr. Nguyễn Thị B',
    appointmentTime: '10:30',
    reason: 'Khám da',
    status: 'confirmed'
  },
  {
    id: '3',
    patientName: 'Lê Văn Cường',
    doctorName: 'Dr. Lê Văn C',
    appointmentTime: '14:00',
    reason: 'Khám tim',
    status: 'confirmed'
  },
];

const samplePatients = [
  { id: 'BN001', name: 'Nguyễn Văn An', phone: '0912345678', age: 35 },
  { id: 'BN002', name: 'Trần Thị Bình', phone: '0987654321', age: 28 },
  { id: 'BN003', name: 'Lê Văn Cường', phone: '0909123123', age: 45 },
  { id: 'BN004', name: 'Phạm Thị Dung', phone: '0911000001', age: 32 },
  { id: 'BN005', name: 'Hoàng Minh Tuấn', phone: '0910000000', age: 50 },
];

const StaffDashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load sample data
    setStats(sampleStats);
    setAppointments(sampleAppointments);
    setPatients(samplePatients);
    setLoading(false);
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`${color} rounded-lg p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{loading ? '...' : value}</p>
        </div>
        <Icon className="h-12 w-12 opacity-30" />
      </div>
    </div>
  );

  return (
    <div className="p-2 md:p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Users className="h-48 w-48" />
          </div>
          <div className="relative">
            <p className="text-blue-100 text-sm mb-1">Xin chào,</p>
            <h1 className="text-4xl font-bold">Y Tá</h1>
            <p className="text-blue-100 mt-2">Bạn có <span className="font-bold text-yellow-300">{stats?.todayAppointments || 0}</span> lịch hẹn hôm nay</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Tổng bệnh nhân" value={stats?.totalPatients || 0} color="bg-gradient-to-br from-blue-500 to-blue-600" />
          <StatCard icon={Calendar} label="Lịch hẹn hôm nay" value={stats?.todayAppointments || 0} color="bg-gradient-to-br from-orange-500 to-orange-600" />
          <StatCard icon={AlertCircle} label="Chờ xác nhận" value={stats?.pendingAppointments || 0} color="bg-gradient-to-br from-purple-500 to-purple-600" />
          <StatCard icon={FileText} label="Đơn thuốc" value={stats?.prescriptionsCount || 0} color="bg-gradient-to-br from-green-500 to-green-600" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Appointments */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Lịch hẹn hôm nay
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <p className="text-gray-500 text-center py-8">Đang tải...</p>
                ) : appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Không có lịch hẹn hôm nay</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map((appt) => (
                      <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {appt.appointmentTime}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{appt.patientName}</p>
                            <p className="text-sm text-gray-600">{appt.reason}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appt.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-transparent">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-600" />
                  Bệnh nhân gần đây
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <p className="text-gray-500 text-center py-8">Đang tải...</p>
                ) : patients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Không có bệnh nhân</p>
                ) : (
                  <div className="space-y-2">
                    {patients.slice(0, 6).map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-sm">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{patient.name}</p>
                            <p className="text-xs text-gray-600">{patient.age} tuổi</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600">{patient.phone}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Summary */}
          <div className="space-y-6">
            {/* Important Alerts */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-transparent">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Thông báo quan trọng
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm font-semibold text-yellow-800">Lịch hẹn chờ</p>
                  <p className="text-xs text-yellow-700 mt-1">{stats?.pendingAppointments || 0} lịch hẹn cần xác nhận</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-semibold text-blue-800">Bệnh nhân</p>
                  <p className="text-xs text-blue-700 mt-1">{stats?.totalPatients || 0} bệnh nhân trong hệ thống</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-sm font-semibold text-green-800">Đơn thuốc</p>
                  <p className="text-xs text-green-700 mt-1">{stats?.prescriptionsCount || 0} đơn thuốc đã kê</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Tóm tắt
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Công việc hôm nay</span>
                    <span className="font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Hiệu suất</span>
                    <span className="font-bold">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
