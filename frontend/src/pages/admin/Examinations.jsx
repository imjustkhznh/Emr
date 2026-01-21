import React, { useEffect, useState } from 'react';
import { Stethoscope, Search, Edit2, Trash2, Plus, Eye } from 'lucide-react';
import { examinationAPI } from '../../services/apiService';
import { toast } from 'react-toastify';

// Tạo dữ liệu fake 800 hồ sơ khám bệnh
const generateFakeExaminations = () => {
  const patientNames = ['Phạm Minh Tuấn', 'Vũ Thị Hương', 'Lê Văn Kiên', 'Hoàng Thị Linh', 'Dương Văn Long', 'Nguyễn Thị Hoa', 'Trần Văn Hùng', 'Phan Thị Xuân', 'Bùi Thị Hoa', 'Cao Văn Sơn'];
  const diagnoses = ['Cảm cúm', 'Viêm đường hô hấp', 'Tiểu đường', 'Cao huyết áp', 'Mỡ máu cao', 'Loãng xương', 'Viêm khớp', 'Trầm cảm', 'Mất ngủ', 'Béo phì'];
  const symptoms = [
    ['Sốt cao', 'Ho', 'Mệt mỏi'],
    ['Đau đầu', 'Chóng mặt'],
    ['Khát nước', 'Tiểu tiện nhiều'],
    ['Đầu tê', 'Hoa mắt'],
    ['Mệt mỏi', 'Hoa mắt'],
    ['Đau lưng', 'Đau xương'],
    ['Đau khớp', 'Sưng'],
    ['Mất ngủ', 'Lo âu'],
    ['Mệt mỏi', 'Ăn không ngon'],
    ['Khó thở', 'Mệt mỏi']
  ];
  const treatments = ['Uống thuốc hạ sốt', 'Nghỉ ngơi và uống nước', 'Ăn kiêng, uống thuốc', 'Uống thuốc huyết áp', 'Thay đổi lối sống', 'Bổ sung canxi', 'Liệu pháp vật lý', 'Tư vấn tâm lý', 'Ăn kiêng, tập luyện', 'Giảm cân dần dần'];
  
  const examinations = [];
  
  for (let i = 1; i <= 800; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 180));
    const symptomsIdx = Math.floor(Math.random() * symptoms.length);
    
    examinations.push({
      _id: `examination_${i}`,
      patientInfo: {
        name: patientNames[Math.floor(Math.random() * patientNames.length)],
        age: Math.floor(Math.random() * (80 - 20 + 1)) + 20,
      },
      diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
      symptoms: symptoms[symptomsIdx],
      findings: 'Kết quả khám cho thấy bệnh nhân có tình trạng ' + diagnoses[Math.floor(Math.random() * diagnoses.length)],
      treatment: treatments[Math.floor(Math.random() * treatments.length)],
      examinationDate: date.toISOString(),
      notes: 'Tái khám sau 1-2 tuần',
      status: 'completed'
    });
  }
  return examinations;
};

const FAKE_EXAMINATIONS = generateFakeExaminations();

const AdminExaminations = () => {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExaminations();
  }, []);

  const fetchExaminations = async () => {
    try {
      setLoading(true);
      // Sử dụng dữ liệu fake
      setExaminations(FAKE_EXAMINATIONS);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching examinations:', error);
      // Fallback vẫn dùng dữ liệu fake
      setExaminations(FAKE_EXAMINATIONS);
    } finally {
      setLoading(false);
    }
  };

  const filteredExaminations = examinations.filter(exam =>
    exam.patientInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset page khi search thay đổi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredExaminations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExaminations = filteredExaminations.slice(startIndex, endIndex);

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
                {currentExaminations.map((exam) => (
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

        {/* Pagination */}
        {!loading && filteredExaminations.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {startIndex + 1} đến {Math.min(endIndex, filteredExaminations.length)} trong {filteredExaminations.length} hồ sơ khám
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Trước
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            currentPage === page
                              ? 'bg-purple-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      (page === 2 && currentPage > 3) ||
                      (page === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Sau
              </button>
              <div className="ml-4 text-sm text-gray-600">
                Trang {currentPage} / {totalPages} | Tổng: {filteredExaminations.length} hồ sơ
              </div>
            </div>
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
