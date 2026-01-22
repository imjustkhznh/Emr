import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Eye, Calendar, Stethoscope, X } from 'lucide-react';
import { toast } from 'react-toastify';

// Fake data
const FAKE_PATIENT_NAMES = [
  'Nguyễn Văn An',
  'Trần Thị Bình',
  'Phạm Minh Châu',
  'Hoàng Thị Dung',
  'Vũ Quốc Gia',
  'Đặng Ngọc Hạnh',
  'Bùi Văn Hoàn',
  'Dương Thị Linh',
  'Cao Minh Khánh',
  'Lê Thị Linh'
];

const FAKE_EXAMINATIONS = [
  {
    _id: 'exam_1',
    patientName: 'Nguyễn Văn An',
    patientCode: 'BN001',
    diagnosis: 'Huyết áp cao (Hypertension)',
    symptoms: 'Đau đầu, chóng mặt, căng cơ cảnh',
    findings: 'Huyết áp: 160/100 mmHg, Nhịp tim: 85 lần/phút',
    treatment: 'Kiểm soát chế độ ăn, uống 2L nước/ngày, tập thể dục 30 phút/ngày',
    notes: 'Bệnh nhân cần tái khám sau 2 tuần',
    status: 'completed',
    examinationDate: new Date('2025-01-15')
  },
  {
    _id: 'exam_2',
    patientName: 'Trần Thị Bình',
    patientCode: 'BN002',
    diagnosis: 'Viêm đường hô hấp cấp',
    symptoms: 'Ho, sốt cao, khó thở',
    findings: 'Nhiệt độ: 38.5°C, Tiếng ran ở phổi, CXR: viêm phổi khu trú',
    treatment: 'Dùng kháng sinh, ở yên và giữ ấm',
    notes: 'Theo dõi nhiệt độ, uống nhiều nước',
    status: 'completed',
    examinationDate: new Date('2025-01-14')
  },
  {
    _id: 'exam_3',
    patientName: 'Phạm Minh Châu',
    patientCode: 'BN003',
    diagnosis: 'Tiểu đường loại 2',
    symptoms: 'Khát nước, tiểu nhiều, mệt mỏi',
    findings: 'Đường huyết: 250 mg/dL, HbA1c: 8.5%',
    treatment: 'Dùng Metformin 500mg x 2/ngày, kiểm soát chế độ ăn',
    notes: 'Tái khám hàng tháng, kiểm tra đường huyết định kỳ',
    status: 'completed',
    examinationDate: new Date('2025-01-13')
  },
  {
    _id: 'exam_4',
    patientName: 'Hoàng Thị Dung',
    patientCode: 'BN004',
    diagnosis: 'Viêm dạ dày cấp',
    symptoms: 'Đau bụng, buồn nôn, ăn uống kém',
    findings: 'Đau vùng thượng vị, nôn mửa, pH dạ dày cao',
    treatment: 'Omeprazole 20mg/ngày, ăn loãng, tránh thực phẩm kích thích',
    notes: 'Cần nội soi sau 3 tuần nếu không cải thiện',
    status: 'pending',
    examinationDate: new Date('2025-01-12')
  },
  {
    _id: 'exam_5',
    patientName: 'Vũ Quốc Gia',
    patientCode: 'BN005',
    diagnosis: 'Thoái hóa đốt sống cổ',
    symptoms: 'Đau cổ, tê tay, hạn chế gập cơ',
    findings: 'MRI: thoái hóa C5-C6, chèn ép tủy sống nhẹ',
    treatment: 'Vật lý trị liệu, dùng NSAIDs, giữ tư thế đúng',
    notes: 'Theo dõi triệu chứng, có thể cần phẫu thuật nếu nặng',
    status: 'completed',
    examinationDate: new Date('2025-01-11')
  },
  {
    _id: 'exam_6',
    patientName: 'Đặng Ngọc Hạnh',
    patientCode: 'BN006',
    diagnosis: 'Thiếu máu do thiếu sắt',
    symptoms: 'Mệt mỏi, yếu, đầu hoa mắt',
    findings: 'Hemoglobin: 8.5 g/dL, Ferritin: 20 ng/mL',
    treatment: 'Bổ sung sắt 325mg/ngày, ăn thực phẩm giàu sắt',
    notes: 'Xét nghiệm lại sau 6 tuần',
    status: 'completed',
    examinationDate: new Date('2025-01-10')
  },
  {
    _id: 'exam_7',
    patientName: 'Bùi Văn Hoàn',
    patientCode: 'BN007',
    diagnosis: 'Bệnh tim mạch vành',
    symptoms: 'Đau ngực, hụt hơi, khi vận động',
    findings: 'ECG: thiếu máu cơ tim, chuỗi nồng độ Troponin tăng',
    treatment: 'Aspirin, Beta-blocker, Statin, theo dõi sát',
    notes: 'Nằm viện theo dõi 3 ngày',
    status: 'pending',
    examinationDate: new Date('2025-01-09')
  },
  {
    _id: 'exam_8',
    patientName: 'Dương Thị Linh',
    patientCode: 'BN008',
    diagnosis: 'Bệnh mụn rộp',
    symptoms: 'Sốt, chán ăn, phát ban mụn nước',
    findings: 'Phát ban hình bong bóng, ít ở bụng và lưng',
    treatment: 'Acyclovir 5x/ngày, chườm lạnh, tránh làm vỡ mụn',
    notes: 'Bệnh sẽ tự khỏi trong 7-10 ngày',
    status: 'completed',
    examinationDate: new Date('2025-01-08')
  },
  {
    _id: 'exam_9',
    patientName: 'Cao Minh Khánh',
    patientCode: 'BN009',
    diagnosis: 'Bệnh dạ dày thở mạn tính',
    symptoms: 'Đau bụng, ăn uống kém, nôn mửa',
    findings: 'Nội soi: viêm niêm mạc dạ dày, có chẩn đoán H. pylori +',
    treatment: 'Liệu pháp 3 lần với PPI, Amoxicillin, Clarithromycin',
    notes: 'Tái khám nội soi sau 2 tháng',
    status: 'completed',
    examinationDate: new Date('2025-01-07')
  },
  {
    _id: 'exam_10',
    patientName: 'Lê Thị Linh',
    patientCode: 'BN010',
    diagnosis: 'Viêm khớp dạng thấp',
    symptoms: 'Đau khớp, sưng, hạn chế vận động',
    findings: 'RF: 85 IU/mL (bình thường <20), CRP: 15 mg/L (tăng)',
    treatment: 'Sulfasalazine 2g/ngày, chườm ấm, vật lý trị liệu',
    notes: 'Cần theo dõi lâu dài, xét nghiệm lại sau 1 tháng',
    status: 'completed',
    examinationDate: new Date('2025-01-06')
  }
];

