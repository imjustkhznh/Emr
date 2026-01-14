import React, { useEffect, useState } from 'react';
import { Stethoscope, Search, Edit2, Trash2, Plus, Eye } from 'lucide-react';
import { examinationAPI } from '../../services/apiService';
import { toast } from 'react-toastify';

const AdminExaminations = () => {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      setLoading(true);
      const response = await examinationAPI.getAll();
      const data = response?.data?.data || [];
      setExaminations(data);
    } catch (error) {
      console.error('Error fetching examinations:', error);
      toast.error('Không thể tải danh sách khám bệnh');
      setExaminations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredExaminations = examinations.filter(exam =>
    exam.patientInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa hồ sơ khám này?')) {
      try {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        await fetch(`http://localhost:3001/api/examinations/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setExaminations(examinations.filter(e => e._id !== id));
        toast.success('Xóa hồ sơ khám thành công');
      } catch (error) {
        toast.error('Không thể xóa hồ sơ khám');
      }
    }
  };

  const handleViewDetails = (exam) => {
    setSelectedExam(exam);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-transparent flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-purple-600" />
          Quản Lý Khám Bệnh
        </h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition">
          <Plus className="h-5 w-5" />
          Thêm Khám Bệnh
        </button>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="mb-6 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm khám bệnh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">Đang tải...</div>
        ) : filteredExaminations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Không có hồ sơ khám bệnh</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Bệnh Nhân</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Chẩn Đoán</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Triệu Chứng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ngày Khám</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trạng Thái</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExaminations.map((exam) => (
                  <tr key={exam._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{exam.patientInfo?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{exam.diagnosis || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{Array.isArray(exam.symptoms) ? exam.symptoms.join(', ') : exam.symptoms || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {exam.examinationDate ? new Date(exam.examinationDate).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-800">
                        Hoàn thành
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(exam)}
                          className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(exam._id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Chi Tiết Khám Bệnh</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Bệnh Nhân</p>
                <p className="text-sm font-medium text-gray-900">{selectedExam.patientInfo?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Chẩn Đoán</p>
                <p className="text-sm text-gray-900">{selectedExam.diagnosis || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Triệu Chứng</p>
                <p className="text-sm text-gray-900">{Array.isArray(selectedExam.symptoms) ? selectedExam.symptoms.join(', ') : selectedExam.symptoms || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Kết Quả Khám</p>
                <p className="text-sm text-gray-900">{selectedExam.findings || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Phương Pháp Điều Trị</p>
                <p className="text-sm text-gray-900">{selectedExam.treatment || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">Ghi Chú</p>
                <p className="text-sm text-gray-900">{selectedExam.notes || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExaminations;
