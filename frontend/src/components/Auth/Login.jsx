import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Stethoscope, Heart, ArrowRight } from 'lucide-react';
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
      
      // Lưu token vào localStorage
      const tokenToStore = response?.accessToken || response?.token;
      if (tokenToStore) {
        localStorage.setItem('accessToken', tokenToStore);
        localStorage.setItem('token', tokenToStore);
      }
      
      // Lưu user object từ response backend (có chứa _id)
      if (response?.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      try {
        // Kiểm tra định dạng token
        if (typeof response.accessToken !== 'string' || !response.accessToken) {
          throw new Error('Token không hợp lệ hoặc không tồn tại');
        }

        // Giải mã token để lấy role
        const decodedToken = jwtDecode(response.accessToken);
        
        toast.success('Đăng nhập thành công!');
        
        // Chuyển hướng dựa trên vai trò
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
    <>
      {/* ...removed logo/title row... */}
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Mật khẩu</label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-300"></div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
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
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-0 focus:border-blue-600 cursor-pointer accent-blue-600 transition-colors"
              />
            </div>
            <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">Quên mật khẩu?</a>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Đang đăng nhập...</span>
            </>
          ) : (
            <>
              <span>Đăng nhập</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Hoặc</span>
        </div>
      </div>
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          Chưa có tài khoản?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline"
          >
            Đăng ký tại đây
          </button>
        </p>
      </div>
    </>
  );
}
