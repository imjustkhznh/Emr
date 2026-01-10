import React from 'react';

const Payments = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-5">
      <h1 className="text-2xl font-semibold text-secondary-900">Thanh toán viện phí trực tuyến</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 text-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-secondary-600">Hóa đơn cần thanh toán</p>
            <p className="text-2xl font-bold text-primary-600 mt-1">1.250.000₫</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-secondary-700 hover:bg-gray-50">
              Xem chi tiết hóa đơn
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
              Thanh toán ngay
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-100 rounded-xl p-3">
            <p className="font-semibold text-secondary-900 mb-1">Thẻ ngân hàng</p>
            <p className="text-xs text-secondary-500">
              Hỗ trợ Visa, MasterCard, Napas qua cổng thanh toán bảo mật.
            </p>
          </div>
          <div className="border border-gray-100 rounded-xl p-3">
            <p className="font-semibold text-secondary-900 mb-1">Ví điện tử</p>
            <p className="text-xs text-secondary-500">
              Liên kết với các ví phổ biến như Momo, ZaloPay, ShopeePay.
            </p>
          </div>
          <div className="border border-gray-100 rounded-xl p-3">
            <p className="font-semibold text-secondary-900 mb-1">Chuyển khoản</p>
            <p className="text-xs text-secondary-500">
              Thực hiện chuyển khoản theo hướng dẫn, hệ thống sẽ tự động đối soát.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;

