import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Download, Pill, Calendar, User, Loader, X, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { medicalAPI, userAPI } from '../../services/apiService';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
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
      const [presRes, patRes] = await Promise.all([
        medicalAPI.getAll(),
        userAPI.getAll()
      ]);
      
      if (presRes.data?.data) {
        setPrescriptions(presRes.data.data);
      }
      
      if (patRes.data?.data) {
        const patientUsers = patRes.data.data.filter(u => u.role === 'patients');
        setPatients(patientUsers);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Lỗi khi tải dữ liệu');
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
    <div className="space-y-6">
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
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Bệnh Nhân</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Chẩn Đoán</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Số Thuốc</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Ngày Kê</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPrescriptions.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{p.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{p.diagnosis}</td>
                  <td className="px-6 py-4 text-gray-700">{p.medications?.length || 0} loại</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(p.createdDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDownload(p)}
                        className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(p._id)}
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
            Không có đơn thuốc nào
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
    </div>
  );
};

export default Prescriptions;
