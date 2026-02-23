import React, { useState } from 'react';
import { Search, Download, Eye } from 'lucide-react';
import { sampleExaminations, sampleDoctors } from './sampleData';

const Examinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const getDoctorName = (doctorId) => {
    const doctor = sampleDoctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Không rõ';
  };

  const filteredExams = sampleExaminations.filter(exam => {
    const matchesSearch = exam.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedCount = sampleExaminations.filter(e => e.status === 'completed').length;
  const pendingCount = sampleExaminations.filter(e => e.status === 'pending').length;

  const handleViewDetail = (exam) => {
    setSelectedExam(exam);
    setShowDetail(true);
  };

  const handleDownload = (exam) => {
    const content = `PHIẾU KẾT QUẢ KHÁM BỆNH
=====================================
Mã BN: ${exam.patientId}
Tên BN: ${exam.patientName}
Bác sĩ khám: ${exam.doctorName}
Ngày khám: ${exam.examinationDate}

CHẨN ĐOÁN: ${exam.diagnosis}

TRIỆU CHỨNG: ${exam.symptoms}

KẾT QUẢ XÉT NGHIỆM: ${exam.findings}

HƯỚNG ĐIỀU TRỊ: ${exam.treatment}

GHI CHÚ: ${exam.notes}

Trạng thái: ${exam.status === 'completed' ? 'Đã hoàn thành' : 'Đang chờ'}
=====================================`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `khambbenh_${exam.patientId}_${exam.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Quản Lý Khám Bệnh</h1>
        <p className="text-slate-600">Quản lý và theo dõi kết quả khám bệnh của bệnh nhân</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-400">
          <div className="text-sm text-slate-600">Tổng Khám</div>
          <div className="text-2xl font-bold text-slate-800">{sampleExaminations.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-400">
          <div className="text-sm text-slate-600">Đã Hoàn Thành</div>
          <div className="text-2xl font-bold text-slate-800">{completedCount}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-400">
          <div className="text-sm text-slate-600">Đang Chờ</div>
          <div className="text-2xl font-bold text-slate-800">{pendingCount}</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Tìm theo tên BN / Mã BN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">Tất Cả Trạng Thái</option>
            <option value="completed">Đã Hoàn Thành</option>
            <option value="pending">Đang Chờ</option>
          </select>
        </div>
      </div>

      {/* Examinations Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Mã BN</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Tên Bệnh Nhân</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Bác Sĩ</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Chẩn Đoán</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Ngày Khám</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Trạng Thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => (
                <tr key={exam.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm text-slate-800">{exam.patientId}</td>
                  <td className="px-6 py-3 text-sm text-slate-800">{exam.patientName}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">{exam.doctorName}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">{exam.diagnosis}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">{exam.examinationDate}</td>
                  <td className="px-6 py-3 text-sm">
                    {exam.status === 'completed' ? (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        ✓ Đã Hoàn Thành
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                        ⏳ Đang Chờ
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetail(exam)}
                        className="p-1 hover:bg-blue-100 text-blue-600 rounded"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDownload(exam)}
                        className="p-1 hover:bg-green-100 text-green-600 rounded"
                        title="Tải xuống"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredExams.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            Không tìm thấy kết quả khám bệnh
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Chi Tiết Khám Bệnh</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Mã BN</p>
                  <p className="font-semibold text-slate-800">{selectedExam.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Tên Bệnh Nhân</p>
                  <p className="font-semibold text-slate-800">{selectedExam.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Bác Sĩ Khám</p>
                  <p className="font-semibold text-slate-800">{selectedExam.doctorName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Ngày Khám</p>
                  <p className="font-semibold text-slate-800">{selectedExam.examinationDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600">Chẩn Đoán</p>
                <p className="font-semibold text-slate-800">{selectedExam.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Triệu Chứng</p>
                <p className="text-slate-700">{selectedExam.symptoms}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Kết Quả Xét Nghiệm</p>
                <p className="text-slate-700">{selectedExam.findings}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Hướng Điều Trị</p>
                <p className="text-slate-700">{selectedExam.treatment}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Ghi Chú</p>
                <p className="text-slate-700">{selectedExam.notes}</p>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex gap-2 justify-end">
              <button
                onClick={() => handleDownload(selectedExam)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Download size={18} />
                Tải Xuống
              </button>
              <button
                onClick={() => setShowDetail(false)}
                className="px-4 py-2 bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-400"
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

export default Examinations;
