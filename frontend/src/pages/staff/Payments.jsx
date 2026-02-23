import React, { useEffect, useState } from 'react';
import { Download, DollarSign, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { samplePayments } from './sampleData';

const StaffPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setPayments(samplePayments);
    setLoading(false);
  }, []);

  const handleDownload = (payment) => {
    const content = `
====================================
        HÓA ĐƠN / PHIẾU THANH TOÁN
====================================

Mã hóa đơn: ${payment.id}
Bệnh nhân: ${payment.patientName} (${payment.patientId})
Số điện thoại: ${payment.patientPhone}

Bác sĩ: ${payment.doctorName}
Dịch vụ: ${payment.service}

Số tiền: ${payment.amount.toLocaleString('vi-VN')} VND
Hình thức thanh toán: ${payment.paymentMethod}

Ngày đến hạn: ${payment.dueDate}
Trạng thái: ${payment.status === 'paid' ? 'Đã thanh toán' : payment.status === 'pending' ? 'Chờ thanh toán' : 'Quá hạn'}
${payment.paymentDate ? `Ngày thanh toán: ${payment.paymentDate}` : ''}

====================================
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `hoa_don_${payment.id}_${payment.patientName}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const overdueCount = payments.filter(p => p.status === 'overdue').length;

  return (
    <div className="p-4 sm:px-6 md:px-8 py-6 w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý thanh toán</h1>
          <p className="text-gray-600 mt-2">Theo dõi và quản lý các hóa đơn, thanh toán bệnh nhân</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bệnh nhân, mã hóa đơn hoặc mã BN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="paid">Đã thanh toán</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="overdue">Quá hạn</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Tổng doanh thu</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{(totalAmount / 1000000).toFixed(1)}tr</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Đã thanh toán</p>
            <p className="text-2xl font-bold text-green-600 mt-2">{(paidAmount / 1000000).toFixed(1)}tr</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Chờ thanh toán</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Quá hạn</p>
            <p className="text-2xl font-bold text-red-600 mt-2">{overdueCount}</p>
          </div>
        </div>

        {/* Payments Table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-blue-500 text-lg font-semibold animate-pulse">Đang tải...</span>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Không tìm thấy hóa đơn nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mã HĐ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tên BN</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bác sĩ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Dịch vụ</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">Số tiền</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Hạn thanh toán</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900">{payment.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{payment.patientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{payment.doctorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{payment.service}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold text-right">{payment.amount.toLocaleString('vi-VN')} VND</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{payment.dueDate}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {payment.status === 'paid' ? (
                            <>
                              <CheckCircle size={14} /> Đã thanh toán
                            </>
                          ) : payment.status === 'pending' ? (
                            <>
                              <Clock size={14} /> Chờ thanh toán
                            </>
                          ) : (
                            <>
                              <AlertCircle size={14} /> Quá hạn
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDownload(payment)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                          title="Tải xuống hóa đơn"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPayments;
