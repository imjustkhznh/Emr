import React, { useEffect, useState } from 'react';
import { Users, Calendar, FileText, Stethoscope, AlertCircle, CheckCircle, TrendingUp, Clock, Trash2, Edit2, Search } from 'lucide-react';
import { userAPI, appointmentAPI, patientsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch appointments
        const appointmentsRes = await appointmentAPI.getAppointments();
        const appointmentsData = appointmentsRes?.data || appointmentsRes?.appointments || [];
        setAppointments(appointmentsData);

        // Fetch patients
        const patientsRes = await patientsAPI.getPatients();
        const patientsData = patientsRes?.data || patientsRes?.patients || [];
        setPatients(patientsData);

        // Fetch doctors
        const doctorsRes = await fetch('http://localhost:5000/api/doctor-list', { headers });
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData.data || []);

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
          totalPatients: patientsData.length || 0,
          totalDoctors: doctorsData.data?.length || 0,
          todayAppointments: upcomingAppointments.length,
          pendingAppointments: appointmentsData.filter(a => a.status === 'pending').length,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats({
          totalPatients: 0,
          totalDoctors: 0,
          todayAppointments: 0,
          pendingAppointments: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.profile?.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa bác sĩ này?')) {
      try {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/doctors/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setDoctors(doctors.filter(d => d._id !== id));
          toast.success('Xóa bác sĩ thành công');
        } else {
          toast.error('Không thể xóa bác sĩ');
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
        toast.error('Lỗi khi xóa bác sĩ');
      }
    }
  };

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
            <h1 className="text-4xl font-bold">Quản Trị Viên</h1>
            <p className="text-slate-300 mt-2">Hệ thống có <span className="font-bold text-yellow-400">{stats?.totalDoctors || 0}</span> bác sĩ và <span className="font-bold text-yellow-400">{stats?.totalPatients || 0}</span> bệnh nhân</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Tổng bệnh nhân" value={stats?.totalPatients || 0} color="bg-gradient-to-br from-blue-500 to-blue-600" />
          <StatCard icon={Stethoscope} label="Tổng bác sĩ" value={stats?.totalDoctors || 0} color="bg-gradient-to-br from-green-500 to-green-600" />
          <StatCard icon={Clock} label="Lịch hẹn hôm nay" value={stats?.todayAppointments || 0} color="bg-gradient-to-br from-orange-500 to-orange-600" />
          <StatCard icon={FileText} label="Chờ xác nhận" value={stats?.pendingAppointments || 0} color="bg-gradient-to-br from-purple-500 to-purple-600" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointments & Doctors Management */}
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
                  <p className="text-gray-500 text-center py-8">Không có lịch hẹn</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map((appt, idx) => {
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

            {/* Doctors Management */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-transparent">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                  Quản Lý Bác Sĩ
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bác sĩ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-900"
                  />
                </div>

                {loading ? (
                  <p className="text-gray-500 text-center py-8">Đang tải...</p>
                ) : filteredDoctors.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Không có bác sĩ</p>
                ) : (
                  <div className="space-y-2">
                    {filteredDoctors.slice(0, 8).map((doctor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-sm">
                            {doctor.name?.charAt(0) || 'B'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doctor.name || 'N/A'}</p>
                            <p className="text-xs text-gray-600">{doctor.profile?.specialty || 'Chuyên khoa'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDoctor(doctor._id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
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
                  <p className="text-sm font-semibold text-green-800">Bác sĩ</p>
                  <p className="text-xs text-green-700 mt-1">{stats?.totalDoctors || 0} bác sĩ trong hệ thống</p>
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
                    <span className="text-gray-600">Khám bệnh</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Hồ sơ hoàn chỉnh</span>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92%' }}></div>
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

export default AdminDashboard;
