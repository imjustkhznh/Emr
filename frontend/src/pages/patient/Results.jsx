import React, { useState } from 'react';
import { FlaskConical, Download, Search, TrendingUp, Calendar, Share2, AlertCircle, X, CheckCircle2, AlertTriangle } from 'lucide-react';

const Results = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [results] = useState([
    { id: 1, testName: 'Xét nghiệm Máu', date: '2025-01-15', status: 'normal', value: 'WBC: 7.5, RBC: 4.8', doctor: 'Dr. Trần Hữu Bình' },
    { id: 2, testName: 'Xét nghiệm Cholesterol', date: '2025-01-20', status: 'abnormal', value: 'Total: 250 (cao)', doctor: 'Dr. Đặng Ngọc Hiểu' },
    { id: 3, testName: 'Xét nghiệm Glucose', date: '2025-01-22', status: 'normal', value: 'Fasting: 95 mg/dL', doctor: 'Dr. Phạm Mạnh Dũng' },
    { id: 4, testName: 'Siêu âm Tim', date: '2025-01-10', status: 'normal', value: 'Cấu trúc bình thường', doctor: 'Dr. Lê Thanh Tùng' }
  ]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = (result) => {
    const resultText = `KẾT QUẢ XÉT NGHIỆM
==================================
Tên Xét Nghiệm: ${result.testName}
Ngày Thực Hiện: ${new Date(result.date).toLocaleDateString('vi-VN')}
Bác Sĩ: ${result.doctor}

KẾT QUẢ:
${result.value}

TRẠNG THÁI: ${result.status === 'normal' ? 'BÌNH THƯỜNG ✓' : 'BẤT THƯỜNG ⚠'}

Ghi Chú:
- Kết quả này được cấp bởi phòng khám MediCare EMR
- Vui lòng tư vấn với bác sĩ về kết quả
- Giữ bản sao an toàn

Ngày Xuất: ${new Date().toLocaleDateString('vi-VN')}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resultText));
    element.setAttribute('download', `result_${result.id}_${result.testName.replace(/\s+/g, '_')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Tải xuống kết quả xét nghiệm thành công`, 'success');
  };

  const handleShare = (result) => {
    const shareText = `Kết Quả Xét Nghiệm\n\n${result.testName}\nKết Quả: ${result.value}\nTrạng Thái: ${result.status === 'normal' ? 'Bình Thường' : 'Bất Thường'}\nNgày: ${new Date(result.date).toLocaleDateString('vi-VN')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Kết Quả Xét Nghiệm',
        text: shareText
      }).catch(err => showToast('Chia sẻ bị hủy', 'error'));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('Đã sao chép kết quả, bạn có thể chia sẻ', 'success');
      }).catch(() => {
        showToast('Không thể sao chép kết quả', 'error');
      });
    }
  };

  const filteredResults = results.filter(r =>
    r.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const normalCount = results.filter(r => r.status === 'normal').length;
  const abnormalCount = results.filter(r => r.status === 'abnormal').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 max-w-sm z-50 animate-in fade-in slide-in-from-top-5 duration-300 ${
          toast.type === 'success' 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200'
        } rounded-lg shadow-lg p-4`}>
          <div className="flex items-start gap-3">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-semibold ${toast.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                {toast.type === 'success' ? '✓ Thành công' : '⚠ Lỗi'}
              </p>
              <p className={`text-sm mt-1 ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className={`flex-shrink-0 ${toast.type === 'success' ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Kết Quả Xét Nghiệm</h1>
          <p className="text-base text-gray-600">Xem và tải xuống các kết quả xét nghiệm của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-200 rounded-lg p-3">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-700">Bình Thường</p>
                <p className="text-2xl font-bold text-green-900">{normalCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-orange-200 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-orange-700">Bất Thường</p>
                <p className="text-2xl font-bold text-orange-900">{abnormalCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm xét nghiệm, bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-green-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-lg border border-green-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`rounded-lg p-2.5 ${r.status === 'normal' ? 'bg-green-50' : 'bg-orange-50'}`}>
                      <FlaskConical className={`w-6 h-6 ${r.status === 'normal' ? 'text-green-600' : 'text-orange-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{r.testName}</h3>
                      <p className="text-sm text-gray-600">Bác sĩ: {r.doctor}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      r.status === 'normal'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {r.status === 'normal' ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5" /> Bình Thường
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3.5 h-3.5" /> Bất Thường
                      </>
                    )}
                  </span>
                </div>

                {/* Result Value */}
                <div className="bg-gray-50 rounded-lg p-4 mb-5 border-l-4 border-gray-200">
                  <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Kết Quả</p>
                  <p className="text-gray-900 font-semibold">{r.value}</p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>{new Date(r.date).toLocaleDateString('vi-VN')}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownload(r)}
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Tải Xuống
                  </button>
                  <button 
                    onClick={() => handleShare(r)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" /> Chia Sẻ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-green-100">
              <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Không tìm thấy kết quả xét nghiệm nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
