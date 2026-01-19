import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Eye, Loader, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const DoctorMedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/medical/my-patients-records', {
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
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-3 rounded-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Hồ Sơ Y Tế Bệnh Nhân</h1>
          <p className="text-gray-600 mt-1">Xem và quản lý hồ sơ y tế của bệnh nhân</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân hoặc chẩn đoán..."
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
            <div key={record._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">👤 Bệnh Nhân</p>
                    <p className="text-lg font-bold text-gray-900">
                      {record.patientId?.firstName} {record.patientId?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">📋 Mã Hồ Sơ</p>
                    <p className="text-lg font-bold text-cyan-600">{record._id.substring(0, 8)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">📅 Ngày Tạo</p>
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(record.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">🏥 Trạng Thái</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                      Đang Điều Trị
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chẩn Đoán */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-2">🔍 Chẩn Đoán</p>
                    <p className="text-base font-semibold text-gray-900 leading-relaxed">
                      {record.diagnosis ? (
                        <span className="text-blue-700">{record.diagnosis}</span>
                      ) : (
                        <span className="text-gray-400 italic">Chưa xác định</span>
                      )}
                    </p>
                  </div>

                  {/* Phương Pháp Điều Trị */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-xs text-green-600 font-bold uppercase tracking-widest mb-2">💊 Phương Pháp Điều Trị</p>
                    <p className="text-base font-semibold text-gray-900 leading-relaxed">
                      {record.treatment ? (
                        <span className="text-green-700">{record.treatment}</span>
                      ) : (
                        <span className="text-gray-400 italic">Chưa xác định</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Ghi Chú */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mb-2">📝 Ghi Chú</p>
                  <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {record.notes ? (
                      record.notes
                    ) : (
                      <span className="text-gray-400 italic">Không có ghi chú</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-2 justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  Xem Chi Tiết
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  <Download className="h-4 w-4" />
                  Tải Xuống
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl shadow-lg border border-gray-100">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Không có hồ sơ y tế</p>
        </div>
      )}
    </div>
  );
};

export default DoctorMedicalRecords;
