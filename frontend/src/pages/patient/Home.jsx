import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Pill,
  Heart,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  TrendingUp,
  Award,
  Users,
  Bell,
  MapPin,
  Phone,
  Activity,
  Zap,
  Shield,
  CheckCircle,
} from 'lucide-react';

const PatientHome = () => {
  const [stats, setStats] = useState({
    doctors: 8,
    patients: 5,
    rating: '4.8/5',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctorsRes, patientsRes] = await Promise.all([
          fetch('http://localhost:8080/api/doctors'),
          fetch('http://localhost:8080/api/patients'),
        ]);

        const doctorsData = await doctorsRes.json();
        const patientsData = await patientsRes.json();

        setStats({
          doctors: doctorsData.length || 8,
          patients: patientsData.length || 5,
          rating: '4.8/5',
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const appointments = [
    {
      id: 1,
      doctor: 'TS. Phạm Văn Thắng',
      specialty: 'Nội tổng quát',
      date: '22/01/2026',
      time: '09:00 AM',
    },
    {
      id: 2,
      doctor: 'BS.CKI. Đặng Thị Hương',
      specialty: 'Tim mạch',
      date: '25/01/2026',
      time: '02:30 PM',
    },
  ];

  const services = [
    { icon: <Users className="w-8 h-8" />, title: 'Khám ngoại trú', desc: 'Dịch vụ khám bệnh chuyên nghiệp' },
    { icon: <Activity className="w-8 h-8" />, title: 'Chẩn đoán', desc: 'Xét nghiệm và chụp ảnh' },
    { icon: <Pill className="w-8 h-8" />, title: 'Điều trị', desc: 'Phương pháp điều trị hiện đại' },
    { icon: <Shield className="w-8 h-8" />, title: 'Chăm sóc', desc: 'Theo dõi sức khỏe toàn diện' },
    { icon: <Zap className="w-8 h-8" />, title: 'Cấp cứu', desc: '24/7 Dịch vụ cấp cứu' },
    { icon: <Heart className="w-8 h-8" />, title: 'Tư vấn', desc: 'Hỗ trợ và tư vấn y tế' },
  ];

  const features = [
    { icon: <Stethoscope className="w-6 h-6" />, label: 'Bác sĩ chuyên nghiệp' },
    { icon: <Shield className="w-6 h-6" />, label: 'Kỹ thuật tiên tiến' },
    { icon: <Clock className="w-6 h-6" />, label: 'Phục vụ 24/7' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'Chất lượng đảm bảo' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Chào mừng trở lại! 👋</h1>
            <p className="text-xl text-blue-100 mb-8">Chúng tôi luôn sẵn sàng chăm sóc sức khỏe của bạn với dịch vụ chuyên nghiệp và tận tâm</p>
            <Link to="/patient/appointments" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Đặt lịch khám ngay
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dịch vụ của chúng tôi</h2>
          <p className="text-gray-600 text-lg">Cung cấp các dịch vụ y tế chất lượng cao với công nghệ tiên tiến</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all">
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Appointments */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Lịch khám sắp tới
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {appointments.length > 0 ? (
                  appointments.map((apt) => (
                    <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{apt.doctor}</h3>
                        <p className="text-sm text-blue-600 mt-1">{apt.specialty}</p>
                        <div className="flex gap-4 mt-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {apt.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full">✓ Xác nhận</span>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Chưa có lịch khám</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                Đặt lịch khám mới
              </h2>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                      <option>Chọn chuyên khoa</option>
                      <option>Nội tổng quát</option>
                      <option>Tim mạch</option>
                      <option>Nhi khoa</option>
                      <option>Sản phụ khoa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày khám</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Tiếp tục đặt lịch
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Health Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Tình trạng sức khỏe
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-gray-700">Huyết áp</span>
                  <span className="font-bold text-blue-600">120/80</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-gray-700">BMI</span>
                  <span className="font-bold text-green-600">22.5</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-sm font-medium text-gray-700">Nhịp tim</span>
                  <span className="font-bold text-orange-600">72 bpm</span>
                </div>
              </div>
              <Link to="/patient/profile" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-center">
                Cập nhật hồ sơ
              </Link>
            </div>

            {/* Health Tip */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5 text-green-600" />
                Mẹo sức khỏe
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Uống 8 cốc nước mỗi ngày để duy trì cân bằng nước cho cơ thể. Điều này giúp tăng cường miễn dịch.
              </p>
              <button className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
                Xem thêm
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Liên hệ
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3 text-sm">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">1900 123 456</span>
                </div>
                <div className="flex gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">123 Đường Nguyễn Huệ, Q.1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-white">HMS</span>
              </div>
              <p className="text-sm">Hệ thống quản lý bệnh viện hiện đại</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Khám bệnh</a></li>
                <li><a href="#" className="hover:text-white">Chẩn đoán</a></li>
                <li><a href="#" className="hover:text-white">Điều trị</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Thông tin</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white">Chính sách</a></li>
                <li><a href="#" className="hover:text-white">Điều khoản</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kết nối</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 HMS. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientHome;

