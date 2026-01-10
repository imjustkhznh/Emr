import React from 'react';

const Appointments = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-secondary-900 mb-4">Đặt lịch khám bác sĩ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Thông tin lịch khám</h2>
          <form className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-secondary-600 mb-1">Chuyên khoa</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Nội tổng quát</option>
                  <option>Tim mạch</option>
                  <option>Sản phụ khoa</option>
                  <option>Nhi khoa</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-600 mb-1">Bác sĩ</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Bất kỳ bác sĩ phù hợp</option>
                  <option>BS. Nguyễn Thị Lan</option>
                  <option>BS. Trần Văn Minh</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-600 mb-1">Ngày khám</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-secondary-600 mb-1">Khung giờ</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>08:00 - 09:00</option>
                  <option>09:00 - 10:00</option>
                  <option>14:00 - 15:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-secondary-600 mb-1">Lý do khám</label>
              <textarea
                rows={3}
                placeholder="Ví dụ: khám sức khỏe định kỳ, đau đầu kéo dài..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-200 text-secondary-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              >
                Xác nhận đặt lịch
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-sm space-y-4">
          <h2 className="text-base font-semibold text-secondary-900">Lịch khám sắp tới</h2>
          <div className="space-y-3">
            <div className="border border-primary-100 rounded-xl p-3 bg-primary-50/40">
              <p className="text-xs text-secondary-500">Ngày 12/03/2026 • 08:30</p>
              <p className="font-semibold text-secondary-900">BS. Nguyễn Thị Lan</p>
              <p className="text-xs text-secondary-500">Nội tổng quát • Tình trạng: Đã xác nhận</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-secondary-500">Ngày 20/03/2026 • 14:00</p>
              <p className="font-semibold text-secondary-900">BS. Trần Văn Minh</p>
              <p className="text-xs text-secondary-500">Tim mạch • Tình trạng: Đang chờ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

