import React from 'react';

const Notifications = () => {
  const notifications = [
    {
      time: 'Hôm nay • 08:00',
      title: 'Nhắc lịch khám nội tổng quát',
      content: 'Bạn có lịch khám với BS. Nguyễn Thị Lan lúc 08:30 hôm nay.',
      type: 'appointment',
    },
    {
      time: 'Hôm qua • 15:20',
      title: 'Đã có kết quả xét nghiệm máu',
      content: 'Kết quả xét nghiệm ngày 01/03/2026 đã sẵn sàng.',
      type: 'result',
    },
  ];

  return (
    <div className="w-full px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-secondary-900 mb-4">
        Thông báo &amp; nhắc lịch khám
      </h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3 text-sm">
        {notifications.map((n, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 border border-gray-100 rounded-xl p-3 hover:border-primary-200"
          >
            <span
              className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                n.type === 'appointment'
                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                  : 'bg-green-50 text-green-700 border border-green-100'
              }`}
            >
              {n.type === 'appointment' ? 'Lịch khám' : 'Kết quả'}
            </span>
            <div>
              <p className="text-xs text-secondary-500">{n.time}</p>
              <p className="font-semibold text-secondary-900">{n.title}</p>
              <p className="text-secondary-600 text-xs mt-1">{n.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

