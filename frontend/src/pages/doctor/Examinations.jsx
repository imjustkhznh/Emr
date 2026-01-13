import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Eye, User } from 'lucide-react';
import { examinationAPI, userAPI } from '../../services/apiService';
import { toast } from 'react-toastify';

const Examinations = () => {
  // States
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [examinations, setExaminations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    symptoms: '',
    findings: '',
    treatment: '',
    notes: '',
    status: 'completed',
  });

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get patients
      const patRes = await userAPI.getAll();
      setPatients(patRes.data?.data || []);
      
      // Get examinations
      const examRes = await examinationAPI.getAll();
      const exams = examRes.data?.data || [];
      
      const transformed = exams.map((exam) => ({
        id: exam._id,
        patientId: exam.patientId,
        patientName: exam.patientInfo?.name || 'Unknown',
        patientCode: exam.patientInfo?.patientCode || 'N/A',
        diagnosis: exam.diagnosis || '',
        symptoms: Array.isArray(exam.symptoms) ? exam.symptoms.join(', ') : '',
        findings: exam.findings || '',
        treatment: exam.treatment || '',
        notes: exam.notes || '',
        status: exam.status || 'completed',
        examinationDate: exam.examinationDate,
      }));
      
      setExaminations(transformed);
    } catch (error) {
      console.error('Load error:', error);
      toast.error('Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patientId) {
      toast.error('Chọn bệnh nhân');
      return;
    }
    
    if (!formData.diagnosis) {
      toast.error('Nhập chẩn đoán');
      return;
    }

    try {
      const data = {
        patientId: formData.patientId,
        diagnosis: formData.diagnosis,
        symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(s => s),
        findings: formData.findings,
        treatment: formData.treatment,
        notes: formData.notes,
        status: formData.status,
      };

      if (editingId) {
        await examinationAPI.update(editingId, data);
        toast.success('Cập nhật thành công');
      } else {
        await examinationAPI.create(data);
        toast.success('Tạo thành công');
      }

      setFormData({
        patientId: '',
        diagnosis: '',
        symptoms: '',
        findings: '',
        treatment: '',
        notes: '',
        status: 'completed',
      });
      setEditingId(null);
      setShowForm(false);
      
      loadData();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (exam) => {
    setFormData({
      patientId: exam.patientId,
      diagnosis: exam.diagnosis,
      symptoms: exam.symptoms,
      findings: exam.findings,
      treatment: exam.treatment,
      notes: exam.notes,
      status: exam.status,
    });
    setEditingId(exam.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await examinationAPI.delete(id);
      toast.success('Xóa thành công');
      loadData();
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Lỗi xóa');
    }
  };

  const handleDownload = (exam) => {
    const content = `PHIẾU KHÁM BỆNH
========================
Bệnh nhân: ${exam.patientName}
Mã BN: ${exam.patientCode}

Chẩn đoán: ${exam.diagnosis}
Triệu chứng: ${exam.symptoms}
Phát hiện: ${exam.findings}
Điều trị: ${exam.treatment}
Ghi chú: ${exam.notes}
Trạng thái: ${exam.status}
========================`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phieu-kham-${exam.patientCode}.txt`;
    a.click();
  };

  // Filter
  const filtered = examinations.filter(ex => {
    const matchSearch = ex.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.patientCode.includes(searchTerm) ||
      ex.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || ex.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: examinations.length,
    completed: examinations.filter(e => e.status === 'completed').length,
    pending: examinations.filter(e => e.status === 'pending').length,
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản Lý Phiếu Khám</h1>
            <p className="text-gray-600 mt-1">Tạo, xem, chỉnh sửa và xóa phiếu khám bệnh</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                patientId: '',
                diagnosis: '',
                symptoms: '',
                findings: '',
                treatment: '',
                notes: '',
                status: 'completed',
              });
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Plus size={20} />
            Thêm Phiếu Khám
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-semibold">Tổng Phiếu Khám</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-semibold">Hoàn Thành</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-semibold">Chờ Xử Lý</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Chỉnh Sửa Phiếu Khám' : 'Tạo Phiếu Khám Mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Bệnh nhân *</label>
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Chọn bệnh nhân --</option>
                    {patients.map((p, idx) => (
                      <option key={p._id} value={p._id}>
                        BN{String(idx + 1).padStart(3, '0')} - {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Chẩn đoán *</label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    placeholder="Nhập chẩn đoán"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Triệu chứng</label>
                <input
                  type="text"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Sốt cao, Ho (cách nhau bằng dấu phẩy)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Kết quả kiểm tra</label>
                  <input
                    type="text"
                    name="findings"
                    value={formData.findings}
                    onChange={handleInputChange}
                    placeholder="Nhập kết quả"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phương pháp điều trị</label>
                  <input
                    type="text"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleInputChange}
                    placeholder="Nhập phương pháp"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Ghi chú</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Nhập ghi chú"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Trạng thái</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="completed">Hoàn thành</option>
                    <option value="pending">Chờ xử lý</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  {editingId ? 'Cập Nhật' : 'Tạo Phiếu Khám'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã BN hoặc chẩn đoán..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-40"
          >
            <option value="all">Tất cả</option>
            <option value="completed">Hoàn thành</option>
            <option value="pending">Chờ xử lý</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Bệnh Nhân</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Mã BN</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Chẩn Đoán</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Trạng Thái</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      Không có phiếu khám nào
                    </td>
                  </tr>
                ) : (
                  filtered.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span className="font-medium">{exam.patientName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-blue-600">{exam.patientCode}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{exam.diagnosis}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          exam.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {exam.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedExam(exam);
                              setShowViewModal(true);
                            }}
                            className="p-2 hover:bg-blue-100 rounded text-blue-600"
                            title="Xem"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(exam)}
                            className="p-2 hover:bg-orange-100 rounded text-orange-600"
                            title="Sửa"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDownload(exam)}
                            className="p-2 hover:bg-green-100 rounded text-green-600"
                            title="Tải"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(exam.id)}
                            className="p-2 hover:bg-red-100 rounded text-red-600"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Chi Tiết Phiếu Khám</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bệnh Nhân</p>
                  <p className="font-semibold">{selectedExam.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mã BN</p>
                  <p className="font-semibold text-blue-600">{selectedExam.patientCode}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Chẩn Đoán</p>
                <p className="font-semibold">{selectedExam.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Triệu Chứng</p>
                <p>{selectedExam.symptoms || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kết Quả</p>
                <p>{selectedExam.findings || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Điều Trị</p>
                <p>{selectedExam.treatment || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ghi Chú</p>
                <p>{selectedExam.notes || '-'}</p>
              </div>
            </div>
            <div className="p-6 border-t flex gap-2">
              <button
                onClick={() => handleDownload(selectedExam)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Tải xuống
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold">Xác Nhận Xóa</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700">Bạn chắc chắn muốn xóa không?</p>
            </div>
            <div className="p-6 border-t flex gap-2">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Examinations;
