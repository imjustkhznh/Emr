import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, Activity, Pill, Calendar, Stethoscope, TrendingUp, MapPin, Phone, 
  MessageSquare, ArrowRight, Clock, AlertCircle, CheckCircle, FileText, Zap,
  CreditCard, Star, BookOpen, Bell, Video
} from "lucide-react";

const PatientHome = () => {
  // Fake Patient Data
  const PATIENT_DATA = {
    id: "P001",
    name: "Tạ Thị Kim",
    email: "ta.thi.kim@gmail.com",
    avatar: "👩‍⚕️",
    age: 28,
    weight: 55,
    height: 162,
    bloodType: "O+",
    bmi: 20.9,
    bloodPressure: "118/76",
    heartRate: 72,
    temperature: 37.2,
    lastCheckup: "2024-12-15"
  };

  // Fake Health Metrics
  const HEALTH_METRICS = [
    { label: "Huyết áp", value: "118/76", unit: "mmHg", color: "green", icon: Heart },
    { label: "Nhịp tim", value: "72", unit: "bpm", color: "blue", icon: Activity },
    { label: "BMI", value: "20.9", unit: "kg/m²", color: "emerald", icon: TrendingUp },
    { label: "Nhiệt độ", value: "37.2", unit: "°C", color: "orange", icon: Zap }
  ];

  // Danh sách bác sĩ thực từ hệ thống
  const DOCTORS_LIST = [
    { _id: '1', name: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch' },
    { _id: '2', name: 'Dr. Phạm Mạnh Dũng', specialty: 'Nhi khoa' },
    { _id: '3', name: 'Dr. Vũ Quốc Thái', specialty: 'Ngoại khoa' },
    { _id: '4', name: 'Dr. Đặng Ngọc Hiểu', specialty: 'Nội tổng quát' },
    { _id: '5', name: 'Dr. Bùi Hồng Anh', specialty: 'Nha khoa' },
    { _id: '6', name: 'Dr. Nguyễn Văn Hùng', specialty: 'Nha khoa' },
    { _id: '7', name: 'Dr. Hoàng Thị Mai', specialty: 'Sản phụ khoa' },
    { _id: '8', name: 'Dr. Lý Văn Chung', specialty: 'Hô hấp' },
  ];

  // Fake Upcoming Appointments - Sử dụng tên bác sĩ thực
  const FAKE_APPOINTMENTS = [
    {
      id: 1,
      doctor: DOCTORS_LIST[0].name,
      specialty: DOCTORS_LIST[0].specialty,
      date: "2026-01-28",
      time: "09:00",
      status: "confirmed",
      location: "Phòng 301"
    },
    {
      id: 2,
      doctor: DOCTORS_LIST[3].name,
      specialty: DOCTORS_LIST[3].specialty,
      date: "2026-02-10",
      time: "14:30",
      status: "confirmed",
      location: "Phòng 205"
    },
    {
      id: 3,
      doctor: DOCTORS_LIST[1].name,
      specialty: DOCTORS_LIST[1].specialty,
      date: "2026-02-15",
      time: "10:15",
      status: "pending",
      location: "Phòng 102"
    }
  ];

  // Fake Recent Prescriptions
  const FAKE_PRESCRIPTIONS = [
    {
      id: 1,
      medication: "Aspirin",
      dosage: "100mg",
      frequency: "1 lần/ngày",
      duration: "7 ngày",
      doctor: "BS. Nguyễn Văn A",
      date: "2024-12-20",
      status: "active"
    },
    {
      id: 2,
      medication: "Paracetamol",
      dosage: "500mg",
      frequency: "3 lần/ngày",
      duration: "5 ngày",
      doctor: "BS. Trần Thị B",
      date: "2024-12-18",
      status: "active"
    },
    {
      id: 3,
      medication: "Ibuprofen",
      dosage: "200mg",
      frequency: "2 lần/ngày",
      duration: "3 ngày",
      doctor: "BS. Lê Quốc C",
      date: "2024-12-15",
      status: "completed"
    }
  ];

  // Fake Lab Results
  const FAKE_LAB_RESULTS = [
    {
      id: 1,
      test: "Xét nghiệm máu",
      date: "2024-12-20",
      status: "normal",
      results: [
        { name: "WBC", value: "7.2", normal: "4.5-11.0", unit: "10³/μL" },
        { name: "Hemoglobin", value: "13.5", normal: "12.0-16.0", unit: "g/dL" }
      ]
    },
    {
      id: 2,
      test: "Siêu âm tim",
      date: "2024-12-15",
      status: "normal",
      results: [{ name: "Kết quả", value: "Bình thường", normal: "N/A", unit: "" }]
    },
    {
      id: 3,
      test: "Nội soi dạ dày",
      date: "2024-12-10",
      status: "normal",
      results: [{ name: "Kết quả", value: "Không phát hiện bất thường", normal: "N/A", unit: "" }]
    }
  ];

  // Fake Health Tips
  const HEALTH_TIPS = [
    {
      id: 1,
      title: "Ngủ đủ giấc",
      description: "Ngủ 7-9 tiếng mỗi đêm giúp cơ thể phục hồi và tăng cường hệ miễn dịch.",
      icon: "😴"
    },
    {
      id: 2,
      title: "Tập thể dục thường xuyên",
      description: "Tập luyện 30 phút mỗi ngày giúp cải thiện sức khỏe tim mạch và tinh thần.",
      icon: "🏃"
    },
    {
      id: 3,
      title: "Ăn uống lành mạnh",
      description: "Tăng cường rau xanh, hoa quả và giảm muối, đường giúp kiểm soát cân nặng.",
      icon: "🥗"
    }
  ];

  const [expandedMetric, setExpandedMetric] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Quick Navigation */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Các Dịch Vụ Khác</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          <Link to="/patient/appointments" className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-blue-200">
            <div className="mb-2">
              <Calendar size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Lịch Khám</h3>
            <p className="text-xs text-blue-700">Quản lý lịch hẹn</p>
          </Link>
          <Link to="/patient/prescriptions" className="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-purple-200">
            <div className="mb-2">
              <Pill size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Đơn Thuốc</h3>
            <p className="text-xs text-purple-700">Xem đơn thuốc</p>
          </Link>
          <Link to="/patient/results" className="bg-gradient-to-br from-green-50 to-green-100 text-green-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-green-200">
            <div className="mb-2">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Xét Nghiệm</h3>
            <p className="text-xs text-green-700">Kết quả xét nghiệm</p>
          </Link>
          <Link to="/patient/visits" className="bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-cyan-200">
            <div className="mb-2">
              <Heart size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Khám Bệnh</h3>
            <p className="text-xs text-cyan-700">Lịch sử khám</p>
          </Link>
          <Link to="/patient/payments" className="bg-gradient-to-br from-orange-50 to-orange-100 text-orange-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-orange-200">
            <div className="mb-2">
              <CreditCard size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Thanh Toán</h3>
            <p className="text-xs text-orange-700">Lịch sử thanh toán</p>
          </Link>
          <Link to="/patient/reviews" className="bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-yellow-200">
            <div className="mb-2">
              <Star size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Đánh Giá</h3>
            <p className="text-xs text-yellow-700">Đánh giá bác sĩ</p>
          </Link>
          <Link to="/patient/articles" className="bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-900 rounded-lg p-3 hover:shadow-md transition transform hover:scale-105 border border-indigo-200">
            <div className="mb-2">
              <BookOpen size={20} />
            </div>
            <h3 className="font-semibold text-sm mb-0.5">Bài Viết</h3>
            <p className="text-xs text-indigo-700">Kiến thức sức khỏe</p>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appointments and Prescriptions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Lịch khám sắp tới
                </h3>
                <Link to="/patient/appointments" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Xem tất cả
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                {FAKE_APPOINTMENTS.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent border border-blue-100 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{apt.doctor}</h4>
                        <p className="text-sm text-gray-600">{apt.specialty} • {apt.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end text-sm font-medium text-gray-700 mb-1">
                        <Clock className="w-4 h-4" />
                        {apt.time}
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {apt.status === 'confirmed' ? '✓ Xác nhận' : '⏳ Chờ duyệt'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-emerald-600" />
                  Đơn thuốc gần đây
                </h3>
                <Link to="/patient/prescriptions" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  Xem tất cả
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                {FAKE_PRESCRIPTIONS.slice(0, 2).map((rx) => (
                  <div key={rx.id} className="p-4 border border-emerald-100 rounded-lg bg-gradient-to-r from-emerald-50/50 to-transparent hover:border-emerald-300 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{rx.medication}</h4>
                        <p className="text-sm text-gray-600">{rx.dosage} • {rx.frequency}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${rx.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                        {rx.status === 'active' ? '🔄 Đang dùng' : '✓ Hoàn thành'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{rx.duration}</span>
                      <span className="text-xs text-gray-500">Do {rx.doctor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab Results */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Kết quả xét nghiệm
                </h3>
                <Link to="/patient/results" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                  Xem tất cả
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-3">
                {FAKE_LAB_RESULTS.slice(0, 2).map((result) => (
                  <div key={result.id} className="p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50/50 to-transparent hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{result.test}</h4>
                        <p className="text-sm text-gray-600">Ngày: {result.date}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile & Tips */}
          <div className="space-y-6">
            {/* Patient Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin bệnh nhân</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tuổi:</span>
                  <span className="font-semibold text-gray-900">{PATIENT_DATA.age} tuổi</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Cân nặng:</span>
                  <span className="font-semibold text-gray-900">{PATIENT_DATA.weight} kg</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Chiều cao:</span>
                  <span className="font-semibold text-gray-900">{PATIENT_DATA.height} cm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Nhóm máu:</span>
                  <span className="font-semibold text-gray-900">{PATIENT_DATA.bloodType}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Kiểm tra cuối:</span>
                  <span className="font-semibold text-gray-900">{PATIENT_DATA.lastCheckup}</span>
                </div>
              </div>
              <Link to="/patient/profile" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-center block">
                Cập nhật hồ sơ
              </Link>
            </div>

            {/* Health Tips */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Mẹo sức khỏe
              </h3>
              <div className="space-y-3">
                {HEALTH_TIPS.slice(0, 2).map((tip) => (
                  <div key={tip.id} className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="text-2xl mb-2">{tip.icon}</div>
                    <h4 className="font-semibold text-sm text-gray-900">{tip.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Cần hỗ trợ?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  <span className="text-gray-700">(028) 3951 - 2700</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span className="text-gray-700">100 Nguyễn Huệ, Quận 1, TP.HCM</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                Liên hệ ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-white">HMS</span>
              </div>
              <p className="text-sm text-slate-400">Hệ thống quản lý bệnh viện hiện đại</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Khám bệnh</a></li>
                <li><a href="#" className="hover:text-white transition">Chẩn đoán</a></li>
                <li><a href="#" className="hover:text-white transition">Điều trị</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Thông tin</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white transition">Chính sách</a></li>
                <li><a href="#" className="hover:text-white transition">Điều khoản</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Kết nối</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 HMS. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientHome;

