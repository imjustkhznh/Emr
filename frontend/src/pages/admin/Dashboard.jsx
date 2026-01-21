import React, { useEffect, useState } from 'react';
import { Users, Calendar, FileText, Stethoscope, AlertCircle, CheckCircle, TrendingUp, Clock, Trash2, Edit2, Search } from 'lucide-react';
import { userAPI, appointmentAPI, patientsAPI } from '../../services/api';
import { toast } from 'react-toastify';

// Dữ liệu fake 45 bác sĩ
const FAKE_DOCTORS_45 = [
  { _id: '1', name: 'Dr. Trần Hữu Bình', email: 'tranhuubinh@hospital.com', phone: '0901111111', specialty: 'Tim mạch', experience: 15 },
  { _id: '2', name: 'Dr. Phạm Mạnh Dũng', email: 'phammainhdung@hospital.com', phone: '0902222222', specialty: 'Nhi khoa', experience: 12 },
  { _id: '3', name: 'Dr. Vũ Quốc Thái', email: 'vuquocthai@hospital.com', phone: '0903333333', specialty: 'Ngoại khoa', experience: 18 },
  { _id: '4', name: 'Dr. Đặng Ngọc Hiểu', email: 'dangnochieu@hospital.com', phone: '0904444444', specialty: 'Da liễu', experience: 10 },
  { _id: '5', name: 'Dr. Bùi Hồng Anh', email: 'buihonganh@hospital.com', phone: '0905555555', specialty: 'Mắt', experience: 14 },
  { _id: '6', name: 'Dr. Nguyễn Văn Hùng', email: 'nguyenvanhung@hospital.com', phone: '0906666666', specialty: 'Nha khoa', experience: 11 },
  { _id: '7', name: 'Dr. Hoàng Thị Mai', email: 'hoangthimai@hospital.com', phone: '0907777777', specialty: 'Sản phụ khoa', experience: 16 },
  { _id: '8', name: 'Dr. Lý Văn Chung', email: 'lyvanching@hospital.com', phone: '0908888888', specialty: 'Hô hấp', experience: 13 },
  { _id: '9', name: 'Dr. Cao Thị Liên', email: 'caothilien@hospital.com', phone: '0909999999', specialty: 'Tâm lý', experience: 9 },
  { _id: '10', name: 'Dr. Dương Văn Long', email: 'duongvanlong@hospital.com', phone: '0910101010', specialty: 'Tiêu hóa', experience: 17 },
  { _id: '11', name: 'Dr. Trần Thị Hương', email: 'tranthihuong@hospital.com', phone: '0911111111', specialty: 'Thần kinh', experience: 14 },
  { _id: '12', name: 'Dr. Lê Văn Kiên', email: 'levankien@hospital.com', phone: '0912121212', specialty: 'Bỏng thương tích', experience: 8 },
  { _id: '13', name: 'Dr. Phan Minh Tuấn', email: 'phanminhttuan@hospital.com', phone: '0913131313', specialty: 'Xương khớp', experience: 19 },
  { _id: '14', name: 'Dr. Võ Thị Hạnh', email: 'vothihanh@hospital.com', phone: '0914141414', specialty: 'Ung bướu', experience: 12 },
  { _id: '15', name: 'Dr. Huỳnh Văn Sơn', email: 'huyunhvanson@hospital.com', phone: '0915151515', specialty: 'Tai mũi họng', experience: 11 },
  { _id: '16', name: 'Dr. Tô Thị Xuân', email: 'tothixuan@hospital.com', phone: '0916161616', specialty: 'Phòng khám đa khoa', experience: 7 },
  { _id: '17', name: 'Dr. Kiều Minh Hạo', email: 'kieuminhhao@hospital.com', phone: '0917171717', specialty: 'Tim mạch', experience: 16 },
  { _id: '18', name: 'Dr. Đinh Thị Hồng', email: 'dinhthihong@hospital.com', phone: '0918181818', specialty: 'Nhi khoa', experience: 13 },
  { _id: '19', name: 'Dr. Bạch Văn Hải', email: 'bauvamhai@hospital.com', phone: '0919191919', specialty: 'Ngoại khoa', experience: 20 },
  { _id: '20', name: 'Dr. Sơn Thị Linh', email: 'sonthilinh@hospital.com', phone: '0920202020', specialty: 'Phụ khoa', experience: 15 },
  { _id: '21', name: 'Dr. Vương Văn Tú', email: 'vuongvantu@hospital.com', phone: '0921212121', specialty: 'Chỉnh hình', experience: 10 },
  { _id: '22', name: 'Dr. Hồ Thị Thanh', email: 'hothithanh@hospital.com', phone: '0922222222', specialty: 'Hô hấp', experience: 12 },
  { _id: '23', name: 'Dr. Tạ Văn Đức', email: 'tavanduc@hospital.com', phone: '0923232323', specialty: 'Tiêu hóa', experience: 14 },
  { _id: '24', name: 'Dr. Giang Thị Huỳnh', email: 'giangthihuynh@hospital.com', phone: '0924242424', specialty: 'Thần kinh', experience: 18 },
  { _id: '25', name: 'Dr. Trịnh Văn Hùng', email: 'trinvanhung@hospital.com', phone: '0925252525', specialty: 'Nha khoa', experience: 11 },
  { _id: '26', name: 'Dr. Lai Thị Ngọc', email: 'laithingoc@hospital.com', phone: '0926262626', specialty: 'Da liễu', experience: 9 },
  { _id: '27', name: 'Dr. Bùi Văn Hùng', email: 'buivanhung@hospital.com', phone: '0927272727', specialty: 'Mắt', experience: 17 },
  { _id: '28', name: 'Dr. Chế Thị Huyền', email: 'chethihuyyen@hospital.com', phone: '0928282828', specialty: 'Tâm lý', experience: 8 },
  { _id: '29', name: 'Dr. Đỗ Văn Tâm', email: 'dovantam@hospital.com', phone: '0929292929', specialty: 'Bỏng thương tích', experience: 13 },
  { _id: '30', name: 'Dr. Phạm Thị Yên', email: 'phamthiyen@hospital.com', phone: '0930303030', specialty: 'Sản phụ khoa', experience: 15 },
  { _id: '31', name: 'Dr. Trương Văn Tịnh', email: 'truongvantinh@hospital.com', phone: '0931313131', specialty: 'Xương khớp', experience: 12 },
  { _id: '32', name: 'Dr. Võ Thị Tuyết', email: 'vothituyet@hospital.com', phone: '0932323232', specialty: 'Ung bướu', experience: 19 },
  { _id: '33', name: 'Dr. Lương Văn Sáng', email: 'luongvansang@hospital.com', phone: '0933333333', specialty: 'Tai mũi họng', experience: 10 },
  { _id: '34', name: 'Dr. Quách Thị Hương', email: 'quachthihuong@hospital.com', phone: '0934343434', specialty: 'Phòng khám đa khoa', experience: 11 },
  { _id: '35', name: 'Dr. Hà Văn Định', email: 'havandinh@hospital.com', phone: '0935353535', specialty: 'Tim mạch', experience: 16 },
  { _id: '36', name: 'Dr. Dương Thị Kiều', email: 'duongthikieu@hospital.com', phone: '0936363636', specialty: 'Nhi khoa', experience: 14 },
  { _id: '37', name: 'Dr. Trịnh Văn Dũng', email: 'trinvandung@hospital.com', phone: '0937373737', specialty: 'Ngoại khoa', experience: 18 },
  { _id: '38', name: 'Dr. Quý Thị Hồng', email: 'quythihong@hospital.com', phone: '0938383838', specialty: 'Da liễu', experience: 13 },
  { _id: '39', name: 'Dr. Kiên Văn Minh', email: 'kienvanminh@hospital.com', phone: '0939393939', specialty: 'Mắt', experience: 12 },
  { _id: '40', name: 'Dr. Tuyến Thị Hạnh', email: 'tuyenthihanh@hospital.com', phone: '0940404040', specialty: 'Nha khoa', experience: 10 },
  { _id: '41', name: 'Dr. Vân Văn Hải', email: 'vanvamhai@hospital.com', phone: '0941414141', specialty: 'Sản phụ khoa', experience: 17 },
  { _id: '42', name: 'Dr. Lý Thị Khánh', email: 'lyithikhanh@hospital.com', phone: '0942424242', specialty: 'Hô hấp', experience: 11 },
  { _id: '43', name: 'Dr. Hòa Văn Tân', email: 'hoavantan@hospital.com', phone: '0943434343', specialty: 'Tiêu hóa', experience: 15 },
  { _id: '44', name: 'Dr. Huệ Thị Sương', email: 'hueithisuong@hospital.com', phone: '0944444444', specialty: 'Thần kinh', experience: 13 },
  { _id: '45', name: 'Dr. Năng Văn Thắng', email: 'nangvanthang@hospital.com', phone: '0945454545', specialty: 'Chỉnh hình', experience: 16 }
];

