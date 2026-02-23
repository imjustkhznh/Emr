import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Calendar, Clock, Lock, Edit2, Save, X } from 'lucide-react';

const Accounts = () => {
  // Thông tin của nhân viên hiện tại (Y tá Nguyễn Thị Hương)
  const [currentUser] = useState({
    id: '698c1b15b3aa62886000f1c1',
    name: 'Đỗ Quyên',
    email: 'doquyen@gmail.com',
    phone: '0123456789',
    role: 'Y tá',
    department: 'Tim mạch',
    gender: 'Nữ',
    dateOfBirth: '03/07/2000',
    joinDate: '2024-01-15',
    lastLogin: '2026-02-11 08:30',
    avatar: '👩‍⚕️'
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Simulate save
    setIsEditingProfile(false);
    alert('Cập nhật thông tin thành công!');
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Mật khẩu mới không trùng khớp!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Đổi mật khẩu thành công!');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Quản Lý Tài Khoản Của Tôi</h1>
        <p className="text-slate-600">Cập nhật thông tin cá nhân và bảo mật</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{currentUser.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{currentUser.name}</h2>
              <p className="text-slate-600">{currentUser.role} - {currentUser.department}</p>
              <p className="text-sm text-slate-500">ID: {currentUser.id}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
          >
            <Edit2 size={20} />
          </button>
        </div>

        {!isEditingProfile ? (
          // View Mode
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Mail className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-slate-600">Email</p>
                <p className="font-semibold text-slate-800">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Phone className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-slate-600">Điện Thoại</p>
                <p className="font-semibold text-slate-800">{currentUser.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <User className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-slate-600">Giới Tính</p>
                <p className="font-semibold text-slate-800">{currentUser.gender}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Calendar className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-slate-600">Ngày Sinh</p>
                <p className="font-semibold text-slate-800">{currentUser.dateOfBirth}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Clock className="text-blue-600" size={20} />
              <div>
                <p className="text-xs text-slate-600">Lần Cuối Đăng Nhập</p>
                <p className="font-semibold text-slate-800">{currentUser.lastLogin}</p>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tên Đầy Đủ</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Điện Thoại</label>
              <input
                type="tel"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-400 flex items-center gap-2"
              >
                <X size={18} />
                Hủy
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Save size={18} />
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password Change Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <Lock className="text-red-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Bảo Mật</h3>
          </div>
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Lock size={18} />
            Đổi Mật Khẩu
          </button>
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mật Khẩu Hiện Tại</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mật Khẩu Mới</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Xác Nhận Mật Khẩu Mới</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Xác nhận mật khẩu mới"
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                💡 Mật khẩu phải có ít nhất 6 ký tự, kết hợp chữ cái, số và ký tự đặc biệt để bảo mật tốt nhất.
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsChangingPassword(false)}
                className="px-4 py-2 bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-400 flex items-center gap-2"
              >
                <X size={18} />
                Hủy
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Lock size={18} />
                Cập Nhật Mật Khẩu
              </button>
            </div>
          </div>
        )}

        {!isChangingPassword && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✓ Tài khoản của bạn được bảo vệ bằng mật khẩu mạnh. Hãy đổi mật khẩu định kỳ để tăng cường bảo mật.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
