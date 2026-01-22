import React, { useState } from 'react';
import { Bell, Trash2, Check, AlertCircle, Info, Calendar } from 'lucide-react';

const Notifications = () => {
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'prescription':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'result':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'payment':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={20} />;
      case 'result':
      case 'info':
        return <Info size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'appointment':
        return 'Lịch hẹn';
      case 'prescription':
        return 'Đơn thuốc';
      case 'result':
        return 'Kết quả';
      case 'payment':
        return 'Thanh toán';
      default:
        return 'Thông tin';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Thông Báo</h1>
        <p className="text-indigo-100">Quản lý tất cả thông báo của bạn</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow border-l-4 border-indigo-500">
          <p className="text-gray-600 text-sm">Chưa đọc</p>
          <p className="text-2xl font-bold text-indigo-600">{notifications.filter(n => !n.read).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Tổng cộng</p>
          <p className="text-2xl font-bold text-green-600">{notifications.length}</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="grid gap-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border-l-4 ${getTypeColor(notif.type)} ${!notif.read ? 'border-opacity-100' : 'opacity-75'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-lg ${getTypeColor(notif.type)}`}>
                  {getTypeIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{notif.title}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTypeColor(notif.type)}`}>
                      {getTypeLabel(notif.type)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">{new Date(notif.date).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              {!notif.read && (
                <div className="w-3 h-3 bg-indigo-500 rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>
            <div className="flex gap-2 ml-16">
              {!notif.read && (
                <button onClick={() => markAsRead(notif.id)} className="flex-1 bg-indigo-100 text-indigo-700 py-2 rounded-lg hover:bg-indigo-200 transition flex items-center justify-center gap-1 text-sm font-semibold">
                  <Check size={14} /> Đánh dấu đã đọc
                </button>
              )}
              <button onClick={() => deleteNotification(notif.id)} className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-1 text-sm font-semibold">
                <Trash2 size={14} /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Bell size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Không có thông báo nào</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