const Examinations = () => {
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [examinations, setExaminations] = useState(FAKE_EXAMINATIONS);
  const [selectedExam, setSelectedExam] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    patientName: '',
    diagnosis: '',
    symptoms: '',
    findings: '',
    treatment: '',
    notes: '',
    status: 'completed',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.patientName) {
      toast.error('Chọn bệnh nhân');
      return;
    }
    
    if (!formData.diagnosis) {
      toast.error('Nhập chẩn đoán');
      return;
    }

    if (editingId) {
      setExaminations(examinations.map(ex =>
        ex._id === editingId
          ? { ...ex, ...formData }
          : ex
      ));
      toast.success('Cập nhật thành công');
    } else {
      const newExam = {
        _id: `exam_${Date.now()}`,
        patientCode: `BN${String(examinations.length + 1).padStart(3, '0')}`,
        ...formData,
        examinationDate: new Date()
      };
      setExaminations([...examinations, newExam]);
      toast.success('Tạo thành công');
    }

    setFormData({
      patientName: '',
      diagnosis: '',
      symptoms: '',
      findings: '',
      treatment: '',
      notes: '',
      status: 'completed',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (exam) => {
    setFormData({
      patientName: exam.patientName,
      diagnosis: exam.diagnosis,
      symptoms: exam.symptoms,
      findings: exam.findings,
      treatment: exam.treatment,
      notes: exam.notes,
      status: exam.status,
    });
    setEditingId(exam._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExaminations(examinations.filter(ex => ex._id !== id));
    toast.success('Xóa thành công');
    setShowDeleteModal(null);
  };

  const handleDownload = (exam) => {
    const content = `PHIẾU KHÁM BỆNH
${'═'.repeat(60)}
Bệnh nhân: ${exam.patientName}
Mã BN: ${exam.patientCode}
Ngày khám: ${new Date(exam.examinationDate).toLocaleDateString('vi-VN')}

CHẨN ĐOÁN:
${exam.diagnosis}

TRIỆU CHỨNG:
${exam.symptoms}

KẾT QUẢ KIỂM TRA:
${exam.findings}

PHƯƠNG PHÁP ĐIỀU TRỊ:
${exam.treatment}

GHI CHÚ:
${exam.notes}

TRẠNG THÁI: ${exam.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
${'═'.repeat(60)}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phieu-kham-${exam.patientCode}-${new Date().getTime()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Tải xuống thành công!');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-4 rounded-xl shadow-lg">
            <Stethoscope className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản Lý Phiếu Khám</h1>
            <p className="text-gray-600 mt-1">Tạo, xem, chỉnh sửa phiếu khám bệnh</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              patientName: '',
              diagnosis: '',
              symptoms: '',
              findings: '',
              treatment: '',
              notes: '',
              status: 'completed',
            });
          }}
          className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Phiếu Khám Mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-bold uppercase">Tổng Phiếu Khám</p>
          <p className="text-4xl font-bold text-green-600 mt-3">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-bold uppercase">Hoàn Thành</p>
          <p className="text-4xl font-bold text-emerald-600 mt-3">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <p className="text-gray-600 text-sm font-bold uppercase">Chờ Xử Lý</p>
          <p className="text-4xl font-bold text-yellow-600 mt-3">{stats.pending}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {editingId ? 'Chỉnh Sửa Phiếu Khám' : 'Tạo Phiếu Khám Mới'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Bệnh Nhân *</label>
                <select
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-base"
                >
                  <option value="">-- Chọn bệnh nhân --</option>
                  {FAKE_PATIENT_NAMES.map((name, idx) => (
                    <option key={idx} value={name}>
                      BN{String(idx + 1).padStart(3, '0')} - {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Chẩn Đoán *</label>
                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  placeholder="Nhập chẩn đoán"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Triệu Chứng</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="Nhập triệu chứng (cách nhau bằng dấu phẩy)"
                rows="2"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kết Quả Kiểm Tra</label>
                <textarea
                  name="findings"
                  value={formData.findings}
                  onChange={handleInputChange}
                  placeholder="Nhập kết quả"
                  rows="2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phương Pháp Điều Trị</label>
                <textarea
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleInputChange}
                  placeholder="Nhập phương pháp điều trị"
                  rows="2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ghi Chú</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Nhập ghi chú"
                  rows="2"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Trạng Thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="completed">Hoàn Thành</option>
                  <option value="pending">Chờ Xử Lý</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                {editingId ? 'Cập Nhật' : 'Tạo Phiếu'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    patientName: '',
                    diagnosis: '',
                    symptoms: '',
                    findings: '',
                    treatment: '',
                    notes: '',
                    status: 'completed',
                  });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, mã BN hoặc chẩn đoán..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 shadow-md"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 shadow-md md:w-48"
        >
          <option value="all">Tất Cả</option>
          <option value="completed">Hoàn Thành</option>
          <option value="pending">Chờ Xử Lý</option>
        </select>
      </div>

      {/* Examinations Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((exam) => (
            <div
              key={exam._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
                      {exam.patientName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-lg font-bold">{exam.patientName}</p>
                      <p className="text-green-100 text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(exam.examinationDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    exam.status === 'completed'
                      ? 'bg-white/20 text-white'
                      : 'bg-yellow-400/30 text-yellow-100'
                  }`}>
                    {exam.status === 'completed' ? '✓ Hoàn Thành' : '⏳ Chờ Xử Lý'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Diagnosis */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-green-600 font-bold uppercase mb-2">Chẩn Đoán</p>
                  <p className="text-base font-semibold text-gray-900">{exam.diagnosis}</p>
                </div>

                {/* Symptoms */}
                {exam.symptoms && (
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                    <p className="text-xs text-red-600 font-bold uppercase mb-2">Triệu Chứng</p>
                    <p className="text-sm text-gray-700">{exam.symptoms}</p>
                  </div>
                )}

                {/* Findings */}
                {exam.findings && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs text-blue-600 font-bold uppercase mb-2">Kết Quả Kiểm Tra</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{exam.findings}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedExam(exam);
                    setShowViewModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Chi Tiết
                </button>
                <button 
                  onClick={() => handleEdit(exam)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDownload(exam)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setShowDeleteModal(exam._id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-semibold">Không tìm thấy phiếu khám nào</p>
        </div>
      )}

      {/* View Detail Modal */}
      {showViewModal && selectedExam && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold">Chi Tiết Phiếu Khám</h2>
                <p className="text-green-100 mt-1">{selectedExam.patientName}</p>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="hover:bg-green-500 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 font-bold uppercase mb-2">Tên Bệnh Nhân</p>
                  <p className="text-lg font-bold text-gray-900">{selectedExam.patientName}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-2">Mã BN</p>
                  <p className="text-lg font-bold text-blue-600">{selectedExam.patientCode}</p>
                </div>
              </div>

              {/* Date & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-600 font-bold uppercase mb-2">Ngày Khám</p>
                  <p className="text-base font-semibold text-gray-900">{new Date(selectedExam.examinationDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className={`p-4 rounded-lg border ${
                  selectedExam.status === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className={`text-xs font-bold uppercase mb-2 ${
                    selectedExam.status === 'completed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}>
                    Trạng Thái
                  </p>
                  <p className={`text-base font-bold ${
                    selectedExam.status === 'completed'
                      ? 'text-green-700'
                      : 'text-yellow-700'
                  }`}>
                    {selectedExam.status === 'completed' ? 'Hoàn Thành' : 'Chờ Xử Lý'}
                  </p>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border-l-4 border-amber-500">
                <p className="text-xs text-amber-600 font-bold uppercase mb-2">Chẩn Đoán</p>
                <p className="text-lg font-bold text-gray-900">{selectedExam.diagnosis}</p>
              </div>

              {/* Symptoms */}
              {selectedExam.symptoms && (
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
                  <p className="text-xs text-red-600 font-bold uppercase mb-3">Triệu Chứng</p>
                  <p className="text-gray-800 leading-relaxed">{selectedExam.symptoms}</p>
                </div>
              )}

              {/* Findings */}
              {selectedExam.findings && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-3">Kết Quả Kiểm Tra</p>
                  <p className="text-gray-800 leading-relaxed">{selectedExam.findings}</p>
                </div>
              )}

              {/* Treatment */}
              {selectedExam.treatment && (
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
                  <p className="text-xs text-emerald-600 font-bold uppercase mb-3">Phương Pháp Điều Trị</p>
                  <p className="text-gray-800 leading-relaxed">{selectedExam.treatment}</p>
                </div>
              )}

              {/* Notes */}
              {selectedExam.notes && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="text-xs text-purple-600 font-bold uppercase mb-3">Ghi Chú</p>
                  <p className="text-gray-800 leading-relaxed">{selectedExam.notes}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t px-8 py-4 flex gap-3 justify-end">
              <button
                onClick={() => handleDownload(selectedExam)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                <Download className="h-4 w-4" />
                Tải Xuống
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-bold transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="bg-red-600 text-white px-8 py-6 rounded-t-2xl">
              <h2 className="text-xl font-bold">Xác Nhận Xóa</h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg">Bạn chắc chắn muốn xóa phiếu khám này không? Hành động này không thể hoàn tác.</p>
            </div>
            <div className="bg-gray-50 border-t px-8 py-4 flex gap-3 justify-end rounded-b-2xl">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-bold transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
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
