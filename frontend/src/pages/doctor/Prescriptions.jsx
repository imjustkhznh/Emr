import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Download, Pill, Calendar, User, X, Search, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

// Dữ liệu fake đơn thuốc phù hợp với bệnh lý
const FAKE_PRESCRIPTIONS = [
  {
    _id: 'presc_1',
    patientName: 'Nguyễn Văn An',
    patientId: 'dp_1',
    diagnosis: 'Huyết áp cao (Hypertension)',
    visitDate: '2026-01-15',
    createdDate: '2026-01-15',
    medications: [
      { medicationName: 'Lisinopril', dosage: '10mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Amlodipine', dosage: '5mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Hydrochlorothiazide', dosage: '25mg', frequency: '1 lần/sáng', duration: '30 ngày' }
    ],
    notes: 'Uống thuốc sau bữa cơm. Tránh muối. Tập thể dục 30 phút/ngày.'
  },
  {
    _id: 'presc_2',
    patientName: 'Trần Thị Bình',
    patientId: 'dp_2',
    diagnosis: 'Viêm đường hô hấp cấp',
    visitDate: '2026-01-18',
    createdDate: '2026-01-18',
    medications: [
      { medicationName: 'Azithromycin', dosage: '500mg', frequency: '1 lần/ngày', duration: '7 ngày' },
      { medicationName: 'Dextromethorphan', dosage: '15mg', frequency: '2 lần/ngày', duration: '5 ngày' },
      { medicationName: 'Paracetamol', dosage: '500mg', frequency: 'Mỗi 4 giờ nếu cần', duration: '5 ngày' },
      { medicationName: 'Expectorant (Guaifenesin)', dosage: '200mg', frequency: '3 lần/ngày', duration: '7 ngày' }
    ],
    notes: 'Uống đủ nước. Nghỉ ngơi. Tránh khí lạnh, khí ô nhiễm.'
  },
  {
    _id: 'presc_3',
    patientName: 'Phạm Minh Châu',
    patientId: 'dp_3',
    diagnosis: 'Tiểu đường loại 2',
    visitDate: '2026-01-12',
    createdDate: '2026-01-12',
    medications: [
      { medicationName: 'Metformin', dosage: '500mg', frequency: '2 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Glibenclamide', dosage: '5mg', frequency: '2 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Insulin Glargine', dosage: '10 IU', frequency: '1 lần/tối', duration: '30 ngày' }
    ],
    notes: 'Kiểm tra đường huyết hàng ngày. Ăn đúng giờ, đủ chất.'
  },
  {
    _id: 'presc_4',
    patientName: 'Hoàng Thị Dung',
    patientId: 'dp_4',
    diagnosis: 'Viêm dạ dày cấp',
    visitDate: '2026-01-20',
    createdDate: '2026-01-20',
    medications: [
      { medicationName: 'Omeprazole', dosage: '20mg', frequency: '1 lần/sáng', duration: '14 ngày' },
      { medicationName: 'Ranitidine', dosage: '150mg', frequency: '2 lần/ngày', duration: '14 ngày' },
      { medicationName: 'Bismuth Subsalicylate', dosage: '30ml', frequency: '3 lần/ngày sau ăn', duration: '7 ngày' }
    ],
    notes: 'Ăn cơm nát, canh. Tránh cay, mỡ. Uống nước ấm.'
  },
  {
    _id: 'presc_5',
    patientName: 'Vũ Quốc Gia',
    patientId: 'dp_5',
    diagnosis: 'Thoái hóa đốt sống cổ',
    visitDate: '2026-01-10',
    createdDate: '2026-01-10',
    medications: [
      { medicationName: 'Ibuprofen', dosage: '400mg', frequency: '2 lần/ngày', duration: '14 ngày' },
      { medicationName: 'Muscle Relaxant (Tizanidine)', dosage: '2mg', frequency: '2 lần/ngày', duration: '14 ngày' },
      { medicationName: 'Vitamin B12', dosage: '1000mcg', frequency: '1 lần/tuần (tiêm)', duration: '4 tuần' }
    ],
    notes: 'Vật lý trị liệu 3 lần/tuần. Tránh chuyển động bất thường. Ngủ gối cao.'
  },
  {
    _id: 'presc_6',
    patientName: 'Đặng Ngọc Hạnh',
    patientId: 'dp_6',
    diagnosis: 'Thiếu máu do thiếu sắt',
    visitDate: '2026-01-17',
    createdDate: '2026-01-17',
    medications: [
      { medicationName: 'Ferrous Sulfate', dosage: '325mg', frequency: '1 lần/ngày tối', duration: '30 ngày' },
      { medicationName: 'Folic Acid', dosage: '1mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Vitamin B12', dosage: '500mcg', frequency: '1 lần/ngày', duration: '30 ngày' }
    ],
    notes: 'Uống với nước cam để tăng hấp thu. Tránh cà phê. Ăn gan, thịt đỏ, rau xanh.'
  },
  {
    _id: 'presc_7',
    patientName: 'Bùi Văn Hoàn',
    patientId: 'dp_7',
    diagnosis: 'Bệnh tim mạch vành',
    visitDate: '2026-01-14',
    createdDate: '2026-01-14',
    medications: [
      { medicationName: 'Aspirin', dosage: '75mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Atenolol', dosage: '50mg', frequency: '1 lần/ngày', duration: '30 ngày' },
      { medicationName: 'Atorvastatin', dosage: '20mg', frequency: '1 lần/tối', duration: '30 ngày' },
      { medicationName: 'Nitroglycerin', dosage: '0.6mg', frequency: 'Khi cần (dưới lưỡi)', duration: 'Theo cần' }
    ],
    notes: 'Bỏ thuốc lá. Tránh stress. Tập thể dục nhẹ. Tái khám mỗi tháng.'
  },
  {
    _id: 'presc_8',
    patientName: 'Dương Thị Linh',
    patientId: 'dp_8',
    diagnosis: 'Bệnh mụn rộp',
    visitDate: '2026-01-16',
    createdDate: '2026-01-16',
    medications: [
      { medicationName: 'Acyclovir', dosage: '400mg', frequency: '5 lần/ngày', duration: '10 ngày' },
      { medicationName: 'Acyclovir Cream', dosage: '5%', frequency: 'Thoa 4-6 lần/ngày', duration: '10 ngày' },
      { medicationName: 'Paracetamol', dosage: '500mg', frequency: 'Mỗi 4-6 giờ nếu cần', duration: '5 ngày' }
    ],
    notes: 'Rửa tay sạch trước/sau khi sử dụng thuốc. Không chạm vào vết thương.'
  },
  {
    _id: 'presc_9',
    patientName: 'Cao Minh Khánh',
    patientId: 'dp_9',
    diagnosis: 'Bệnh dạ dày thở mạn tính',
    visitDate: '2026-01-13',
    createdDate: '2026-01-13',
    medications: [
      { medicationName: 'Pantoprazole', dosage: '40mg', frequency: '1 lần/sáng', duration: '30 ngày' },
      { medicationName: 'Domperidone', dosage: '10mg', frequency: '3 lần/ngày trước ăn', duration: '30 ngày' },
      { medicationName: 'Antacid (Aluminum Hydroxide)', dosage: '30ml', frequency: '2 lần/ngày sau ăn', duration: '30 ngày' }
    ],
    notes: 'Ăn từng bữa nhỏ, thường xuyên. Tránh cay, dầu mỡ. Ăn chậm, nhai kỹ.'
  },
  {
    _id: 'presc_10',
    patientName: 'Lê Thị Linh',
    patientId: 'dp_10',
    diagnosis: 'Viêm khớp dạng thấp',
    visitDate: '2026-01-19',
    createdDate: '2026-01-19',
    medications: [
      { medicationName: 'Methotrexate', dosage: '15mg', frequency: '1 lần/tuần', duration: '12 tuần' },
      { medicationName: 'Etanercept', dosage: '25mg', frequency: 'Tiêm 2 lần/tuần', duration: '12 tuần' },
      { medicationName: 'Ibuprofen', dosage: '400mg', frequency: '3 lần/ngày', duration: '30 ngày' }
    ],
    notes: 'Vật lý trị liệu hàng ngày. Giữ ấm khớp. Tránh lao động nặng. Tái khám mỗi tháng.'
  }
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    diagnosis: '',
    medications: [{ medicationName: '', dosage: '', frequency: '', duration: '' }]
  });

  useEffect(() => {
    // Load dữ liệu fake
    setPrescriptions(FAKE_PRESCRIPTIONS);
  }, []);

  const filteredPrescriptions = prescriptions.filter(p => 
    p.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm thuốc mới
  const handleAddMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { medicationName: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  // Xóa thuốc
  const handleRemoveMedication = (index) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((_, i) => i !== index)
    });
  };

  // Cập nhật thông tin thuốc
  const handleMedicationChange = (index, field, value) => {
    const newMeds = [...formData.medications];
    newMeds[index][field] = value;
    setFormData({ ...formData, medications: newMeds });
  };

  // Tạo hoặc cập nhật đơn thuốc
  const handleCreateOrUpdate = () => {
    if (!formData.patientName || !formData.diagnosis || formData.medications.some(m => !m.medicationName)) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingId) {
      // Cập nhật
      setPrescriptions(prescriptions.map(p => p._id === editingId ? { ...formData, _id: editingId, createdDate: new Date() } : p));
      toast.success('✓ Cập nhật đơn thuốc thành công!');
    } else {
      // Tạo mới
      const newPrescription = {
        _id: `presc_${Date.now()}`,
        ...formData,
        visitDate: new Date().toISOString(),
        createdDate: new Date().toISOString()
      };
      setPrescriptions([newPrescription, ...prescriptions]);
      toast.success('✓ Tạo đơn thuốc mới thành công!');
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({
      patientId: '',
      patientName: '',
      diagnosis: '',
      medications: [{ medicationName: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  // Sửa đơn thuốc
  const handleEdit = (prescription) => {
    setFormData(prescription);
    setEditingId(prescription._id);
    setShowModal(true);
  };

  // Xóa đơn thuốc
  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn thuốc này?')) {
      setPrescriptions(prescriptions.filter(p => p._id !== id));
      toast.success('✓ Xóa đơn thuốc thành công!');
    }
  };

  // Tải xuống
  const handleDownload = (prescription) => {
    const content = `ĐƠN THUỐC
${'═'.repeat(60)}
Bệnh nhân: ${prescription.patientName}
Chẩn đoán: ${prescription.diagnosis}
Ngày khám: ${new Date(prescription.visitDate).toLocaleDateString('vi-VN')}

DANH SÁCH THUỐC:
${prescription.medications?.map((m, i) => `${i+1}. ${m.medicationName}
   • Liều lượng: ${m.dosage}
   • Tần suất: ${m.frequency}
   • Thời gian: ${m.duration}`).join('\n\n')}

${prescription.notes ? `GHI CHÚ:\n${prescription.notes}` : ''}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `don-thuoc-${prescription.patientName}-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('✓ Tải xuống thành công!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
            <Pill className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Đơn Thuốc</h1>
            <p className="text-gray-600 mt-1">Quản lý đơn thuốc cho bệnh nhân</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setShowModal(true);
            setEditingId(null);
            setFormData({
              patientId: '',
              patientName: '',
              diagnosis: '',
              medications: [{ medicationName: '', dosage: '', frequency: '', duration: '' }]
            });
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Kê Đơn Mới
        </button>
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

      {/* Prescriptions Grid */}
      {filteredPrescriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrescriptions.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
                      {p.patientName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xl font-bold">{p.patientName}</p>
                      <p className="text-blue-100 text-sm">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(p.visitDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold">💊 {p.medications?.length}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Diagnosis */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-2">Chẩn Đoán</p>
                  <p className="text-base font-semibold text-gray-900">{p.diagnosis}</p>
                </div>

                {/* Medications List */}
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase mb-3">Danh Sách Thuốc</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {p.medications?.slice(0, 3).map((med, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                        <p className="font-semibold text-gray-900">{idx + 1}. {med.medicationName}</p>
                        <div className="text-xs text-gray-600 mt-1">
                          {med.dosage} • {med.frequency}
                        </div>
                      </div>
                    ))}
                    {p.medications?.length > 3 && (
                      <p className="text-xs text-gray-500 text-center py-2">
                        +{p.medications.length - 3} thuốc khác...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedPrescription(p);
                    setShowDetailModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Chi Tiết
                </button>
                <button 
                  onClick={() => handleEdit(p)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDownload(p)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(p._id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-semibold">Không tìm thấy đơn thuốc nào</p>
        </div>
      )}

      {/* Modal Tạo/Sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">{editingId ? 'Chỉnh Sửa Đơn Thuốc' : 'Kê Đơn Mới'}</h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
                className="hover:bg-blue-500 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Bệnh Nhân *</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Nhập tên bệnh nhân"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Chẩn Đoán *</label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Nhập chẩn đoán"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Danh Sách Thuốc *</label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {formData.medications.map((med, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                      <input
                        type="text"
                        placeholder="Tên thuốc"
                        value={med.medicationName}
                        onChange={(e) => handleMedicationChange(idx, 'medicationName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Liều lượng"
                          value={med.dosage}
                          onChange={(e) => handleMedicationChange(idx, 'dosage', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Tần suất"
                          value={med.frequency}
                          onChange={(e) => handleMedicationChange(idx, 'frequency', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Thời gian"
                          value={med.duration}
                          onChange={(e) => handleMedicationChange(idx, 'duration', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      {formData.medications.length > 1 && (
                        <button
                          onClick={() => handleRemoveMedication(idx)}
                          className="text-red-600 hover:text-red-700 text-sm font-bold"
                        >
                          ✕ Xóa thuốc này
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddMedication}
                  className="mt-3 w-full py-2 border-2 border-dashed border-blue-500 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  + Thêm Thuốc
                </button>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={handleCreateOrUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  {editingId ? 'Cập Nhật' : 'Tạo Đơn'}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Chi Tiết */}
      {showDetailModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Chi Tiết Đơn Thuốc</h2>
                <p className="text-blue-100 mt-1">{selectedPrescription.patientName}</p>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="hover:bg-blue-500 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-bold uppercase mb-2">Tên Bệnh Nhân</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPrescription.patientName}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 font-bold uppercase mb-2">Ngày Khám</p>
                  <p className="text-lg font-bold text-gray-900">{new Date(selectedPrescription.visitDate).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-xs text-yellow-600 font-bold uppercase mb-2">Chẩn Đoán</p>
                <p className="text-lg font-bold text-gray-900">{selectedPrescription.diagnosis}</p>
              </div>

              {/* Medications */}
              <div>
                <p className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  💊 Danh Sách Thuốc <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{selectedPrescription.medications?.length}</span>
                </p>
                <div className="space-y-3">
                  {selectedPrescription.medications?.map((med, idx) => (
                    <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                      <p className="text-lg font-bold text-gray-900 mb-3">{idx + 1}. {med.medicationName}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <p className="text-xs text-blue-600 font-bold uppercase mb-1">Liều Lượng</p>
                          <p className="font-bold text-gray-900">{med.dosage}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                          <p className="text-xs text-green-600 font-bold uppercase mb-1">Tần Suất</p>
                          <p className="font-bold text-gray-900">{med.frequency}</p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <p className="text-xs text-orange-600 font-bold uppercase mb-1">Thời Gian</p>
                          <p className="font-bold text-gray-900">{med.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedPrescription.notes && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                  <p className="text-xs text-purple-600 font-bold uppercase mb-2">Ghi Chú</p>
                  <p className="text-gray-800">{selectedPrescription.notes}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => handleDownload(selectedPrescription)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                <Download className="h-4 w-4" />
                Tải Xuống
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-bold transition-colors"
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

export default Prescriptions;
