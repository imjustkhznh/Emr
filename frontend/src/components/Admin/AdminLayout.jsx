import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  Pill,
  LogOut,
  Heart,
  BarChart3
} from 'lucide-react';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminLayout = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await userAPI.getProfile();
        setAdmin(user);
      } catch (error) {
        console.error('Không lấy được hồ sơ admin:', error);
        toast.error('Không lấy được thông tin admin');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const navItems = [
    { 
      name: 'Bảng Điều Khiển', 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: '/admin/dashboard' 
    },
    { 
      name: 'Quản Lý Bác Sĩ', 
      icon: <Stethoscope className="h-5 w-5" />, 
      path: '/admin/doctors' 
    },
    { 
      name: 'Quản Lý Bệnh Nhân', 
      icon: <Users className="h-5 w-5" />, 
      path: '/admin/patients' 
    },
    { 
      name: 'Cuộc Hẹn', 
      icon: <Calendar className="h-5 w-5" />, 
      path: '/admin/appointments' 
    },
    { 
      name: 'Khám Bệnh', 
      icon: <Stethoscope className="h-5 w-5" />, 
      path: '/admin/examinations' 
    },
    { 
      name: 'Báo Cáo Thống Kê', 
      icon: <BarChart3 className="h-5 w-5" />, 
      path: '/admin/reports' 
    },
    { 
      name: 'Đơn Thuốc', 
      icon: <Pill className="h-5 w-5" />, 
      path: '/admin/prescriptions' 
    },
  ];

  const displayName = admin?.name || 'Đang tải...';
  const initials = admin?.name
    ? admin.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase())
        .join('')
        .slice(0, 2)
    : 'AD';

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-[#1E293B] text-[#F1F5F9]">
          {/* Logo */}
          <div className="flex items-center justify-center py-4 border-b border-[#334155]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg p-2">
                <Heart className="h-6 w-6 fill-white" />
              </div>
              <h1 className="text-lg font-bold text-[#F1F5F9]">MediCare Admin</h1>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[#334155]">
            <div className="flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full h-10 w-10 font-bold">
              {loading ? '...' : initials}
            </div>
            <div>
              <p className="text-sm font-medium text-[#F1F5F9]">{displayName}</p>
              <p className="text-xs text-[#64748B]">Quản Trị Viên</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition ${
                  location.pathname === item.path
                    ? 'bg-[#334155] text-[#EF4444]'
                    : 'hover:bg-[#334155] hover:text-[#F1F5F9]'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-[#334155] p-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-[#F1F5F9] hover:text-[#EF4444] transition"
            >
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </button>
            <p className="text-xs text-[#64748B] mt-2">Admin v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {location.pathname === '/admin/dashboard' && 'Bảng Điều Khiển Quản Trị'}
              {location.pathname === '/admin/doctors' && 'Quản Lý Bác Sĩ'}
              {location.pathname === '/admin/patients' && 'Quản Lý Bệnh Nhân'}
              {location.pathname === '/admin/appointments' && 'Quản Lý Cuộc Hẹn'}
              {location.pathname === '/admin/examinations' && 'Quản Lý Khám Bệnh'}
              {location.pathname === '/admin/reports' && 'Báo Cáo Thống Kê'}
              {location.pathname === '/admin/prescriptions' && 'Quản Lý Đơn Thuốc'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
