import React from 'react';

const Telemedicine = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-5">
      <h1 className="text-2xl font-semibold text-secondary-900">
        Tư vấn trực tuyến với bác sĩ (Telemedicine)
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-sm space-y-4">
        <p className="text-secondary-600">
          Đặt lịch tư vấn video/voice với bác sĩ mà không cần đến trực tiếp bệnh viện.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="font-semibold text-secondary-900 mb-1">Chọn hình thức tư vấn</p>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Video call</option>
              <option>Cuộc gọi thoại</option>
              <option>Chat trực tuyến</option>
            </select>
          </div>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="font-semibold text-secondary-900 mb-1">Thời lượng</p>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>15 phút</option>
              <option>30 phút</option>
              <option>45 phút</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-secondary-600 mb-1">Mô tả vấn đề sức khỏe</label>
          <textarea
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Ví dụ: đau đầu kéo dài, khó ngủ, mệt mỏi..."
          />
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-secondary-700 hover:bg-gray-50">
            Hủy
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
            Đặt lịch tư vấn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;

