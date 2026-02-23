import React, { useEffect, useState } from 'react';
import {
  Users,
  Calendar,
  FileText,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  Heart
} from 'lucide-react';
import { samplePatients, sampleAppointments } from './sampleData';

const sampleStats = {
  totalPatients: samplePatients.length,
  todayAppointments: sampleAppointments.length,
  completedAppointments: sampleAppointments.filter(a => a.status === 'confirmed' || a.status === 'completed').length,
  pendingAppointments: sampleAppointments.filter(a => a.status === 'pending').length,
  prescriptionsCount: 15,
  checkInPatients: samplePatients.filter(p => p.status === 'dang_kham' || p.status === 'da_kham').length,
};

const StaffDashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('user')) || { name: 'Y Tá' };

  useEffect(() => {
    setStats(sampleStats);
    setAppointments(sampleAppointments);
    setPatients(samplePatients);
    setLoading(false);
  }, []);

  const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-6 shadow-md hover:shadow-lg transition border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">✓ Hoàn thành</span>;
      case 'in_progress':
        return <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">● Đang khám</span>;
      case 'pending':
        return <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">◐ Chờ khám</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 min-h-screen w-full">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white rounded-3xl p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5">
            <Activity className="h-48 w-48" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-200 text-sm font-medium mb-1">👋 Xin chào</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{currentUser.name}</h1>
            <p className="text-slate-200">
              Hôm nay có <span className="font-semibold text-blue-300">{stats?.todayAppointments || 0} lịch hẹn</span> • 
              <span className="font-semibold text-green-300 ml-1">{stats?.checkInPatients || 0} check-in</span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <StatCard 
            icon={Users} 
            label="Bệnh nhân" 
            value={stats?.totalPatients || 0} 
            color="bg-sky-400"
            bgColor="bg-sky-50"
          />
          <StatCard 
            icon={Calendar} 
            label="Lịch hẹn" 
            value={stats?.todayAppointments || 0} 
            color="bg-violet-400"
            bgColor="bg-violet-50"
          />
          <StatCard 
            icon={CheckCircle} 
            label="Hoàn thành" 
            value={stats?.completedAppointments || 0} 
            color="bg-emerald-400"
            bgColor="bg-emerald-50"
          />
          <StatCard 
            icon={Clock} 
            label="Đang khám" 
            value={1}
            color="bg-amber-400"
            bgColor="bg-amber-50"
          />
          <StatCard 
            icon={AlertCircle} 
            label="Chờ khám" 
            value={stats?.pendingAppointments || 0} 
            color="bg-rose-400"
            bgColor="bg-rose-50"
          />
          <StatCard 
            icon={FileText} 
            label="Đơn thuốc" 
            value={stats?.prescriptionsCount || 0} 
            color="bg-indigo-400"
            bgColor="bg-indigo-50"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Appointments */}
          <div className="lg:col-span-3">
            {/* Today's Appointments */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-sky-50 via-blue-50 to-transparent">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-sky-600" />
                    Lịch hẹn khám
                  </h2>
                  <span className="bg-sky-200 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">{appointments.length} lịch</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Giờ</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Bệnh nhân</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Bác sĩ</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Lý do</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Check-in</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500">Đang tải...</td>
                      </tr>
                    ) : appointments.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500">Không có lịch hẹn hôm nay</td>
                      </tr>
                    ) : (
                      appointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-semibold text-slate-800">{appt.appointmentTime}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="font-medium text-slate-900">{appt.patientName}</p>
                              <p className="text-xs text-slate-500">{appt.patientId || appt.patientCode}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-slate-700">{appt.doctorName}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-xs font-medium">{appt.reason}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                              appt.checkIn 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {appt.checkIn ? '✓ Đã' : 'Chưa'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(appt.status)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Patients Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition mt-6">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-green-50 to-transparent">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                    <Users className="h-5 w-5 text-emerald-600" />
                    Danh sách bệnh nhân
                  </h2>
                  <span className="bg-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">{patients.length} BN</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Mã BN</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tên</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tuổi</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">SĐT</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Khám cuối</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500">Đang tải...</td>
                      </tr>
                    ) : patients.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500">Không có bệnh nhân</td>
                      </tr>
                    ) : (
                      patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-semibold text-sky-600">{patient.id}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="font-medium text-slate-900">{patient.name}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-slate-700">{patient.age}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-slate-700 text-sm">{patient.phone}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-slate-600 text-sm">{patient.lastVisit}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                              patient.status === 'active'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {patient.status === 'active' ? '✓ Hoạt động' : 'Không'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Summary */}
          <div className="space-y-6">
            {/* Important Alerts */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-rose-50 to-transparent">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                  Tóm tắt
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-300 rounded-xl hover:shadow-md transition">
                  <p className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Chờ khám
                  </p>
                  <p className="text-2xl font-bold text-yellow-700 mt-2">{stats?.pendingAppointments || 0}</p>
                  <p className="text-xs text-yellow-600 mt-1">lịch hẹn cần xác nhận</p>
                </div>
                <div className="p-4 bg-sky-50 border-l-4 border-sky-300 rounded-xl hover:shadow-md transition">
                  <p className="text-sm font-semibold text-sky-800 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Tổng bệnh nhân
                  </p>
                  <p className="text-2xl font-bold text-sky-700 mt-2">{stats?.totalPatients || 0}</p>
                  <p className="text-xs text-sky-600 mt-1">trong hệ thống</p>
                </div>
                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-300 rounded-xl hover:shadow-md transition">
                  <p className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Đã check-in
                  </p>
                  <p className="text-2xl font-bold text-emerald-700 mt-2">{stats?.checkInPatients || 0}</p>
                  <p className="text-xs text-emerald-600 mt-1">bệnh nhân hôm nay</p>
                </div>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-300 rounded-xl hover:shadow-md transition">
                  <p className="text-sm font-semibold text-indigo-800 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Đơn thuốc
                  </p>
                  <p className="text-2xl font-bold text-indigo-700 mt-2">{stats?.prescriptionsCount || 0}</p>
                  <p className="text-xs text-indigo-600 mt-1">đơn thuốc đã kê</p>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 text-white rounded-3xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Hiệu suất
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-200">Lịch khám hoàn thành</span>
                    <span className="font-semibold text-blue-300">{Math.round((stats?.completedAppointments / stats?.todayAppointments) * 100) || 0}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full" 
                      style={{ width: `${Math.round((stats?.completedAppointments / stats?.todayAppointments) * 100) || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-200">Check-in</span>
                    <span className="font-semibold text-green-300">{Math.round((stats?.checkInPatients / stats?.totalPatients) * 100) || 0}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full" 
                      style={{ width: `${Math.round((stats?.checkInPatients / stats?.totalPatients) * 100) || 0}%` }}
                    ></div>
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