// Dữ liệu fake
const FAKE_STATS = {
  totalPatients: 1250,
  totalDoctors: 45,
  todayAppointments: 18,
  pendingAppointments: 12,
  totalRevenue: 125500000,
  newPatients: 23
};

const FAKE_APPOINTMENTS = [
  { _id: '1', patientName: 'Phạm Minh Tuấn', doctorName: 'Dr. Trần Hữu Bình', appointmentDate: new Date().toISOString(), status: 'confirmed', time: '09:00' },
  { _id: '2', patientName: 'Vũ Thị Hương', doctorName: 'Dr. Phạm Mạnh Dũng', appointmentDate: new Date().toISOString(), status: 'pending', time: '10:30' },
  { _id: '3', patientName: 'Lê Văn Kiên', doctorName: 'Dr. Vũ Quốc Thái', appointmentDate: new Date().toISOString(), status: 'completed', time: '14:00' },
  { _id: '4', patientName: 'Hoàng Thị Linh', doctorName: 'Dr. Đặng Ngọc Hiểu', appointmentDate: new Date().toISOString(), status: 'confirmed', time: '15:30' },
  { _id: '5', patientName: 'Dương Văn Long', doctorName: 'Dr. Bùi Hồng Anh', appointmentDate: new Date().toISOString(), status: 'pending', time: '11:00' }
];

