import React, { useState } from 'react';
import { CreditCard, Download, Eye, Calendar, Search, X, CheckCircle } from 'lucide-react';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [payments, setPayments] = useState([
    { id: 1, description: 'Khám bệnh - Phòng 301', doctor: 'Dr. Trần Hữu Bình', date: '2025-01-15', amount: 500000, status: 'paid', paymentMethod: 'Transfer' },
    { id: 2, description: 'Xét nghiệm Máu', doctor: 'Dr. Đặng Ngọc Hiểu', date: '2025-01-20', amount: 300000, status: 'paid', paymentMethod: 'Card' },
    { id: 3, description: 'Siêu âm Tim', doctor: 'Dr. Phạm Mạnh Dũng', date: '2025-01-22', amount: 800000, status: 'pending', paymentMethod: 'Pending' },
    { id: 4, description: 'Tư vấn Dinh dưỡng', doctor: 'Dr. Lê Thanh Tùng', date: '2025-02-01', amount: 250000, status: 'pending', paymentMethod: 'Pending' },
    { id: 5, description: 'Khám bệnh - Follow-up', doctor: 'Dr. Trần Hữu Bình', date: '2024-12-28', amount: 500000, status: 'paid', paymentMethod: 'Cash' }
  ]);

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  // Xem chi tiết thanh toán
  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  // Tải hóa đơn
  const handleDownloadInvoice = (payment) => {
    const invoiceContent = `
HOÀN ĐƠN THANH TOÁN
=====================================
Ngày in: ${new Date().toLocaleDateString('vi-VN')}

THÔNG TIN DỊCH VỤ:
Dịch vụ: ${payment.description}
Bác sĩ: ${payment.doctor}
Ngày thanh toán: ${new Date(payment.date).toLocaleDateString('vi-VN')}

THÔNG TIN THANH TOÁN:
Số tiền: ${payment.amount.toLocaleString()} đ
Phương thức: ${payment.paymentMethod}
Trạng thái: ${payment.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}

=====================================
Cảm ơn bạn đã sử dụng dịch vụ!
    `.trim();

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceContent));
    element.setAttribute('download', `HoaDon_${payment.id}_${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Xử lý thanh toán
  const handlePayment = (payment) => {
    setPaymentModal(payment);
    setPaymentSuccess(false);
    setPaymentMethod('card');
  };

  // Xác nhận thanh toán
  const handleConfirmPayment = () => {
    // Cập nhật trạng thái thanh toán
    const updatedPayments = payments.map(p =>
      p.id === paymentModal.id
        ? { ...p, status: 'paid', paymentMethod: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1) }
        : p
    );
    setPayments(updatedPayments);
    setPaymentSuccess(true);

    // Đóng modal sau 2 giây
    setTimeout(() => {
      setPaymentModal(null);
      setSelectedPayment(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Lịch Sử Thanh Toán</h1>
          <p className="text-base text-gray-600">Quản lý các khoản thanh toán và hóa đơn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-200 rounded-lg p-3">
                <CreditCard className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700">Đã Thanh Toán</p>
                <p className="text-2xl font-bold text-green-900">{totalPaid.toLocaleString()} đ</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-orange-200 rounded-lg p-3">
                <Calendar className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-orange-700">Đang Chờ Thanh Toán</p>
                <p className="text-2xl font-bold text-orange-900">{totalPending.toLocaleString()} đ</p>
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
              placeholder="Tìm kiếm dịch vụ, bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus('paid')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'paid'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
            }`}
          >
            Đã thanh toán
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'pending'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
            }`}
          >
            Chưa thanh toán
          </button>
        </div>

        {/* Payments Grid */}
        <div className="grid gap-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg border border-purple-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`rounded-lg p-2.5 ${
                      p.status === 'paid'
                        ? 'bg-green-50'
                        : 'bg-orange-50'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        p.status === 'paid'
                          ? 'text-green-600'
                          : 'text-orange-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{p.description}</h3>
                      <p className="text-sm text-gray-600">Bác sĩ: {p.doctor}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">{p.amount.toLocaleString()} đ</span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                        p.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {p.status === 'paid' ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-5 text-sm bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Ngày Thanh Toán</p>
                    <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      {new Date(p.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Phương Thức</p>
                    <p className="font-semibold text-gray-900 mt-1">{p.paymentMethod}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(p)}
                    className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> Xem Chi Tiết
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(p)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Tải Hóa Đơn
                  </button>
                  {p.status === 'pending' && (
                    <button
                      onClick={() => handlePayment(p)}
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2.5 rounded-lg transition"
                    >
                      Thanh Toán
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-purple-100">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Không tìm thấy khoản thanh toán nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Xem Chi Tiết */}
      {selectedPayment && !paymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Chi Tiết Thanh Toán</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Dịch vụ</p>
                <p className="text-lg font-semibold text-gray-900">{selectedPayment.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bác sĩ</p>
                <p className="text-lg font-semibold text-gray-900">{selectedPayment.doctor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày</p>
                <p className="text-lg font-semibold text-gray-900">{new Date(selectedPayment.date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số tiền</p>
                <p className="text-2xl font-bold text-purple-600">{selectedPayment.amount.toLocaleString()} đ</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phương thức</p>
                <p className="text-lg font-semibold text-gray-900">{selectedPayment.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <p className={`text-lg font-semibold ${selectedPayment.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                  {selectedPayment.status === 'paid' ? '✓ Đã thanh toán' : '⏳ Chưa thanh toán'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPayment(null)}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Modal Thanh Toán */}
      {paymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            {!paymentSuccess ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Thanh Toán Hóa Đơn</h2>
                  <button
                    onClick={() => setPaymentModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-2">Số tiền thanh toán</p>
                  <p className="text-3xl font-bold text-purple-600">{paymentModal.amount.toLocaleString()} đ</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Chọn phương thức thanh toán:</p>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition" style={{ borderColor: paymentMethod === 'card' ? '#a855f7' : '' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span className="font-semibold text-gray-900">Thẻ Tín Dụng/Ghi Nợ</span>
                    </label>
                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition" style={{ borderColor: paymentMethod === 'transfer' ? '#a855f7' : '' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span className="font-semibold text-gray-900">Chuyển Khoản Ngân Hàng</span>
                    </label>
                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition" style={{ borderColor: paymentMethod === 'wallet' ? '#a855f7' : '' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="wallet"
                        checked={paymentMethod === 'wallet'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <span className="font-semibold text-gray-900">Ví Điện Tử</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPaymentModal(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Xác Nhận
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanh Toán Thành Công!</h3>
                <p className="text-gray-600 mb-4">Hóa đơn của bạn đã được thanh toán thành công.</p>
                <p className="text-2xl font-bold text-purple-600">{paymentModal.amount.toLocaleString()} đ</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
