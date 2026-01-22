import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Eye, AlertCircle, User, Stethoscope, X } from 'lucide-react';
import { toast } from 'react-toastify';

// Danh sách bệnh nhân (trùng với Patients.jsx)
const FAKE_PATIENTS = [
  { _id: 'dp_1', name: 'Nguyễn Văn An' },
  { _id: 'dp_2', name: 'Trần Thị Bình' },
  { _id: 'dp_3', name: 'Phạm Minh Châu' },
  { _id: 'dp_4', name: 'Hoàng Thị Dung' },
  { _id: 'dp_5', name: 'Vũ Quốc Gia' },
  { _id: 'dp_6', name: 'Đặng Ngọc Hạnh' },
  { _id: 'dp_7', name: 'Bùi Văn Hoàn' },
  { _id: 'dp_8', name: 'Dương Thị Linh' },
  { _id: 'dp_9', name: 'Cao Minh Khánh' },
  { _id: 'dp_10', name: 'Lê Thị Linh' }
];

// Dữ liệu fake hồ sơ y tế
const FAKE_MEDICAL_RECORDS = [
  {
    _id: 'mr_1',
    patientName: 'Nguyễn Văn An',
    patientId: 'dp_1',
    diagnosis: 'Huyết áp cao (Hypertension)',
    treatment: 'Thuốc hạ huyết áp, chế độ ăn uống lành mạnh, tập thể dục đều đặn',
    notes: 'Bệnh nhân cần theo dõi huyết áp hàng tuần. Tái khám sau 2 tuần. Tránh rượu bia, muối dư thừa.',
    examDate: '2026-01-15',
    status: 'Đang Điều Trị',
    bloodType: 'O+',
    symptoms: ['Đau đầu', 'Chóng mặt', 'Mệt mỏi']
  },
  {
    _id: 'mr_2',
    patientName: 'Trần Thị Bình',
    patientId: 'dp_2',
    diagnosis: 'Viêm đường hô hấp cấp',
    treatment: 'Kháng sinh, giải sốt, thuốc ho, nghỉ ngơi',
    notes: 'Bệnh nhân sốt cao, ho liên tục. Dùng kháng sinh trong 7 ngày. Uống nhiều nước, thức ăn nhẹ.',
    examDate: '2026-01-18',
    status: 'Đang Điều Trị',
    bloodType: 'B+',
    symptoms: ['Sốt cao', 'Ho liên tục', 'Khó thở']
  },
  {
    _id: 'mr_3',
    patientName: 'Phạm Minh Châu',
    patientId: 'dp_3',
    diagnosis: 'Tiểu đường loại 2',
    treatment: 'Insulin, kiểm soát đường huyết, chế độ ăn uống',
    notes: 'Bệnh nhân cần quản lý cân nặng và kiểm soát lượng đường huyết. Tái khám mỗi tháng.',
    examDate: '2026-01-12',
    status: 'Đang Điều Trị',
    bloodType: 'AB+',
    symptoms: ['Khát nước', 'Đi tiểu thường xuyên']
  },
  {
    _id: 'mr_4',
    patientName: 'Hoàng Thị Dung',
    patientId: 'dp_4',
    diagnosis: 'Viêm dạ dày cấp',
    treatment: 'Thuốc kháng acid, ăn nhẹ, tránh cay chua cay',
    notes: 'Ăn cơm nát, canh, lòng trắng trứng. Tránh ớt, mẻ, cà chua. Uống nước ấm.',
    examDate: '2026-01-20',
    status: 'Đang Điều Trị',
    bloodType: 'A+',
    symptoms: ['Đau bụng', 'Buồn nôn', 'Chán ăn']
  },
  {
    _id: 'mr_5',
    patientName: 'Vũ Quốc Gia',
    patientId: 'dp_5',
    diagnosis: 'Thoái hóa đốt sống cổ',
    treatment: 'Thuốc giảm đau, vật lý trị liệu, tập luyện nhẹ',
    notes: 'Cần tránh chuyển động bất thường. Ngủ với gối cao vừa phải. Vật lý trị liệu 3 lần/tuần.',
    examDate: '2026-01-10',
    status: 'Đang Điều Trị',
    bloodType: 'O-',
    symptoms: ['Đau cổ', 'Tê tay', 'Nhức nửa đầu']
  },
  {
    _id: 'mr_6',
    patientName: 'Đặng Ngọc Hạnh',
    patientId: 'dp_6',
    diagnosis: 'Thiếu máu do thiếu sắt',
    treatment: 'Bổ sung sắt, ăn nhiều thực phẩm giàu sắt',
    notes: 'Uống sắt hàng ngày, tránh cà phê sau bữa ăn. Ăn gan, thịt đỏ, rau xanh.',
    examDate: '2026-01-17',
    status: 'Đang Điều Trị',
    bloodType: 'B-',
    symptoms: ['Mệt mỏi', 'Hoa mắt', 'Khó thở']
  },
  {
    _id: 'mr_7',
    patientName: 'Bùi Văn Hoàn',
    patientId: 'dp_7',
    diagnosis: 'Bệnh tim mạch vành',
    treatment: 'Thuốc chẹn beta, Aspirin, thay đổi lối sống',
    notes: 'Tránh stress, bỏ hút thuốc, tập thể dục nhẹ nhàng. Tái khám sau 1 tháng.',
    examDate: '2026-01-14',
    status: 'Đang Điều Trị',
    bloodType: 'AB-',
    symptoms: ['Đau ngực', 'Khó thở']
  },
  {
    _id: 'mr_8',
    patientName: 'Dương Thị Linh',
    patientId: 'dp_8',
    diagnosis: 'Bệnh mụn rộp',
    treatment: 'Thuốc kháng virus, chăm sóc vết thương',
    notes: 'Rửa vết thương sạch hàng ngày, bôi kem kháng virus. Tránh chạm vào vết thương.',
    examDate: '2026-01-16',
    status: 'Đang Điều Trị',
    bloodType: 'A-',
    symptoms: ['Vết phồng rộp', 'Đau rát']
  },
  {
    _id: 'mr_9',
    patientName: 'Cao Minh Khánh',
    patientId: 'dp_9',
    diagnosis: 'Bệnh dạ dày thở mạn tính',
    treatment: 'Kiểm soát chế độ ăn, thuốc dạ dày, tránh stress',
    notes: 'Ăn từng bữa nhỏ, thường xuyên. Tránh đồ cay, dầu mỡ, cà phê. Ngủ đủ giấc.',
    examDate: '2026-01-13',
    status: 'Đang Điều Trị',
    bloodType: 'O+',
    symptoms: ['Đau bụng', 'Khó tiêu', 'Trào ngược axit']
  },
  {
    _id: 'mr_10',
    patientName: 'Lê Thị Linh',
    patientId: 'dp_10',
    diagnosis: 'Viêm khớp dạng thấp',
    treatment: 'Thuốc kháng viêm, liệu pháp sinh học, vật lý trị liệu',
    notes: 'Giữ ấm khớp, tập vận động nhẹ. Tránh lao động nặng. Tái khám hàng tháng.',
    examDate: '2026-01-19',
    status: 'Đang Điều Trị',
    bloodType: 'B+',
    symptoms: ['Sưng khớp', 'Đau buốt', 'Cứng khớp']
  }
];

const DoctorMedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load dữ liệu fake
    setRecords(FAKE_MEDICAL_RECORDS);
  }, []);

  const filteredRecords = records.filter(record => 
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý nút Xem Chi Tiết
  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Xử lý nút Tải Xuống
  const handleDownload = (record) => {
    try {
      // Tạo nội dung PDF mock
      const pdfContent = `
HỒ SƠ Y TẾ BỆNH NHÂN
====================================
Tên Bệnh Nhân: ${record.patientName}
Mã Hồ Sơ: ${record._id}
Nhóm Máu: ${record.bloodType}
Ngày Khám: ${new Date(record.examDate).toLocaleDateString('vi-VN')}

CHẨN ĐOÁN: ${record.diagnosis}

TRIỆU CHỨNG:
${record.symptoms.map(s => `- ${s}`).join('\n')}

PHƯƠNG PHÁP ĐIỀU TRỊ:
${record.treatment}

GHI CHÚ / HƯỚNG DẪN:
${record.notes}

Trạng Thái: ${record.status}
====================================
Tài liệu này được tải về từ Hệ thống Quản Lý Bệnh Viện MediCare EMR
`;

      // Tạo blob và download
      const element = document.createElement('a');
      const file = new Blob([pdfContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${record.patientName}_${record._id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      toast.success(`✓ Tải xuống hồ sơ của ${record.patientName} thành công!`);
    } catch (error) {
      toast.error('Lỗi khi tải xuống hồ sơ');
    }
  };

  // Xử lý đóng modal
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedRecord(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Hồ Sơ Y Tế Bệnh Nhân</h1>
            <p className="text-gray-600 mt-1">Xem và quản lý hồ sơ y tế của bệnh nhân</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bệnh nhân hoặc chẩn đoán..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 shadow-md text-lg"
          />
        </div>
      </div>

      {/* Records Grid */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-6">
          {filteredRecords.map((record) => (
            <div
              key={record._id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-6 w-6" />
                    <div>
                      <p className="text-2xl font-bold">{record.patientName}</p>
                      <p className="text-blue-100 text-sm">Mã: {record._id.substring(0, 8)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-100">Ngày khám</p>
                    <p className="text-lg font-bold">{new Date(record.examDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                    ✓ {record.status}
                  </span>
                  <span className="text-sm text-gray-600">Nhóm máu: <span className="font-bold">{record.bloodType}</span></span>
                </div>

                {/* Main Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chẩn Đoán */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">Chẩn Đoán</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{record.diagnosis}</p>
                  </div>

                  {/* Symptoms */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
                    <p className="text-sm font-bold text-red-600 uppercase tracking-widest mb-3">Triệu Chứng</p>
                    <div className="flex flex-wrap gap-2">
                      {record.symptoms.map((symptom, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-200 text-red-700 text-sm font-semibold rounded-full">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phương Pháp Điều Trị */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <p className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">💊 Phương Pháp Điều Trị</p>
                  <p className="text-base text-gray-900 leading-relaxed">{record.treatment}</p>
                </div>

                {/* Ghi Chú */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
                  <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3">📝 Ghi Chú / Hướng Dẫn</p>
                  <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">{record.notes}</p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
                <button 
                  onClick={() => handleViewDetail(record)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Xem Chi Tiết
                </button>
                <button 
                  onClick={() => handleDownload(record)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Tải Xuống
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-semibold">Không tìm thấy hồ sơ y tế</p>
        </div>
      )}

      {/* Modal Chi Tiết */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white sticky top-0 z-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Chi Tiết Hồ Sơ Y Tế</h2>
                <p className="text-blue-100 text-sm mt-1">Mã: {selectedRecord._id}</p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Thông tin bệnh nhân */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-600 mb-4">👤 Thông Tin Bệnh Nhân</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Tên</p>
                    <p className="text-lg font-bold text-gray-900">{selectedRecord.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Nhóm Máu</p>
                    <p className="text-lg font-bold text-gray-900">{selectedRecord.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Ngày Khám</p>
                    <p className="text-lg font-bold text-gray-900">{new Date(selectedRecord.examDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Trạng Thái</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                      ✓ {selectedRecord.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chẩn đoán */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-bold text-red-600 mb-3">🔍 Chẩn Đoán</h3>
                <p className="text-base text-gray-900 leading-relaxed">{selectedRecord.diagnosis}</p>
              </div>

              {/* Triệu chứng */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-bold text-orange-600 mb-4">⚠️ Triệu Chứng</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.symptoms.map((symptom, idx) => (
                    <span key={idx} className="px-4 py-2 bg-orange-200 text-orange-700 font-semibold rounded-full">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phương pháp điều trị */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-green-600 mb-3">💊 Phương Pháp Điều Trị</h3>
                <p className="text-base text-gray-900 leading-relaxed">{selectedRecord.treatment}</p>
              </div>

              {/* Ghi chú */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-600 mb-3">📝 Ghi Chú & Hướng Dẫn</h3>
                <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">{selectedRecord.notes}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0">
              <button 
                onClick={() => handleDownload(selectedRecord)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Tải Xuống
              </button>
              <button 
                onClick={closeModal}
                className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorMedicalRecords;