const FAKE_PATIENTS = [
  { _id: '1', name: 'Phạm Minh Tuấn', email: 'phamminhtuan@gmail.com', phone: '0912345678', dob: '1990-05-15', gender: 'Nam' },
  { _id: '2', name: 'Vũ Thị Hương', email: 'vuthihuong@gmail.com', phone: '0987654321', dob: '1995-08-20', gender: 'Nữ' },
  { _id: '3', name: 'Lê Văn Kiên', email: 'levankien@gmail.com', phone: '0923456789', dob: '1988-03-10', gender: 'Nam' },
];

const FAKE_DOCTORS = [
  { _id: '1', name: 'Dr. Trần Hữu Bình', email: 'tranhuubinh@hospital.com', specialty: 'Tim mạch', phone: '0901111111', experience: 15 },
  { _id: '2', name: 'Dr. Phạm Mạnh Dũng', email: 'phammainhdung@hospital.com', specialty: 'Nhi khoa', phone: '0902222222', experience: 12 },
  { _id: '3', name: 'Dr. Vũ Quốc Thái', email: 'vuquocthai@hospital.com', specialty: 'Ngoại khoa', phone: '0903333333', experience: 18 },
  { _id: '4', name: 'Dr. Đặng Ngọc Hiểu', email: 'dangnochieu@hospital.com', specialty: 'Da liễu', phone: '0904444444', experience: 10 },
  { _id: '5', name: 'Dr. Bùi Hồng Anh', email: 'buihonganh@hospital.com', specialty: 'Mắt', phone: '0905555555', experience: 14 }
];

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
        
        // Sử dụng dữ liệu fake
        setStats(FAKE_STATS);
        setAppointments(FAKE_APPOINTMENTS);
        setPatients(FAKE_PATIENTS);
        setDoctors(FAKE_DOCTORS_45);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback vẫn dùng dữ liệu fake
        setStats(FAKE_STATS);
        setAppointments(FAKE_APPOINTMENTS);
        setPatients(FAKE_PATIENTS);
        setDoctors(FAKE_DOCTORS_45);
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
