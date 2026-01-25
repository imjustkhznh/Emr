import React, { useState } from 'react';
import { Search, Phone, Globe2, LogOut, Bell, Trash2, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PatientNavbar = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'appointment', title: 'Lịch khám sắp diễn ra', message: 'Khám bệnh với Dr. Trần Hữu Bình vào ngày 15/02 lúc 09:00 AM', date: '2025-02-10', read: false },
    { id: 2, type: 'prescription', title: 'Đơn thuốc mới', message: 'Bác sĩ vừa kê đơn thuốc Amoxicillin 500mg cho bạn', date: '2025-02-08', read: false },
    { id: 3, type: 'result', title: 'Kết quả xét nghiệm sẵn sàng', message: 'Kết quả xét nghiệm máu của bạn đã sẵn sàng để xem', date: '2025-02-05', read: true },
  ]);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  const initials =
    user?.name &&
    user.name
      .split(' ')
      .filter(Boolean)
      .map((p) => p[0]?.toUpperCase())
      .join('')
      .slice(0, 2);

  const unreadCount = notifications.filter(n => !n.read).length;

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'border-l-4 border-blue-400';
      case 'prescription':
        return 'border-l-4 border-purple-400';
      case 'result':
        return 'border-l-4 border-green-400';
      case 'payment':
        return 'border-l-4 border-orange-400';
      default:
        return 'border-l-4 border-gray-400';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <span>Địa chỉ: 100 Nguyễn Huệ, Quận 1, TP.HCM</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Globe2 className="w-3 h-3" /> Hỗ trợ khách hàng
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Ngôn ngữ: VI</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
            >
              <LogOut className="w-3 h-3" /> Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-6">
        {/* Logo */}
        <Link to="/patient/home" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
            Y
          </div>
          <div className="leading-tight">
            <p className="font-bold text-primary-700 text-sm">Hệ thống y tế MediCare EMR</p>
            <p className="text-[11px] text-gray-500">Chăm sóc sức khỏe toàn diện</p>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm gói khám, xét nghiệm, bác sĩ..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Hotline, Notifications & user */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <Phone className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <p className="text-[11px] text-gray-500">Đường dây nóng</p>
              <p className="font-semibold text-primary-700 text-sm">1900 123 456</p>
            </div>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                {/* Header */}
                <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Thông báo ({notifications.length})</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Notification List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition ${getNotificationColor(notif.type)} ${!notif.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{notif.title}</p>
                            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(notif.date).toLocaleDateString('vi-VN')}</p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="p-1 hover:bg-blue-100 rounded text-blue-600 transition"
                                title="Đánh dấu đã đọc"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="p-1 hover:bg-red-100 rounded text-red-600 transition"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Không có thông báo</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="border-t border-gray-200 p-3 bg-gray-50">
                    <button
                      onClick={markAllAsRead}
                      disabled={unreadCount === 0}
                      className="text-xs font-semibold text-primary-600 hover:text-primary-700 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                    >
                      ✓ Đánh dấu tất cả là đã đọc
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/patient/profile" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-semibold group-hover:bg-primary-600 group-hover:text-white transition-colors">
              {initials || 'BN'}
            </div>
            <div className="hidden sm:block leading-tight max-w-[140px] text-left">
              <p className="text-xs font-medium text-gray-800 truncate group-hover:text-primary-700">
                {user?.name || 'Bệnh nhân'}
              </p>
              <p className="text-[11px] text-gray-500">Xem hồ sơ &amp; thông tin cá nhân</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PatientNavbar;

