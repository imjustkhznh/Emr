import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Eye, Plus, Calendar, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/medical/records', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await response.json();
      if (data.success) {
        setRecords(data.data);
      }
    } catch (error) {
      toast.error('Lỗi khi tải hồ sơ y tế');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record => 
    record.patientId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patientId?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Hồ Sơ Y Tế</h1>
            <p className="text-gray-600 mt-1">Quản lý hồ sơ y tế bệnh nhân chi tiết</p>
          </div>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Tạo Hồ Sơ Mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white">
            <Filter className="h-5 w-5 text-gray-400" />
            <select className="outline-none bg-white font-semibold text-gray-700 cursor-pointer">
              <option value="">Tất Cả Loại Hồ Sơ</option>
              <option value="general">Y Tế Tổng Quát</option>
              <option value="diagnosis">Chẩn Đoán</option>
              <option value="treatment">Điều Trị</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      {loading ? (
        <div className="p-8 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-cyan-500" />
        </div>
      ) : filteredRecords.length > 0 ? (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">Bệnh Nhân</p>
                  <p className="text-sm font-bold text-gray-900">
                    {record.patientId?.firstName} {record.patientId?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">Mã Hồ Sơ</p>
                  <p className="text-sm font-bold text-gray-900">{record._id.substring(0, 8)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">Ngày Tạo</p>
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {new Date(record.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">Chẩn Đoán</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                    {record.diagnosis || 'Chưa có'}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Triệu Chứng:</span> {record.symptoms || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Bác Sĩ:</span> {record.doctorId?.firstName || 'Chưa xác định'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 bg-white rounded-2xl">
          Không có hồ sơ y tế nào
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
