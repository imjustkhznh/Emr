import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart, Activity, Pill, Edit2, Save, X, Shield, Award } from 'lucide-react';

const Profile = () => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  })();

  // Fake patient data
  const PATIENT_DATA = {
    id: "P001",
    name: user?.name || "Tạ Thị Kim",
    email: user?.email || "ta.thi.kim@gmail.com",
    phone: user?.phone || "0987654321",
    avatar: "👩‍⚕️",
    age: 28,
    weight: 55,
    height: 162,
    bloodType: "O+",
    gender: "Nữ",
    dob: "1997-05-15",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    occupation: "Kỹ sư phần mềm",
    emergencyContact: "Tạ Văn Hùng",
    emergencyPhone: "0912345678",
    insurance: "BHYT001234",
    bmi: 20.9,
    bloodPressure: "118/76",
    allergies: "Không có",
    chronicDiseases: "Không có",
    lastCheckup: "2024-12-15",
    medicalHistory: [
      { date: "2024-01-10", condition: "Cảm lạnh", status: "Đã hồi phục" },
      { date: "2023-05-20", condition: "Viêm đường hô hấp", status: "Đã hồi phục" }
    ]
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(PATIENT_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage or API
    setIsEditing(false);
    // toast.success('Cập nhật hồ sơ thành công!');
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl border-3 border-white/40">
                {PATIENT_DATA.avatar}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{formData.name}</h1>
                <p className="text-blue-100 mt-1">ID: {PATIENT_DATA.id}</p>
                <p className="text-blue-100 text-sm mt-1">📅 Cập nhật lần cuối: {PATIENT_DATA.lastCheckup}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isEditing
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <X className="w-5 h-5" />
                  Hủy
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Chỉnh sửa
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Tuổi</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{calculateAge(PATIENT_DATA.dob)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-gray-600">BMI</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{PATIENT_DATA.bmi}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Huyết áp</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{PATIENT_DATA.bloodPressure}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Pill className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Nhóm máu</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{PATIENT_DATA.bloodType}</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Thông tin cá nhân
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nghề nghiệp</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Lưu thay đổi
                </button>
              )}
            </div>

            {/* Health Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-600" />
                Thông tin sức khỏe
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chiều cao (cm)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        isEditing
                          ? 'border-blue-300 focus:border-blue-500'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      }`}
                    />
                    <span className="text-gray-600 font-medium">cm</span>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cân nặng (kg)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        isEditing
                          ? 'border-blue-300 focus:border-blue-500'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                      }`}
                    />
                    <span className="text-gray-600 font-medium">kg</span>
                  </div>
                </div>

                {/* Blood Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm máu</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>

                {/* Insurance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mã BHYT</label>
                  <input
                    type="text"
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* Allergies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dị ứng</label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Nhập hoặc 'Không có'"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>

                {/* Chronic Diseases */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bệnh mãn tính</label>
                  <input
                    type="text"
                    name="chronicDiseases"
                    value={formData.chronicDiseases}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Nhập hoặc 'Không có'"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
                      isEditing
                        ? 'border-blue-300 focus:border-blue-500'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                Liên hệ khẩn cấp
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Tên</label>
                  <p className="font-semibold text-gray-900">{PATIENT_DATA.emergencyContact}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Số điện thoại</label>
                  <p className="font-semibold text-gray-900">{PATIENT_DATA.emergencyPhone}</p>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Lịch sử y tế
              </h3>
              <div className="space-y-4">
                {PATIENT_DATA.medicalHistory.map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <p className="font-medium text-gray-900">{item.condition}</p>
                    <span className="inline-block mt-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Tài liệu</h3>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors mb-3">
                Tải hồ sơ bệnh nhân
              </button>
              <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg transition-colors">
                Xuất giấy chứng nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

