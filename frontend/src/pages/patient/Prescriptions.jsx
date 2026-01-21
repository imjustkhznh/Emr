import React, { useEffect, useState } from 'react';
import { Download, Calendar, Pill, AlertCircle } from 'lucide-react';

const samplePatientPrescriptions = [
  {
    id: '1',
    doctorName: 'Dr. Trần Văn A',
    specialty: 'Bác sĩ Nội khoa',
    medications: [
      { name: 'Paracetamol 500mg', quantity: 20, dosage: '2 viên/lần - 3 lần/ngày', duration: '5 ngày' },
      { name: 'Amoxicillin 250mg', quantity: 15, dosage: '1 viên/lần - 3 lần/ngày', duration: '7 ngày' }
    ],
    diagnosis: 'Cảm cúm thông thường',
    createdDate: '2026-01-10',
    expiryDate: '2026-02-10',
    status: 'active',
    notes: 'Dùng sau ăn, không dùng khi có dị ứng'
  },
  {
    id: '2',
    doctorName: 'Dr. Nguyễn Thị B',
    specialty: 'Bác sĩ Da liễu',
    medications: [
      { name: 'Vitamin C 500mg', quantity: 30, dosage: '1 viên/lần - 1 lần/ngày', duration: '30 ngày' },
      { name: 'Biotin', quantity: 30, dosage: '1 viên/lần - 1 lần/ngày', duration: '30 ngày' }
    ],
    diagnosis: 'Bổ sung vitamin',
    createdDate: '2026-01-09',
    expiryDate: '2026-02-09',
    status: 'active',
    notes: 'Bổ sung để cải thiện sức khỏe da'
  },
  {
    id: '3',
    doctorName: 'Dr. Lê Văn C',
    specialty: 'Bác sĩ Tiêu hóa',
    medications: [
      { name: 'Omeprazole 20mg', quantity: 28, dosage: '1 viên/lần - 1 lần/ngày', duration: '4 tuần' },
      { name: 'Loperamide 2mg', quantity: 10, dosage: '1 viên/lần - 3 lần/ngày khi cần', duration: 'khi cần' }
    ],
    diagnosis: 'Rối loạn tiêu hóa',
    createdDate: '2025-12-20',
    expiryDate: '2026-01-20',
    status: 'expired',
    notes: 'Dùng trước ăn, tránh ăn quá cay'
  },
];

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load sample data - trong thực tế sẽ gọi API với patientId hiện tại
    setPrescriptions(samplePatientPrescriptions);
    setLoading(false);
  }, []);

  const handleDownload = (prescription) => {
    const content = `
====================================
        ĐƠN THUỐC CÁ NHÂN
====================================

Bệnh nhân: [Tên bệnh nhân]
Ngày sinh: [Ngày sinh]
Số điện thoại: [Số điện thoại]

------------------------------------
THÔNG TIN ĐƠN THUỐC
------------------------------------
Bác sĩ kê đơn: ${prescription.doctorName}
Chuyên khoa: ${prescription.specialty}
Chẩn đoán: ${prescription.diagnosis}
Ngày kê: ${prescription.createdDate}
Hết hạn: ${prescription.expiryDate}

------------------------------------
DANH SÁCH THUỐC
------------------------------------
${prescription.medications.map((med, idx) => 
  `${idx + 1}. ${med.name}
   Liều lượng: ${med.dosage}
   Số lượng: ${med.quantity} ${med.name.includes('mg') ? 'viên' : 'lọ'}
   Thời gian dùng: ${med.duration}`
).join('\n\n')}

------------------------------------
GHI CHÚ
------------------------------------
${prescription.notes}

------------------------------------
HƯỚNG DẪN SỬ DỤNG
------------------------------------
• Dùng đúng liều lượng, số lần theo đơn kê
• Nếu có phản ứng không mong muốn, liên hệ bác sĩ ngay
• Bảo quản thuốc ở nơi thoáng mát, tránh ánh sáng trực tiếp
• Không tự ý điều chỉnh liều hoặc thay đổi thời gian dùng
• Hoàn thành đơn thuốc đầy đủ ngay cả khi cảm thấy bình thường

====================================
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `don_thuoc_${prescription.createdDate}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredPrescriptions = prescriptions.filter(p => {
    if (filter === 'active') return p.status === 'active';
    if (filter === 'expired') return p.status === 'expired';
    return true;
  });

  return (
    <div className="p-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Đơn thuốc của tôi</h1>
          <p className="text-gray-600 mt-2">Xem và quản lý các đơn thuốc được kê bởi các bác sĩ</p>
        </div>

        {/* Filter */}
        <div className="flex gap-3">
          {['all', 'active', 'expired'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'all' ? 'Tất cả' : status === 'active' ? 'Đang dùng' : 'Hết hạn'}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-blue-500 text-lg font-semibold animate-pulse">Đang tải...</span>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <Pill className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có đơn thuốc nào</h3>
            <p className="text-gray-600">
              {filter === 'active' 
                ? 'Bạn không có đơn thuốc nào đang dùng' 
                : filter === 'expired'
                ? 'Bạn không có đơn thuốc hết hạn nào'
                : 'Bạn chưa có đơn thuốc nào'}
            </p>
          </div>
        ) : (
          // Prescriptions List
          <div className="space-y-4">
            {filteredPrescriptions.map(prescription => (
              <div
                key={prescription.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{prescription.doctorName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{prescription.specialty}</p>
                      <p className="text-sm text-gray-700 mt-2 font-medium">
                        Chẩn đoán: {prescription.diagnosis}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          prescription.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {prescription.status === 'active' ? '✓ Đang dùng' : '✕ Hết hạn'}
                      </span>
                      <div className="flex items-center justify-end gap-2 mt-3 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {prescription.createdDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medications */}
                <div className="p-6 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-blue-600" />
                    Danh sách thuốc
                  </h4>
                  <div className="space-y-3">
                    {prescription.medications.map((med, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <p className="font-medium text-gray-900">{idx + 1}. {med.name}</p>
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded whitespace-nowrap">
                            {med.quantity} {med.name.includes('mg') ? 'viên' : 'lọ'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Liều lượng:</span> {med.dosage}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Thời gian:</span> {med.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes & Actions */}
                <div className="p-6">
                  {prescription.notes && (
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">{prescription.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                    <p className="text-sm text-gray-600">
                      Hết hạn: <span className="font-semibold text-gray-900">{prescription.expiryDate}</span>
                    </p>
                    <button
                      onClick={() => handleDownload(prescription)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm w-full sm:w-auto justify-center"
                    >
                      <Download className="w-4 h-4" />
                      Tải xuống
                    </button>
                  </div>
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


