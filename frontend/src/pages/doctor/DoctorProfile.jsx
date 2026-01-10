import React from 'react';
import { Edit2 } from 'lucide-react';
import Header from '../../components/Doctor/Header';

const DoctorProfile = () => {
  const handleEdit = () => {
    // Logic chỉnh sửa nội dung
    alert('Chức năng chỉnh sửa chưa được triển khai!');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="mt-16 p-6 bg-gray-100 flex flex-col gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center rounded-lg text-3xl font-bold">
              BN
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">BS. BS. Nguyễn Thị Lan</h2>
              <p className="text-lg text-gray-600">Bác sĩ chuyên khoa Nội tim mạch</p>
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Edit2 className="h-5 w-5" />
              Chỉnh sửa
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold">Thông tin cá nhân</h3>
              <ul className="text-lg text-gray-600">
                <li>Họ và tên: Nguyễn Thị Lan</li>
                <li>Ngày sinh: 15/03/1989</li>
                <li>Giới tính: Nữ</li>
                <li>Số điện thoại: 0912 345 678</li>
                <li>Email: nguyenthilan@hospital.vn</li>
                <li>Địa chỉ: 123 Nguyễn Văn Linh, Q.7</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Thông tin chuyên môn</h3>
              <ul className="text-lg text-gray-600">
                <li>Chuyên khoa: Nội tim mạch</li>
                <li>Chức danh: Bác sĩ chuyên khoa II</li>
                <li>Số chứng chỉ: BS-123456789</li>
                <li>Nơi đào tạo: Đại học Y Dược TP.HCM</li>
                <li>Năm tốt nghiệp: 2014</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;