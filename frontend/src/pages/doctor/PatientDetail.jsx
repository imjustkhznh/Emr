import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, AlertCircle } from 'lucide-react';

// Dữ liệu fake 25 bệnh nhân cứng
const FAKE_DOCTOR_PATIENTS = [
  { _id: 'dp_1', name: 'Nguyễn Văn An', age: 35, gender: 'Nam', phone: '0912345670', email: 'nguyenvanan1@gmail.com', address: 'Số 10 Phố Nguyễn Huệ, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-15', diagnosis: 'Huyết áp cao', symptoms: ['Đau đầu', 'Chóng mặt'], treatment: 'Uống thuốc huyết áp' },
  { _id: 'dp_2', name: 'Trần Thị Bình', age: 28, gender: 'Nữ', phone: '0912345671', email: 'tranthbinh2@gmail.com', address: 'Số 25 Đường Trần Hưng Đạo, TP. HCM', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-16', diagnosis: 'Cảm cúm', symptoms: ['Ho', 'Sốt'], treatment: 'Nghỉ ngơi và uống thuốc' },
  { _id: 'dp_3', name: 'Phạm Minh Châu', age: 42, gender: 'Nam', phone: '0912345672', email: 'phamminhchau3@gmail.com', address: 'Số 55 Phố Cổ Loa, Hà Nội', status: 'Đang điều trị', role: 'patients', lastVisit: '2025-01-10', diagnosis: 'Tiểu đường', symptoms: ['Khát nước', 'Mệt mỏi'], treatment: 'Quản lý chế độ ăn' },
  { _id: 'dp_4', name: 'Hoàng Thị Dung', age: 31, gender: 'Nữ', phone: '0912345673', email: 'hoangthidung4@gmail.com', address: 'Số 88 Đường Hoàng Văn Thụ, Đà Nẵng', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-18', diagnosis: 'Viêm phế quản', symptoms: ['Ho kéo dài', 'Khó thở'], treatment: 'Kháng sinh' },
  { _id: 'dp_5', name: 'Vũ Quốc Gia', age: 55, gender: 'Nam', phone: '0912345674', email: 'vuquocgia5@gmail.com', address: 'Số 15 Phố Kim Mã, Hà Nội', status: 'Tạm dừng', role: 'patients', lastVisit: '2024-12-20', diagnosis: 'Tim mạch', symptoms: ['Đau ngực', 'Hơn thở'], treatment: 'Theo dõi định kỳ' },
  { _id: 'dp_6', name: 'Đặng Ngọc Hạnh', age: 26, gender: 'Nữ', phone: '0912345675', email: 'dangngochahn6@gmail.com', address: 'Số 42 Đường Lê Lợi, TP. HCM', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-17', diagnosis: 'Dị ứng', symptoms: ['Ngứa', 'Phát ban'], treatment: 'Thuốc kháng dị ứng' },
  { _id: 'dp_7', name: 'Bùi Văn Hoàn', age: 48, gender: 'Nam', phone: '0912345676', email: 'buivanhoan7@gmail.com', address: 'Số 77 Phố Hàng Bông, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-12', diagnosis: 'Mỡ máu cao', symptoms: ['Không có triệu chứng'], treatment: 'Ăn uống lành mạnh' },
  { _id: 'dp_8', name: 'Dương Thị Linh', age: 33, gender: 'Nữ', phone: '0912345677', email: 'duongthilinh8@gmail.com', address: 'Số 99 Đường Pasteur, Hà Nội', status: 'Đang điều trị', role: 'patients', lastVisit: '2025-01-14', diagnosis: 'Loãng xương', symptoms: ['Đau xương', 'Yếu cơ'], treatment: 'Bổ sung canxi' },
  { _id: 'dp_9', name: 'Cao Minh Khánh', age: 29, gender: 'Nam', phone: '0912345678', email: 'caominhkhanh9@gmail.com', address: 'Số 33 Phố Bà Triệu, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-19', diagnosis: 'Viêm dạ dày', symptoms: ['Đau bụng', 'Buồn nôn'], treatment: 'Ăn uống nhạt nhẽo' },
  { _id: 'dp_10', name: 'Lê Thị Linh', age: 37, gender: 'Nữ', phone: '0912345679', email: 'lethilinh10@gmail.com', address: 'Số 60 Đường Võ Văn Kiệt, TP. HCM', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-13', diagnosis: 'Đau cơ', symptoms: ['Đau lưng', 'Cứng cơ'], treatment: 'Massage và vật lý trị liệu' },
  { _id: 'dp_11', name: 'Võ Hữu Minh', age: 45, gender: 'Nam', phone: '0912345680', email: 'vohuuminh11@gmail.com', address: 'Số 18 Phố Nguyễn Huệ, Hà Nội', status: 'Tạm dừng', role: 'patients', lastVisit: '2024-12-15', diagnosis: 'Stress', symptoms: ['Mất ngủ', 'Lo âu'], treatment: 'Tâm lý tư vấn' },
  { _id: 'dp_12', name: 'Phan Thị Nhuận', age: 32, gender: 'Nữ', phone: '0912345681', email: 'phanthinhuan12@gmail.com', address: 'Số 44 Đường Trần Hưng Đạo, Hải Phòng', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-11', diagnosis: 'Thiếu máu', symptoms: ['Mệt mỏi', 'Chóng mặt'], treatment: 'Bổ sung sắt' },
  { _id: 'dp_13', name: 'Lý Văn Oanh', age: 51, gender: 'Nam', phone: '0912345682', email: 'lyvanoanh13@gmail.com', address: 'Số 72 Phố Cổ Loa, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-09', diagnosis: 'Viêm khớp', symptoms: ['Đau khớp', 'Sưng phù'], treatment: 'Thuốc chống viêm' },
  { _id: 'dp_14', name: 'Huỳnh Thị Phương', age: 30, gender: 'Nữ', phone: '0912345683', email: 'huynhthiphuong14@gmail.com', address: 'Số 85 Đường Hoàng Văn Thụ, Cần Thơ', status: 'Đang điều trị', role: 'patients', lastVisit: '2025-01-08', diagnosis: 'Hen phế quản', symptoms: ['Hơn thở', 'Khó chịu'], treatment: 'Inhale thuốc' },
  { _id: 'dp_15', name: 'Kiều Minh Quân', age: 40, gender: 'Nam', phone: '0912345684', email: 'kieuminhquan15@gmail.com', address: 'Số 29 Phố Kim Mã, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-07', diagnosis: 'Viêm tuyến tiền liệt', symptoms: ['Khó tiểu', 'Đau'], treatment: 'Kháng sinh' },
  { _id: 'dp_16', name: 'Hà Thị Rúa', age: 27, gender: 'Nữ', phone: '0912345685', email: 'hathirua16@gmail.com', address: 'Số 56 Đường Lê Lợi, Hải Phòng', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-20', diagnosis: 'Mụn trứng cá', symptoms: ['Mụn trên mặt', 'Viêm da'], treatment: 'Skincare đúng cách' },
  { _id: 'dp_17', name: 'Trương Văn Sơn', age: 52, gender: 'Nam', phone: '0912345686', email: 'truongvanson17@gmail.com', address: 'Số 91 Phố Hàng Bông, Hà Nội', status: 'Tạm dừng', role: 'patients', lastVisit: '2024-12-10', diagnosis: 'Sỏi thận', symptoms: ['Đau tức lưng', 'Tiểu máu'], treatment: 'Theo dõi' },
  { _id: 'dp_18', name: 'Quách Thị Tâm', age: 34, gender: 'Nữ', phone: '0912345687', email: 'quachthitam18@gmail.com', address: 'Số 63 Đường Pasteur, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-06', diagnosis: 'Thắp phế quản', symptoms: ['Ho', 'Chảy máu mũi'], treatment: 'Antibiotics' },
  { _id: 'dp_19', name: 'Đỗ Hữu Uyên', age: 46, gender: 'Nam', phone: '0912345688', email: 'dohuuuyen19@gmail.com', address: 'Số 37 Phố Bà Triệu, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-05', diagnosis: 'Chứng khí hư', symptoms: ['Mệt mỏi', 'Tỉnh táo kém'], treatment: 'Bổ sung năng lượng' },
  { _id: 'dp_20', name: 'Tô Thị Vân', age: 29, gender: 'Nữ', phone: '0912345689', email: 'tothivan20@gmail.com', address: 'Số 74 Đường Võ Văn Kiệt, Biên Hòa', status: 'Đang điều trị', role: 'patients', lastVisit: '2025-01-04', diagnosis: 'Hội chứng buồn nôn', symptoms: ['Buồn nôn', 'Nôn'], treatment: 'Kiêng ăn cứng' },
  { _id: 'dp_21', name: 'Nguyễn Minh Anh', age: 38, gender: 'Nam', phone: '0912345690', email: 'nguyenminhanh21@gmail.com', address: 'Số 22 Phố Nguyễn Huệ, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-03', diagnosis: 'Thiếu ngủ mãn tính', symptoms: ['Mất ngủ', 'Mệt'], treatment: 'Cải thiện thói quen ngủ' },
  { _id: 'dp_22', name: 'Trần Thị Bích', age: 43, gender: 'Nữ', phone: '0912345691', email: 'tranthbich22@gmail.com', address: 'Số 51 Đường Trần Hưng Đạo, Nha Trang', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-02', diagnosis: 'Viêm lợi', symptoms: ['Chảy máu chân răng', 'Sưng lợi'], treatment: 'Vệ sinh miệng tốt' },
  { _id: 'dp_23', name: 'Phạm Quốc Cương', age: 49, gender: 'Nam', phone: '0912345692', email: 'phamquoccuong23@gmail.com', address: 'Số 68 Phố Cổ Loa, Hà Nội', status: 'Tạm dừng', role: 'patients', lastVisit: '2024-12-05', diagnosis: 'Béo phì', symptoms: ['Tăng cân', 'Khó thở'], treatment: 'Giảm cân' },
  { _id: 'dp_24', name: 'Hoàng Hương Duyên', age: 31, gender: 'Nữ', phone: '0912345693', email: 'hoanghuongduyen24@gmail.com', address: 'Số 80 Đường Hoàng Văn Thụ, Huế', status: 'Hoạt động', role: 'patients', lastVisit: '2025-01-01', diagnosis: 'Rậu', symptoms: ['Chảy máu', 'Sưng'], treatment: 'Chỉnh nha' },
  { _id: 'dp_25', name: 'Vũ Thanh Anh', age: 54, gender: 'Nam', phone: '0912345694', email: 'vuthanhanh25@gmail.com', address: 'Số 47 Phố Kim Mã, Hà Nội', status: 'Hoạt động', role: 'patients', lastVisit: '2024-12-30', diagnosis: 'Huyết áp thấp', symptoms: ['Chóng mặt', 'Yếu'], treatment: 'Uống đủ nước' }
];

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient] = useState(
    FAKE_DOCTOR_PATIENTS.find(p => p._id === id) || null
  );

  if (!patient) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" /> Quay lại
          </button>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-gray-600 text-lg">Không tìm thấy thông tin bệnh nhân.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" /> Quay lại
        </button>

        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">{patient.name}</h1>
            <p className="text-blue-100">ID: {patient._id}</p>
          </div>

          <div className="p-8">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tuổi</p>
                  <p className="text-lg font-semibold text-gray-900">{patient.age} tuổi</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <p className="text-lg font-semibold text-gray-900">{patient.gender}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="text-lg font-semibold text-gray-900">{patient.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{patient.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:col-span-2">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="text-lg font-semibold text-gray-900">{patient.address}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-2">Trạng thái</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  patient.status === 'Hoạt động' ? 'bg-green-500' : 
                  patient.status === 'Đang điều trị' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} />
                <p className="text-lg font-semibold text-gray-900">{patient.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diagnosis */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chẩn đoán</h3>
            <p className="text-lg text-blue-600 font-semibold">{patient.diagnosis}</p>
            <p className="text-sm text-gray-500 mt-2">Lần khám cuối: {patient.lastVisit}</p>
          </div>

          {/* Symptoms */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Triệu chứng</h3>
            <div className="flex flex-wrap gap-2">
              {patient.symptoms.map((symptom, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Treatment */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Phương pháp điều trị</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{patient.treatment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
