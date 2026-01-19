import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Download, Pill, Calendar, User, Loader, X, Search, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    diagnosis: '',
    medications: [{ name: '', quantity: 1, dosage: '', duration: '' }]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      // Fetch medical records to get prescriptions
      const response = await fetch('http://localhost:5000/api/medical/my-patients-records', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Convert medical records to prescriptions format
        const prescriptionsData = data.data
          .filter(record => record.prescription && record.prescription.length > 0)
          .map(record => {
            // Get patient name from various possible fields
            const patientId = record.patientId;
            let patientName = 'N/A';
            
            if (patientId) {
              if (typeof patientId === 'object') {
                // Try name first, then firstName+lastName
                patientName = patientId.name || 
                  (patientId.firstName ? 
                    `${patientId.firstName} ${patientId.lastName || ''}`.trim() : 
                    'N/A');
              } else {
                patientName = 'N/A';
              }
            }
            
            return {
              _id: record._id,
              patientId: record.patientId?._id || record.patientId,
              patientName: patientName,
              diagnosis: record.diagnosis,
              medications: record.prescription,
              visitDate: record.visitDate,
              notes: record.notes
            };
          });
        
        console.log('Prescriptions data:', prescriptionsData);
        setPrescriptions(prescriptionsData);
      }
    } catch (error) {
      console.error('Error loading prescriptions:', error);
      toast.error('Lỗi khi tải đơn thuốc');
    } finally {
      setLoading(false);
    }
  };

  const filteredPrescriptions = prescriptions.filter(p => 
    p.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { name: '', quantity: 1, dosage: '', duration: '' }]
    });
  };

  const handleRemoveMedication = (index) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((_, i) => i !== index)
    });
  };

  const handleMedicationChange = (index, field, value) => {
    const newMeds = [...formData.medications];
    newMeds[index][field] = field === 'quantity' ? Number(value) : value;
    setFormData({ ...formData, medications: newMeds });
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (!formData.patientId || !formData.diagnosis || formData.medications.some(m => !m.name)) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }

      const patient = patients.find(p => p._id === formData.patientId);
      const payload = {
        ...formData,
        patientName: patient?.name,
        createdDate: new Date()
      };

      try {
        if (editingId) {
          await medicalAPI.update(editingId, payload);
          toast.success('Cập nhật đơn thuốc thành công!');
        } else {
          await medicalAPI.create(payload);
          toast.success('Tạo đơn thuốc thành công!');
        }
        loadData();
        setShowModal(false);
        setEditingId(null);
        setFormData({
          patientId: '',
          patientName: '',
          diagnosis: '',
          medications: [{ name: '', quantity: 1, dosage: '', duration: '' }]
        });
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Lỗi khi lưu đơn thuốc');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Lỗi khi lưu đơn thuốc');
    }
  };

  const handleEdit = (prescription) => {
    setFormData(prescription);
    setEditingId(prescription._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn thuốc này?')) {
      try {
        await medicalAPI.delete(id);
        toast.success('Xóa đơn thuốc thành công!');
        loadData();
      } catch (error) {
        console.error('Error:', error);
        toast.error('Lỗi khi xóa đơn thuốc');
      }
    }
  };

  const handleDownload = (prescription) => {
    const content = `ĐƠNHUỐC
=====================================
Bệnh nhân: ${prescription.patientName}
Chẩn đoán: ${prescription.diagnosis}
Ngày kê: ${new Date(prescription.createdDate).toLocaleDateString('vi-VN')}

DANH SÁCH THUỐC:
${prescription.medications.map((med, idx) => 
  `${idx + 1}. ${med.name}
   - Liều lượng: ${med.dosage}
   - Số lượng: ${med.quantity}
   - Thời gian: ${med.duration}`
).join('\n\n')}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `don-thuoc-${prescription._id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Tải xuống đơn thuốc thành công!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg">
            <Pill className="h-8 w-8 text-white" />
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
              medications: [{ name: '', quantity: 1, dosage: '', duration: '' }]
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Kê Đơn Mới
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bệnh nhân hoặc chẩn đoán..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          </div>
        ) : filteredPrescriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {filteredPrescriptions.map((p) => (
              <div key={p._id} className="bg-white rounded-2xl border-2 border-blue-200 p-6 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {p.patientName?.charAt(0).toUpperCase() || 'P'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{p.patientName || 'N/A'}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(p.visitDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="mb-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Chẩn Đoán</p>
                  <p className="text-lg font-bold text-gray-900">{p.diagnosis}</p>
                </div>

                {/* Medications List */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Danh Sách Thuốc <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs ml-2">{p.medications?.length || 0}</span></p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {p.medications?.map((med, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-300 hover:border-blue-400 transition-colors">
                        <p className="font-semibold text-gray-900">{idx + 1}. {med.medicationName}</p>
                        <div className="flex gap-4 text-xs text-gray-600 mt-1">
                          <span>💊 {med.dosage}</span>
                          <span>⏱️ {med.frequency}</span>
                          <span>📅 {med.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedPrescription(p);
                      setShowDetailModal(true);
                    }}
                    className="flex-1 p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <Eye className="h-5 w-5" />
                    Chi Tiết
                  </button>
                  <button 
                    onClick={() => {
                      const content = `ĐƠN THUỐC\n${'═'.repeat(50)}\nBệnh nhân: ${p.patientName}\nChẩn đoán: ${p.diagnosis}\nNgày khám: ${new Date(p.visitDate).toLocaleDateString('vi-VN')}\n\nDANH SÁCH THUỐC:\n${p.medications?.map((m, i) => `${i+1}. ${m.medicationName}\n   • Liều lượng: ${m.dosage}\n   • Tần suất: ${m.frequency}\n   • Thời gian: ${m.duration}`).join('\n\n') || 'Không có'}`;
                      const element = document.createElement('a');
                      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
                      element.setAttribute('download', `don-thuoc-${p.patientName}-${new Date().getTime()}.txt`);
                      element.style.display = 'none';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                      toast.success('Tải xuống thành công!');
                    }}
                    className="p-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all shadow-md hover:shadow-lg">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold">Không có đơn thuốc nào</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingId ? 'Chỉnh Sửa Đơn Thuốc' : 'Kê Đơn Mới'}</h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
                className="hover:bg-blue-800 p-2 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Bệnh Nhân *</label>
                <select
                  value={formData.patientId}
                  onChange={(e) => {
                    const patient = patients.find(p => p._id === e.target.value);
                    setFormData({ ...formData, patientId: e.target.value, patientName: patient?.name });
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Chọn bệnh nhân</option>
                  {patients.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
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
                        value={med.name}
                        onChange={(e) => handleMedicationChange(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          placeholder="Số lượng"
                          value={med.quantity}
                          onChange={(e) => handleMedicationChange(idx, 'quantity', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Liều lượng"
                          value={med.dosage}
                          onChange={(e) => handleMedicationChange(idx, 'dosage', e.target.value)}
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
                          Xóa thuốc này
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

              <div className="flex gap-2 justify-end pt-4 border-t">
                <button
                  onClick={handleCreateOrUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  {editingId ? 'Cập Nhật' : 'Tạo Đơn'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl animate-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 flex justify-between items-center rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold">Chi Tiết Đơn Thuốc</h2>
                <p className="text-blue-100 mt-1">{selectedPrescription.patientName}</p>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* Patient & Diagnosis */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <p className="text-sm font-bold text-blue-600 uppercase mb-2">Bệnh Nhân</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPrescription.patientName}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                  <p className="text-sm font-bold text-green-600 uppercase mb-2">Ngày Khám</p>
                  <p className="text-2xl font-bold text-gray-900">{new Date(selectedPrescription.visitDate).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-l-4 border-yellow-500 mb-8">
                <p className="text-sm font-bold text-yellow-600 uppercase mb-2">Chẩn Đoán</p>
                <p className="text-xl font-bold text-gray-900">{selectedPrescription.diagnosis}</p>
              </div>

              {/* Medications */}
              <div>
                <p className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  💊 Danh Sách Thuốc <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{selectedPrescription.medications?.length || 0}</span>
                </p>
                <div className="space-y-3">
                  {selectedPrescription.medications?.map((med, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-5 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-gray-900">{idx + 1}. {med.medicationName}</h4>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-semibold">Thuốc</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-600 font-bold uppercase mb-1">Liều Lượng</p>
                          <p className="text-lg font-bold text-gray-900">{med.dosage}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-xs text-green-600 font-bold uppercase mb-1">Tần Suất</p>
                          <p className="text-lg font-bold text-gray-900">{med.frequency}</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-xs text-orange-600 font-bold uppercase mb-1">Thời Gian</p>
                          <p className="text-lg font-bold text-gray-900">{med.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedPrescription.notes && (
                <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 p-6 rounded-2xl">
                  <p className="text-sm font-bold text-purple-600 uppercase mb-2">Ghi Chú</p>
                  <p className="text-gray-800">{selectedPrescription.notes}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t p-6 rounded-b-3xl flex gap-3 justify-end">
              <button
                onClick={() => {
                  const content = `ĐƠN THUỐC\n${'═'.repeat(60)}\nBệnh nhân: ${selectedPrescription.patientName}\nChẩn đoán: ${selectedPrescription.diagnosis}\nNgày khám: ${new Date(selectedPrescription.visitDate).toLocaleDateString('vi-VN')}\n\nDANH SÁCH THUỐC:\n${selectedPrescription.medications?.map((m, i) => `${i+1}. ${m.medicationName}\n   • Liều lượng: ${m.dosage}\n   • Tần suất: ${m.frequency}\n   • Thời gian: ${m.duration}`).join('\n\n')}`;
                  const element = document.createElement('a');
                  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
                  element.setAttribute('download', `don-thuoc-${selectedPrescription.patientName}-${new Date().getTime()}.txt`);
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                  toast.success('Tải xuống thành công!');
                }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg">
                <Download className="h-5 w-5" />
                Tải Xuống
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-bold transition-colors">
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
