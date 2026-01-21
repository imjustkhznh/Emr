import React, { useState, useEffect } from 'react';
import { DollarSign, Search, Filter, Download, Eye, FileText, Plus, Loader, X, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

// Format tiền tệ Việt Nam
const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Tạo dữ liệu fake hóa đơn
const generateFakeInvoices = () => {
  const patientNames = [
    'Nguyễn Văn A', 'Trần Thị B', 'Phạm Minh C', 'Đặng Quốc D', 'Bùi Hồng E',
    'Vũ Thế F', 'Hoàng Anh G', 'Lý Hữu H', 'Tô Thị I', 'Mạc Văn J',
    'Dương Thị K', 'Cao Minh L', 'Kiều Quốc M', 'Trương Thái N', 'Lê Hữu O',
    'Phan Thị P', 'Đinh Văn Q', 'Tạ Minh R', 'Đoàn Thị S', 'Giáp Quốc T'
  ];

  const services = [
    { name: 'Khám ngoại trú', price: 250000 },
    { name: 'Kiểm tra máu', price: 150000 },
    { name: 'X-quang', price: 300000 },
    { name: 'Siêu âm', price: 250000 },
    { name: 'CT scan', price: 800000 },
    { name: 'Điện tâm đồ', price: 100000 },
    { name: 'Phẫu thuật nhỏ', price: 1500000 },
    { name: 'Nhập viện nội khoa', price: 500000 },
    { name: 'Nhập viện ngoại khoa', price: 800000 },
    { name: 'Chăm sóc tập trung', price: 300000 }
  ];

  const statuses = ['paid', 'pending', 'overdue'];
  const invoices = [];

  for (let i = 1; i <= 500; i++) {
    const issuedDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const dueDate = new Date(issuedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    // Chọn 1-3 dịch vụ ngẫu nhiên
    const numServices = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;

    for (let j = 0; j < numServices; j++) {
      const service = services[Math.floor(Math.random() * services.length)];
      const quantity = Math.floor(Math.random() * 2) + 1;
      const amount = service.price * quantity;
      items.push({
        description: service.name,
        quantity,
        unitPrice: service.price,
        amount
      });
      subtotal += amount;
    }

    const tax = Math.floor(subtotal * 0.1);
    const total = subtotal + tax;

    let status = statuses[Math.floor(Math.random() * statuses.length)];
    let paidDate = null;

    if (status === 'paid') {
      paidDate = new Date(issuedDate.getTime() + Math.random() * 15 * 24 * 60 * 60 * 1000);
    }

    invoices.push({
      _id: `INV-${String(i).padStart(4, '0')}`,
      invoiceNumber: `HĐ-2024-${String(i).padStart(5, '0')}`,
      patientName: patientNames[Math.floor(Math.random() * patientNames.length)],
      patient: {
        _id: `PAT-${i}`,
        name: patientNames[Math.floor(Math.random() * patientNames.length)]
      },
      items,
      subtotal,
      tax,
      total,
      status,
      issuedDate,
      dueDate,
      paidDate,
      description: `Thanh toán các dịch vụ y tế`
    });
  }

  return invoices;
};

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    patientName: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, amount: 0 }],
    status: 'pending'
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      // Sử dụng dữ liệu fake
      const fakeInvoices = generateFakeInvoices();
      setInvoices(fakeInvoices);
    } catch (error) {
      console.error('Lỗi:', error);
      // Fallback vẫn dùng dữ liệu fake
      const fakeInvoices = generateFakeInvoices();
      setInvoices(fakeInvoices);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  const handleDownloadPDF = (invoice) => {
    try {
      // Tạo nội dung PDF
      let pdfContent = `HÓNG ĐƠN\n\n`;
      pdfContent += `Số hóa đơn: ${invoice.invoiceNumber}\n`;
      pdfContent += `Bệnh nhân: ${invoice.patientName}\n`;
      pdfContent += `Ngày phát hành: ${new Date(invoice.issuedDate).toLocaleDateString('vi-VN')}\n`;
      pdfContent += `Ngày hết hạn: ${new Date(invoice.dueDate).toLocaleDateString('vi-VN')}\n`;
      pdfContent += `Trạng thái: ${invoice.status}\n\n`;
      pdfContent += `DANH SÁCH DỤC VỤ:\n`;
      pdfContent += `${'-'.repeat(80)}\n`;
      
      let subtotal = 0;
      invoice.items.forEach((item, idx) => {
        pdfContent += `${idx + 1}. ${item.description}\n`;
        pdfContent += `   Số lượng: ${item.quantity} x ${formatVND(item.unitPrice)} = ${formatVND(item.amount)}\n`;
        subtotal += item.amount;
      });
      
      pdfContent += `${'-'.repeat(80)}\n`;
      pdfContent += `Tổng tiền hàng: ${formatVND(subtotal)}\n`;
      pdfContent += `Thuế (10%): ${formatVND(invoice.tax)}\n`;
      pdfContent += `TỔNG CỘNG: ${formatVND(invoice.total)}\n`;

      // Tải xuống file text (vì tạo PDF cần thư viện khác)
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdfContent));
      element.setAttribute('download', `${invoice.invoiceNumber}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      toast.success(`Tải xuống ${invoice.invoiceNumber} thành công!`);
    } catch (error) {
      console.error('Lỗi tải xuống:', error);
      toast.error('Lỗi khi tải xuống hóa đơn');
    }
  };

  const handleCreateInvoice = async () => {
    try {
      if (!formData.patientName.trim()) {
        toast.error('Vui lòng nhập tên bệnh nhân');
        return;
      }

      const totalAmount = formData.items.reduce((sum, item) => sum + item.amount, 0);
      const tax = totalAmount * 0.1;

      const newInvoice = {
        invoiceNumber: `HĐ-2024-${String(invoices.length + 1).padStart(5, '0')}`,
        patientName: formData.patientName,
        items: formData.items,
        subtotal: totalAmount,
        tax: tax,
        total: totalAmount + tax,
        status: formData.status,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        issuedDate: new Date()
      };

      const response = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(newInvoice)
      });

      const data = await response.json();
      if (data.success) {
        setInvoices([newInvoice, ...invoices]);
        setShowCreateModal(false);
        setFormData({
          invoiceNumber: '',
          patientName: '',
          items: [{ description: '', quantity: 1, unitPrice: 0, amount: 0 }],
          status: 'pending'
        });
        toast.success('Tạo hóa đơn thành công!');
      } else {
        toast.error(data.message || 'Lỗi khi tạo hóa đơn');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Lỗi khi tạo hóa đơn');
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        if (response.ok) {
          setInvoices(invoices.filter(inv => inv._id !== invoiceId));
          toast.success('Xóa hóa đơn thành công!');
        } else {
          toast.error('Lỗi khi xóa hóa đơn');
        }
      } catch (error) {
        console.error('Lỗi:', error);
        toast.error('Lỗi khi xóa hóa đơn');
      }
    }
  };

  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0, amount: 0 }]
    });
  };

  const removeItemRow = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === 'quantity' || field === 'unitPrice' ? Number(value) : value;
    
    // Tính amount
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const handlePayInvoice = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${selectedInvoice._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          status: 'paid',
          paidDate: new Date()
        })
      });

      const data = await response.json();
      if (data.success) {
        // Cập nhật trong state
        setInvoices(invoices.map(inv => 
          inv._id === selectedInvoice._id 
            ? { ...inv, status: 'paid', paidDate: new Date() }
            : inv
        ));
        
        // Cập nhật modal
        setSelectedInvoice({ ...selectedInvoice, status: 'paid', paidDate: new Date() });
        toast.success('Xác nhận thanh toán thành công!');
      } else {
        toast.error(data.message || 'Lỗi khi cập nhật trạng thái');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.invoiceNumber.includes(searchTerm) || 
                       inv.patient?.name?.includes(searchTerm);
    const matchStatus = filterStatus === 'all' || inv.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Tính toán pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  // Reset page khi filter thay đổi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.total, 0);
  const unpaid = invoices.filter(i => i.status === 'pending').length;
  const paid = invoices.filter(i => i.status === 'paid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-lg">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Hóa Đơn & Thanh Toán</h1>
            <p className="text-gray-600 mt-1">Quản lý hóa đơn và lịch sử thanh toán</p>
          </div>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Tạo Hóa Đơn
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng Thu', value: formatVND(totalRevenue), trend: '+12%', color: 'green' },
          { label: 'Chưa Thanh Toán', value: `${unpaid} HĐ`, trend: '-5%', color: 'red' },
          { label: 'Đã Thanh Toán', value: `${paid} HĐ`, trend: '+8%', color: 'blue' },
          { label: 'Trung Bình/HĐ', value: paid > 0 ? formatVND(totalRevenue / paid) : formatVND(0), trend: '+3%', color: 'purple' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-bold ${stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="outline-none bg-white font-semibold text-gray-700 cursor-pointer"
            >
              <option value="all">Tất Cả Trạng Thái</option>
              <option value="paid">Đã Thanh Toán</option>
              <option value="pending">Chờ Thanh Toán</option>
              <option value="overdue">Quá Hạn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto text-green-500" />
          </div>
        ) : filteredInvoices.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Hóa Đơn</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Bệnh Nhân</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Số Tiền</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ngày Hết Hạn</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Trạng Thái</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentInvoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{invoice.patientName || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{formatVND(invoice.total)}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(invoice.dueDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status === 'paid' ? 'Đã Thanh Toán' : 
                       invoice.status === 'pending' ? 'Chờ Thanh Toán' : 'Quá Hạn'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleViewInvoice(invoice)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDownloadPDF(invoice)}
                        className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteInvoice(invoice._id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Không có hóa đơn nào
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredInvoices.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                  {page}
                </button>
              );
            } else if (
              (page === 2 && currentPage > 3) ||
              (page === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              return (
                <span key={page} className="px-2 py-2 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
            Tiếp
          </button>

          <div className="ml-4 text-sm text-gray-600">
            Trang {currentPage} / {totalPages} | Tổng: {filteredInvoices.length} hóa đơn
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Chi Tiết Hóa Đơn</h2>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="hover:bg-blue-800 p-2 rounded-lg transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Invoice Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Số Hóa Đơn</p>
                    <p className="font-bold text-lg text-gray-900">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bệnh Nhân</p>
                    <p className="font-bold text-lg text-gray-900">{selectedInvoice.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ngày Phát Hành</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedInvoice.issuedDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ngày Hết Hạn</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedInvoice.dueDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Trạng Thái</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedInvoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                      selectedInvoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedInvoice.status === 'paid' ? 'Đã Thanh Toán' : 
                       selectedInvoice.status === 'pending' ? 'Chờ Thanh Toán' : 'Quá Hạn'}
                    </span>
                  </div>
                  {selectedInvoice.paidDate && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ngày Thanh Toán</p>
                      <p className="font-semibold text-green-600">{new Date(selectedInvoice.paidDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">Danh Sách Dịch Vụ</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold text-gray-700">Mô Tả</th>
                      <th className="px-4 py-2 text-right font-bold text-gray-700">Số Lượng</th>
                      <th className="px-4 py-2 text-right font-bold text-gray-700">Đơn Giá</th>
                      <th className="px-4 py-2 text-right font-bold text-gray-700">Thành Tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-gray-700">{item.description}</td>
                        <td className="px-4 py-2 text-right text-gray-700">{item.quantity}</td>
                        <td className="px-4 py-2 text-right text-gray-700">{formatVND(item.unitPrice)}</td>
                        <td className="px-4 py-2 text-right font-semibold text-gray-900">{formatVND(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 border-l-4 border-blue-600">
                <div className="flex justify-between">
                  <span className="text-gray-700">Tổng Tiền Hàng:</span>
                  <span className="font-semibold text-gray-900">{formatVND(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Thuế (10%):</span>
                  <span className="font-semibold text-gray-900">{formatVND(selectedInvoice.tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                  <span className="font-bold text-gray-900">TỔNG CỘNG:</span>
                  <span className="font-bold text-lg text-blue-600">{formatVND(selectedInvoice.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end pt-4 border-t">
                {selectedInvoice.status === 'pending' && (
                  <button 
                    onClick={handlePayInvoice}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                    ✓ Xác Nhận Thanh Toán
                  </button>
                )}
                <button 
                  onClick={() => handleDownloadPDF(selectedInvoice)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                  <Download className="h-4 w-4" />
                  Tải Xuống
                </button>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Tạo Hóa Đơn Mới</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="hover:bg-green-800 p-2 rounded-lg transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Bệnh Nhân *</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Nhập tên bệnh nhân"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng Thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="pending">Chờ Thanh Toán</option>
                  <option value="paid">Đã Thanh Toán</option>
                  <option value="overdue">Quá Hạn</option>
                </select>
              </div>

              {/* Items */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Danh Sách Dịch Vụ *</label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {formData.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg space-y-2 border-2 border-gray-200">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Mô tả dịch vụ"
                          value={item.description}
                          onChange={(e) => updateItem(idx, 'description', e.target.value)}
                          className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <input
                          type="number"
                          placeholder="Số lượng"
                          value={item.quantity}
                          onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <input
                          type="number"
                          placeholder="Đơn giá"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(idx, 'unitPrice', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">
                          Thành tiền: {formatVND(item.amount)}
                        </span>
                        {formData.items.length > 1 && (
                          <button
                            onClick={() => removeItemRow(idx)}
                            className="text-red-600 hover:text-red-700 text-sm font-bold"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addItemRow}
                  className="mt-3 w-full py-2 border-2 border-dashed border-green-500 text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors"
                >
                  + Thêm Dịch Vụ
                </button>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-600">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Tổng Tiền:</span>
                  <span className="font-semibold text-gray-900">
                    {formatVND(formData.items.reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Thuế (10%):</span>
                  <span className="font-semibold text-gray-900">
                    {formatVND(formData.items.reduce((sum, item) => sum + item.amount, 0) * 0.1)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-gray-300 mt-2">
                  <span className="font-bold text-gray-900">TỔNG CỘNG:</span>
                  <span className="font-bold text-lg text-green-600">
                    {formatVND(formData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end pt-4 border-t">
                <button 
                  onClick={handleCreateInvoice}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                  Tạo Hóa Đơn
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-bold transition-colors">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
