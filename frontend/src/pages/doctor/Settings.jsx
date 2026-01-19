import React, { useState, useEffect } from 'react';
import { Settings, User, Lock, Bell, Eye, EyeOff, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

const DoctorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    bio: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    reportNotifications: true,
    systemUpdates: false
  });

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors/profile', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await response.json();
      if (data.success && data.data) {
        // Ensure all fields have default values (empty string if undefined)
        setProfileData({
          firstName: data.data.firstName || data.data.name?.split(' ')[0] || '',
          lastName: data.data.lastName || data.data.name?.split(' ').slice(1).join(' ') || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
          specialization: data.data.profile?.specialty || '',
          licenseNumber: data.data.profile?.licenseNumber || '',
          bio: data.data.profile?.bio || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Lỗi khi tải thông tin hồ sơ');
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/doctors/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Cập nhật hồ sơ thành công');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Lỗi khi cập nhật hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Đổi mật khẩu thành công');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Lỗi khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/doctors/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(notificationSettings)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Cập nhật cài đặt thông báo thành công');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Lỗi khi cập nhật cài đặt');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Hồ Sơ', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Bảo Mật', icon: <Lock className="h-5 w-5" /> },
    { id: 'notifications', label: 'Thông Báo', icon: <Bell className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg">
          <Settings className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Cài Đặt Tài Khoản</h1>
          <p className="text-gray-600 mt-1">Quản lý cài đặt và thông tin cá nhân của bạn</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900">Thông Tin Cá Nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Tên"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Họ"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="specialization"
                  placeholder="Chuyên khoa"
                  value={profileData.specialization}
                  onChange={handleProfileChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="Số hiệu cấp chứng chỉ"
                  value={profileData.licenseNumber}
                  onChange={handleProfileChange}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <textarea
                name="bio"
                placeholder="Tiểu sử chuyên môn"
                value={profileData.bio}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 h-24"
              />
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <Save className="h-5 w-5" />
                {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900">Bảo Mật Tài Khoản</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mật Khẩu Hiện Tại</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mật Khẩu Mới</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Xác Nhận Mật Khẩu</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Đang xử lý...' : 'Đổi Mật Khẩu'}
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900">Cài Đặt Thông Báo</h3>
              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      emailNotifications: e.target.checked
                    }))}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="ml-4 font-semibold text-gray-900">Thông báo qua Email</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationSettings.appointmentReminders}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      appointmentReminders: e.target.checked
                    }))}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="ml-4 font-semibold text-gray-900">Nhắc nhở lịch hẹn</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationSettings.reportNotifications}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      reportNotifications: e.target.checked
                    }))}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="ml-4 font-semibold text-gray-900">Thông báo báo cáo mới</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={notificationSettings.systemUpdates}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      systemUpdates: e.target.checked
                    }))}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="ml-4 font-semibold text-gray-900">Cập nhật hệ thống</span>
                </label>
              </div>
              <button
                onClick={handleSaveNotifications}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <Save className="h-5 w-5" />
                {loading ? 'Đang lưu...' : 'Lưu Cài Đặt'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;
