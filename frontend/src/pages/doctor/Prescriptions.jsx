import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Download, Pill, Calendar, User } from 'lucide-react';

const patientsList = [
  { id: 'BN001', name: 'Nguyễn Văn An' },
  { id: 'BN002', name: 'Trần Thị Bình' },
  { id: 'BN003', name: 'Lê Văn Cường' },
  { id: 'BN004', name: 'Phạm Thị Dung' },
  { id: 'BN005', name: 'Hoàng Minh Tuấn' },
  { id: 'BN006', name: 'Vũ Thị Lan' },
  { id: 'BN007', name: 'Đặng Văn Hùng' },
  { id: 'BN008', name: 'Bùi Thị Mai' },
  { id: 'BN009', name: 'Phan Văn Quang' },
  { id: 'BN010', name: 'Đỗ Thị Hạnh' },
];

const samplePrescriptions = [
  {
    id: '1',
    patientId: 'BN001',
    patientName: 'Nguyễn Văn An',
    medications: [
      { name: 'Paracetamol 500mg', quantity: 20, dosage: '2 viên/lần - 3 lần/ngày', duration: '5 ngày' },
      { name: 'Amoxicillin 250mg', quantity: 15, dosage: '1 viên/lần - 3 lần/ngày', duration: '7 ngày' }
    ],
    diagnosis: 'Cảm cúm thông thường',
    createdDate: '2026-01-10',
    status: 'active'
  },
  {
    id: '2',
    patientId: 'BN002',
    patientName: 'Trần Thị Bình',
    medications: [
      { name: 'Vitamin C 500mg', quantity: 30, dosage: '1 viên/lần - 1 lần/ngày', duration: '30 ngày' },
      { name: 'Biotin', quantity: 30, dosage: '1 viên/lần - 1 lần/ngày', duration: '30 ngày' }
    ],
    diagnosis: 'Bổ sung vitamin',
    createdDate: '2026-01-09',
    status: 'active'
  },
  {
    id: '3',
    patientId: 'BN003',
    patientName: 'Lê Văn Cường',
    medications: [
      { name: 'Omeprazole 20mg', quantity: 28, dosage: '1 viên/lần - 1 lần/ngày', duration: '4 tuần' },
      { name: 'Loperamide 2mg', quantity: 10, dosage: '1 viên/lần - 3 lần/ngày khi cần', duration: 'khi cần' }
    ],
    diagnosis: 'Rối loạn tiêu hóa',
    createdDate: '2026-01-08',
    status: 'expired'
  },
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    patientId: '',
    patientName: '',
    diagnosis: '',
    medications: [{ name: '', quantity: '', dosage: '', duration: '' }]
  });

  useEffect(() => {
    // Load sample data
    setPrescriptions(samplePrescriptions);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (index, field, value) => {
    const newMeds = [...form.medications];
    newMeds[index][field] = value;
    setForm(prev => ({ ...prev, medications: newMeds }));
  };

  const addMedicationField = () => {
    setForm(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', quantity: '', dosage: '', duration: '' }]
    }));
  };

  const removeMedicationField = (index) => {
    setForm(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId || !form.diagnosis || form.medications.some(m => !m.name)) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newPrescription = {
      id: editingId || Date.now().toString(),
      ...form,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    if (editingId) {
      setPrescriptions(prescriptions.map(p => p.id === editingId ? newPrescription : p));
      setEditingId(null);
    } else {
      setPrescriptions([newPrescription, ...prescriptions]);
    }

    setForm({ patientId: '', patientName: '', diagnosis: '', medications: [{ name: '', quantity: '', dosage: '', duration: '' }] });
    setShowForm(false);
  };

  const handleEdit = (prescription) => {
    setForm(prescription);
    setEditingId(prescription.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn thuốc này?')) {
      setPrescriptions(prescriptions.filter(p => p.id !== id));
    }
  };

  const handleDownload = (prescription) => {
    const content = `
ĐƠNHUỐC
=====================================
Bệnh nhân: ${prescription.patientName} (${prescription.patientId})
Chẩn đoán: ${prescription.diagnosis}
Ngày kê: ${prescription.createdDate}

DANH SÁCH THUỐC:
${prescription.medications.map((med, idx) => 
  `${idx + 1}. ${med.name}
   - Liều lượng: ${med.dosage}
   - Số lượng: ${med.quantity} ${med.name.includes('mg') ? 'viên' : 'lọ'}
   - Thời gian: ${med.duration}`
).join('\n\n')}

Lưu ý:
- Dùng đúng liều lượng, số lần theo đơn kê
- Nếu có phản ứng không mong muốn, liên hệ ngay cơ sở y tế
- Bảo quản thuốc ở nơi thoáng mát, tránh ánh sáng trực tiếp
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `don_thuoc_${prescription.patientName}_${prescription.createdDate}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-2 md:p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Quản lý đơn thuốc</h1>
            <p className="text-gray-500 mt-1">Kê đơn thuốc cho bệnh nhân và quản lý lịch sử</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setForm({ patientId: '', patientName: '', diagnosis: '', medications: [{ name: '', quantity: '', dosage: '', duration: '' }] });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" /> {showForm ? 'Đóng' : 'Kê đơn mới'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{editingId ? 'Cập nhật đơn thuốc' : 'Kê đơn thuốc mới'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bệnh nhân</label>
                <select
                  name="patientId"
                  value={form.patientId}
                  onChange={(e) => {
                    const selected = patientsList.find(p => p.id === e.target.value);
                    setForm(prev => ({ ...prev, patientId: e.target.value, patientName: selected?.name || '' }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn bệnh nhân</option>
                  {patientsList.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chẩn đoán</label>
                <input
                  type="text"
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={handleChange}
                  placeholder="Nhập chẩn đoán bệnh"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="lg:col-span-3">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Danh sách thuốc</h4>
                <div className="space-y-3">
                  {form.medications.map((med, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-end">
                      <input
                        type="text"
                        placeholder="Tên thuốc (vd: Paracetamol 500mg)"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(idx, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Số lượng"
                        value={med.quantity}
                        onChange={(e) => handleMedicationChange(idx, 'quantity', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Liều lượng (vd: 2 viên/lần - 3 lần/ngày)"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(idx, 'dosage', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Thời gian dùng"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(idx, 'duration', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      {form.medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicationField(idx)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-semibold"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addMedicationField}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  + Thêm thuốc khác
                </button>
              </div>

              <div className="lg:col-span-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {editingId ? 'Cập nhật' : 'Kê đơn'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm({ patientId: '', patientName: '', diagnosis: '', medications: [{ name: '', quantity: '', dosage: '', duration: '' }] });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bệnh nhân, mã BN hoặc chẩn đoán..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="active">Đang dùng</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>

        {/* Prescriptions List */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-blue-500 text-lg font-semibold animate-pulse">Đang tải dữ liệu...</span>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 text-lg">Không có đơn thuốc nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{prescription.patientName}</h3>
                        <p className="text-sm text-gray-600">Mã BN: {prescription.patientId}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-8">
                      <span className="font-semibold">Chẩn đoán:</span> {prescription.diagnosis}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      prescription.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {prescription.status === 'active' ? 'Đang dùng' : 'Hết hạn'}
                    </span>
                    <div className="text-sm text-gray-600 mt-2 flex items-center justify-end gap-1">
                      <Calendar className="w-4 h-4" />
                      {prescription.createdDate}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Danh sách thuốc
                  </h4>
                  <div className="space-y-2">
                    {prescription.medications.map((med, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        <p className="font-medium">{idx + 1}. {med.name}</p>
                        <p className="ml-4 text-gray-600">
                          • Liều: {med.dosage} • Số lượng: {med.quantity} • Thời gian: {med.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleDownload(prescription)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold text-sm"
                  >
                    <Download className="w-4 h-4" /> Tải xuống
                  </button>
                  <button
                    onClick={() => handleEdit(prescription)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold text-sm"
                  >
                    <Edit2 className="w-4 h-4" /> Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(prescription.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold text-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
