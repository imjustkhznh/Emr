import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Heart, ArrowRight, Zap } from 'lucide-react';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

export default function Login({ onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.signIn({
        email: formData.email,
        password: formData.password
      });
      
      const tokenToStore = response?.accessToken || response?.token;
      if (tokenToStore) {
        localStorage.setItem('accessToken', tokenToStore);
        localStorage.setItem('token', tokenToStore);
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
        
        if (decodedToken.role === 'Admin') {
          window.location.href = '/admin/dashboard';
        } else if (decodedToken.role === 'doctor') {
          window.location.href = '/doctor/dashboard';
        } else if (decodedToken.role === 'patients') {
          window.location.href = '/patient/home';
        } else if (decodedToken.role === 'Nurse' || decodedToken.role === 'nurse') {
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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2.5">
          <label className="block text-sm font-semibold text-gray-700">Địa chỉ Email</label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur opacity-0 group-focus-within:opacity-25 transition duration-300"></div>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white font-medium"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2.5">
          <label className="block text-sm font-semibold text-gray-700">Mật khẩu</label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur opacity-0 group-focus-within:opacity-25 transition duration-300"></div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white font-medium"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-0 cursor-pointer accent-blue-600 transition-all"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Quên mật khẩu?
          </a>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-pulse">
            <p className="text-red-700 text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-md transform hover:scale-105 disabled:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Đang đăng nhập...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Đăng nhập</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500 font-medium">Hoặc</span>
        </div>
      </div>

      {/* Signup Link */}
      <div className="text-center">
        <p className="text-gray-700">
          Chưa có tài khoản?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
}
