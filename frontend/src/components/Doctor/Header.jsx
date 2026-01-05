import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell } from 'lucide-react';

const Header = ({ doctorName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-lg p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h11M9 21V3m12 7h-7m7 0l-3.5 3.5M19 10l-3.5-3.5"
              />
            </svg>
          </div>
          <span className="ml-2 text-lg font-bold text-gray-800">Hệ thống EMR</span>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500">
          <span className="hover:text-gray-700">Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">Tổng quan</span>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm bệnh nhân..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notification and User Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
          </button>
          <button onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            <span className="text-sm text-gray-500 hover:text-gray-700">Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
