import React, { useState } from 'react';
import { CreditCard, Download, Filter, Calendar, Clock } from 'lucide-react';

const Payments = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [payments] = useState([
    { id: 1, description: 'Khám bệnh - Phòng 301', doctor: 'Dr. Trần Hữu Bình', date: '2025-01-15', amount: 500000, status: 'paid', paymentMethod: 'Transfer' },
    { id: 2, description: 'Xét nghiệm Máu', doctor: 'Dr. Đặng Ngọc Hiểu', date: '2025-01-20', amount: 300000, status: 'paid', paymentMethod: 'Card' },
    { id: 3, description: 'Siêu âm Tim', doctor: 'Dr. Phạm Mạnh Dũng', date: '2025-01-22', amount: 800000, status: 'pending', paymentMethod: 'Pending' },
    { id: 4, description: 'Tư vấn Dinh dưỡng', doctor: 'Dr. Lê Thanh Tùng', date: '2025-02-01', amount: 250000, status: 'pending', paymentMethod: 'Pending' },
    { id: 5, description: 'Khám bệnh - Follow-up', doctor: 'Dr. Trần Hữu Bình', date: '2024-12-28', amount: 500000, status: 'paid', paymentMethod: 'Cash' }
  ]);

  const filteredPayments = filterStatus === 'all' ? payments : payments.filter(p => p.status === filterStatus);
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="mb-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Lịch Sử Thanh Toán</h1>
        <p className="text-orange-100">Quản lý các khoản thanh toán và hóa đơn</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Đã thanh toán</p>
          <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} đ</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">Đang chờ</p>
          <p className="text-2xl font-bold text-yellow-600">{totalPending.toLocaleString()} đ</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Tổng cộng</p>
          <p className="text-2xl font-bold text-blue-600">{(totalPaid + totalPending).toLocaleString()} đ</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <button onClick={() => setFilterStatus('all')} className={`px-6 py-2 rounded-lg font-semibold transition ${filterStatus === 'all' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}>Tất cả</button>
        <button onClick={() => setFilterStatus('paid')} className={`px-6 py-2 rounded-lg font-semibold transition ${filterStatus === 'paid' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}>Đã thanh toán</button>
        <button onClick={() => setFilterStatus('pending')} className={`px-6 py-2 rounded-lg font-semibold transition ${filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}>Chưa thanh toán</button>
      </div>

      <div className="grid gap-4">
        {filteredPayments.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-lg ${p.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <CreditCard className={p.status === 'paid' ? 'text-green-600' : 'text-yellow-600'} size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{p.description}</h3>
                  <p className="text-gray-600 text-sm">{p.doctor}</p>
                </div>
              </div>
              <span className={`text-2xl font-bold ${p.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                {p.amount.toLocaleString()} đ
              </span>
            </div>
            <div className="flex gap-4 mb-4 text-sm text-gray-600">
              <span className="flex items-center gap-1"><Calendar size={14} className="text-orange-500" /> {new Date(p.date).toLocaleDateString('vi-VN')}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {p.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-orange-100 text-orange-700 py-2 rounded-lg hover:bg-orange-200 transition flex items-center justify-center gap-1">
                <Download size={16} /> Hóa đơn
              </button>
              {p.status === 'pending' && (
                <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition font-semibold">Thanh toán</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
