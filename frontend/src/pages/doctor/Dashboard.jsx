import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, Calendar, FileText, Stethoscope, AlertCircle, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { userAPI, appointmentAPI, examinationAPI, medicalAPI } from '../../services/apiService';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const { doctor } = useOutletContext() || {};
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch appointments, exams, patients, and prescriptions
        const [appointmentsRes, examsRes, patientsRes, prescriptionsRes] = await Promise.all([
          appointmentAPI.getAll(),
          examinationAPI.getAll(),
          userAPI.getAll(),
          medicalAPI.getAll()
        ]);
        
        const appointmentsData = appointmentsRes?.data?.data || [];
        const examsData = examsRes?.data?.data || [];
        const patientsData = patientsRes?.data?.data?.filter(u => u.role === 'patients') || [];
        const prescriptionsData = prescriptionsRes?.data?.data || [];
        
        setAppointments(appointmentsData);
        setPatients(patientsData);
        setPrescriptions(prescriptionsData);
        
        // Calculate stats
        const today = new Date();
        const upcomingAppointments = appointmentsData.filter(a => {
          try {
            const dateObj = a.appointmentDate ? new Date(a.appointmentDate) : null;
            if (!dateObj || isNaN(dateObj)) return false;
            return dateObj >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
          } catch (e) {
            return false;
          }
        });
        
        setStats({
          totalPatients: patientsData.length,
          todayAppointments: upcomingAppointments.length,
          pendingAppointments: appointmentsData.filter(a => a.status === 'pending').length,
          prescriptionsCount: prescriptionsData.length,
          completedExams: examsData.filter(e => e.status === 'completed').length,
          pendingExams: examsData.filter(e => e.status === 'pending').length,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats({
          totalPatients: 0,
          todayAppointments: 0,
          pendingAppointments: 0,
          prescriptionsCount: 0,
          completedExams: 0,
          pendingExams: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const doctorName = doctor?.name || 'Bác sĩ';

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
    <div className="w-full px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6 pb-6">
        {/* Main Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Users className="h-48 w-48" />
        </div>
        <div className="relative">
          <p className="text-slate-300 text-sm mb-1">Xin chào,</p>
          <h1 className="text-4xl font-bold">BS. {doctorName}</h1>
          <p className="text-slate-300 mt-2">Bạn có <span className="font-bold text-yellow-400">{stats?.todayAppointments || 0}</span> lịch hẹn hôm nay</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Tổng bệnh nhân" value={stats?.totalPatients || 0} color="bg-gradient-to-br from-blue-500 to-blue-600" />
        <StatCard icon={Clock} label="Lịch hẹn sắp tới" value={stats?.todayAppointments || 0} color="bg-gradient-to-br from-orange-500 to-orange-600" />
        <StatCard icon={FileText} label="Chờ xác nhận" value={stats?.pendingAppointments || 0} color="bg-gradient-to-br from-purple-500 to-purple-600" />
        <StatCard icon={Stethoscope} label="Đơn thuốc" value={stats?.prescriptionsCount || 0} color="bg-gradient-to-br from-green-500 to-green-600" />
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
                Lịch hẹn sắp tới
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-gray-500 text-center py-8">Đang tải...</p>
              ) : appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Không có lịch hẹn hôm nay</p>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 5).map((appt, idx) => {
                    // Lấy giờ từ appointmentTime nếu có, nếu không thì lấy từ appointmentDate
                    let hours = '--';
                    if (appt.appointmentTime) {
                      hours = appt.appointmentTime;
                    } else if (appt.appointmentDate) {
                      try {
                        const dateObj = new Date(appt.appointmentDate);
                        const hour = dateObj.getHours();
                        if (!isNaN(hour)) hours = String(hour).padStart(2, '0');
                      } catch {}
                    }
                    const patientName = appt.patientInfo?.name || appt.patientName || 'N/A';
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {hours}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{patientName}</p>
                            <p className="text-sm text-gray-600">{appt.reason || 'Khám tổng quát'}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appt.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </div>
                    );
                  })}
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
                  {patients.slice(0, 6).map((patient, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-sm">
                          {patient.name?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name || 'N/A'}</p>
                          <p className="text-xs text-gray-600">{patient.age || 'N/A'} tuổi</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600">{patient.phone || ''}</span>
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
                <p className="text-sm font-semibold text-blue-800">Bệnh nhân mới</p>
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
                  <span className="text-gray-600">Hoàn thành</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Đánh giá</span>
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

export default DoctorDashboard;
