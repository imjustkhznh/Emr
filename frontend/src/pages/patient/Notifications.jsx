import React, { useState } from 'react';
import { Bell, Trash2, Check, Clock, CheckCircle2, AlertCircle, Pill, CreditCard, Search } from 'lucide-react';

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'appointment', title: 'Lịch khám sắp diễn ra', message: 'Khám bệnh với Dr. Trần Hữu Bình vào ngày 15/02 lúc 09:00 AM', date: '2025-02-10', read: false },
    { id: 2, type: 'prescription', title: 'Đơn thuốc mới', message: 'Bác sĩ vừa kê đơn thuốc Amoxicillin 500mg cho bạn', date: '2025-02-08', read: false },
    { id: 3, type: 'result', title: 'Kết quả xét nghiệm sẵn sàng', message: 'Kết quả xét nghiệm máu của bạn đã sẵn sàng để xem', date: '2025-02-05', read: true },
    { id: 4, type: 'payment', title: 'Thanh toán đến hạn', message: 'Khoản thanh toán 800.000đ cho siêu âm tim cần được hoàn tất trong 3 ngày', date: '2025-02-03', read: false },
    { id: 5, type: 'info', title: 'Thông báo bảo trì hệ thống', message: 'Hệ thống sẽ bảo trì vào ngày 20/02 từ 22:00 - 23:00', date: '2025-02-01', read: true }
  ]);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || n.type === filterType;
    const matchesRead = filterType === 'unread' ? !n.read : true;
    return matchesSearch && matchesType && matchesRead;
  });

  const getTypeColor = (type) => {
    const colors = {
      'appointment': { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-100 text-blue-800' },
      'prescription': { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-100 text-purple-800' },
      'result': { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', badge: 'bg-green-100 text-green-800' },
      'payment': { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', badge: 'bg-orange-100 text-orange-800' },
      'info': { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'bg-cyan-100 text-cyan-600', badge: 'bg-cyan-100 text-cyan-800' }
    };
    return colors[type] || colors['info'];
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Clock size={20} />;
      case 'prescription':
        return <Pill size={20} />;
      case 'result':
        return <CheckCircle2 size={20} />;
      case 'payment':
        return <CreditCard size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      'appointment': 'Lịch hẹn',
      'prescription': 'Đơn thuốc',
      'result': 'Kết quả',
      'payment': 'Thanh toán',
      'info': 'Thông tin'
    };
    return labels[type] || 'Thông tin';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Thông Báo</h1>
          <p className="text-base text-gray-600">Quản lý và theo dõi tất cả thông báo của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-red-200 rounded-lg p-3">
                <Bell className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-red-700">Chưa Đọc</p>
                <p className="text-2xl font-bold text-red-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 rounded-lg p-3">
                <CheckCircle2 className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Tổng Thông Báo</p>
                <p className="text-2xl font-bold text-blue-900">{notifications.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm thông báo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterType === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => {
              setFilterType('unread');
              setSearchTerm('');
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterType === 'unread'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-red-300'
            }`}
          >
            Chưa đọc ({unreadCount})
          </button>
          <button
            onClick={() => setFilterType('appointment')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterType === 'appointment'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
            }`}
          >
            Lịch hẹn
          </button>
          <button
            onClick={() => setFilterType('result')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterType === 'result'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
            }`}
          >
            Kết quả
          </button>
          <button
            onClick={() => setFilterType('payment')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterType === 'payment'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
            }`}
          >
            Thanh toán
          </button>
        </div>

        {/* Notifications List */}
        <div className="grid gap-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const colors = getTypeColor(notif.type);
              return (
                <div
                  key={notif.id}
                  className={`${colors.bg} ${colors.border} rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow ${!notif.read ? 'ring-2 ring-offset-2 ring-purple-300' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${colors.icon} rounded-lg p-2.5 flex-shrink-0`}>
                        {getTypeIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{notif.title}</h3>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
                            {getTypeLabel(notif.type)}
                          </span>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{notif.message}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(notif.date).toLocaleDateString('vi-VN')} {new Date(notif.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pl-14">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <Check size={16} />
                        Đánh dấu đã đọc
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Xóa
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-purple-100">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                {searchTerm ? 'Không tìm thấy thông báo nào' : 'Không có thông báo nào'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
