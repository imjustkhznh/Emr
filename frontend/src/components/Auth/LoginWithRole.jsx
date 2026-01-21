import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Stethoscope, Heart, ShieldAlert, Users, Activity } from 'lucide-react';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export default function LoginWithRole({ onSwitchToSignup }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const roleOptions = [
    {
      id: 'admin',
      label: 'Quản trị viên',
      icon: ShieldAlert,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Quản lý toàn bộ hệ thống'
    },
    {
      id: 'doctor',
      label: 'Bác sĩ',
      icon: Stethoscope,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Quản lý bệnh nhân, khám'
    },
    {
      id: 'nurse',
      label: 'Nhân viên',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Hỗ trợ bác sĩ'
    },
    {
      id: 'patient',
      label: 'Bệnh nhân',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Đặt khám, xem hồ sơ'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!selectedRole) {
      setError('Vui lòng chọn loại tài khoản');
      toast.error('Vui lòng chọn loại tài khoản');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.signIn({
        email: formData.email,
        password: formData.password,
        role: selectedRole
      });
      
      const tokenToStore = response?.accessToken || response?.token;
      if (tokenToStore) {
        localStorage.setItem('accessToken', tokenToStore);
        localStorage.setItem('token', tokenToStore);
        localStorage.setItem('selectedRole', selectedRole);
      }
      
      if (response?.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      try {
        if (typeof response.accessToken !== 'string' || !response.accessToken) {
          throw new Error('Token không hợp lệ hoặc không tồn tại');
        }

        const decodedToken = jwtDecode(response.accessToken);
        
        toast.success('Đăng nhập thành công!');
        
        if (decodedToken.role === 'Admin' || selectedRole === 'admin') {
          window.location.href = '/admin/dashboard';
        } else if (decodedToken.role === 'doctor' || selectedRole === 'doctor') {
          window.location.href = '/doctor/dashboard';
        } else if (decodedToken.role === 'patients' || selectedRole === 'patient') {
          window.location.href = '/patient/home';
        } else if (decodedToken.role === 'Nurse' || decodedToken.role === 'nurse' || selectedRole === 'nurse') {
          window.location.href = '/staff/dashboard';
        } else {
          window.location.href = '/';
        }
      } catch (decodeError) {
        console.error('Lỗi giải mã token:', decodeError);
        toast.error('Có lỗi xảy ra khi xử lý đăng nhập');
        setLoading(false);
      }
    } catch (error) {
      setError(error.message || 'Đã có lỗi xảy ra');
      toast.error(error.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MediCare EMR</h1>
          <p className="text-blue-200">Hệ thống quản lý bệnh viện</p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95">
          {/* Step indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h2 className="text-xl font-bold mb-2">
              {selectedRole ? 'Đăng nhập' : 'Chọn loại tài khoản'}
            </h2>
            <p className="text-blue-100 text-sm">
              {selectedRole ? 'Nhập email và mật khẩu của bạn' : 'Vui lòng chọn loại tài khoản của bạn'}
            </p>
          </div>

          <div className="p-8">
            {!selectedRole ? (
              // Role Selection Step
              <div className="space-y-4">
                {roleOptions.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${role.bgColor} ${role.borderColor}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-br ${role.color} p-3 rounded-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-800">{role.label}</p>
                          <p className="text-xs text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              // Login Form Step
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Back to role selection */}
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <span>← Quay lại</span>
                </button>

                {/* Role badge */}
                <div className="flex justify-center">
                  {roleOptions
                    .filter((r) => r.id === selectedRole)
                    .map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <div key={role.id} className={`${role.bgColor} px-4 py-2 rounded-full flex items-center space-x-2 border-2 ${role.borderColor}`}>
                          <IconComponent className="w-4 h-4 text-gray-700" />
                          <span className="text-sm font-semibold text-gray-700">{role.label}</span>
                        </div>
                      );
                    })}
                </div>

                {/* Email input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-300"></div>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Mật khẩu</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-300"></div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {/* Remember me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Ghi nhớ mật khẩu
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang đăng nhập...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="text-xs text-gray-500">HOẶC</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Social login buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
                    <span className="text-lg">🔐</span>
                    <p className="text-xs font-semibold text-gray-700 mt-1">Google</p>
                  </button>
                  <button className="p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
                    <span className="text-lg">📱</span>
                    <p className="text-xs font-semibold text-gray-700 mt-1">SSO</p>
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            {!selectedRole && (
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Chưa có tài khoản?{' '}
                  <button
                    onClick={onSwitchToSignup}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-blue-100 text-xs">
          <p>© 2024 MediCare EMR. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
