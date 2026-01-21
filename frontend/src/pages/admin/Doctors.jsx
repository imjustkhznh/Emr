import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search, Phone, Mail, Briefcase, Award } from 'lucide-react';
import { toast } from 'react-toastify';

// Dữ liệu fake 45 bác sĩ
const FAKE_DOCTORS = [
  { _id: '1', name: 'Dr. Trần Hữu Bình', email: 'tranhuubinh@hospital.com', phone: '0901111111', specialty: 'Tim mạch', experience: 15, profile: { status: 'active' } },
  { _id: '2', name: 'Dr. Phạm Mạnh Dũng', email: 'phammainhdung@hospital.com', phone: '0902222222', specialty: 'Nhi khoa', experience: 12, profile: { status: 'active' } },
  { _id: '3', name: 'Dr. Vũ Quốc Thái', email: 'vuquocthai@hospital.com', phone: '0903333333', specialty: 'Ngoại khoa', experience: 18, profile: { status: 'active' } },
  { _id: '4', name: 'Dr. Đặng Ngọc Hiểu', email: 'dangnochieu@hospital.com', phone: '0904444444', specialty: 'Da liễu', experience: 10, profile: { status: 'active' } },
  { _id: '5', name: 'Dr. Bùi Hồng Anh', email: 'buihonganh@hospital.com', phone: '0905555555', specialty: 'Mắt', experience: 14, profile: { status: 'active' } },
  { _id: '6', name: 'Dr. Nguyễn Văn Hùng', email: 'nguyenvanhung@hospital.com', phone: '0906666666', specialty: 'Nha khoa', experience: 11, profile: { status: 'active' } },
  { _id: '7', name: 'Dr. Hoàng Thị Mai', email: 'hoangthimai@hospital.com', phone: '0907777777', specialty: 'Sản phụ khoa', experience: 16, profile: { status: 'active' } },
  { _id: '8', name: 'Dr. Lý Văn Chung', email: 'lyvanching@hospital.com', phone: '0908888888', specialty: 'Hô hấp', experience: 13, profile: { status: 'active' } },
  { _id: '9', name: 'Dr. Cao Thị Liên', email: 'caothilien@hospital.com', phone: '0909999999', specialty: 'Tâm lý', experience: 9, profile: { status: 'active' } },
  { _id: '10', name: 'Dr. Dương Văn Long', email: 'duongvanlong@hospital.com', phone: '0910101010', specialty: 'Tiêu hóa', experience: 17, profile: { status: 'active' } },
  { _id: '11', name: 'Dr. Trần Thị Hương', email: 'tranthihuong@hospital.com', phone: '0911111111', specialty: 'Thần kinh', experience: 14, profile: { status: 'active' } },
  { _id: '12', name: 'Dr. Lê Văn Kiên', email: 'levankien@hospital.com', phone: '0912121212', specialty: 'Bỏng thương tích', experience: 8, profile: { status: 'active' } },
  { _id: '13', name: 'Dr. Phan Minh Tuấn', email: 'phanminhttuan@hospital.com', phone: '0913131313', specialty: 'Xương khớp', experience: 19, profile: { status: 'active' } },
  { _id: '14', name: 'Dr. Võ Thị Hạnh', email: 'vothihanh@hospital.com', phone: '0914141414', specialty: 'Ung bướu', experience: 12, profile: { status: 'active' } },
  { _id: '15', name: 'Dr. Huỳnh Văn Sơn', email: 'huyunhvanson@hospital.com', phone: '0915151515', specialty: 'Tai mũi họng', experience: 11, profile: { status: 'active' } },
  { _id: '16', name: 'Dr. Tô Thị Xuân', email: 'tothixuan@hospital.com', phone: '0916161616', specialty: 'Phòng khám đa khoa', experience: 7, profile: { status: 'active' } },
  { _id: '17', name: 'Dr. Kiều Minh Hạo', email: 'kieuminhhao@hospital.com', phone: '0917171717', specialty: 'Tim mạch', experience: 16, profile: { status: 'active' } },
  { _id: '18', name: 'Dr. Đinh Thị Hồng', email: 'dinhthihong@hospital.com', phone: '0918181818', specialty: 'Nhi khoa', experience: 13, profile: { status: 'active' } },
  { _id: '19', name: 'Dr. Bạch Văn Hải', email: 'bauvamhai@hospital.com', phone: '0919191919', specialty: 'Ngoại khoa', experience: 20, profile: { status: 'active' } },
  { _id: '20', name: 'Dr. Sơn Thị Linh', email: 'sonthilinh@hospital.com', phone: '0920202020', specialty: 'Phụ khoa', experience: 15, profile: { status: 'active' } },
  { _id: '21', name: 'Dr. Vương Văn Tú', email: 'vuongvantu@hospital.com', phone: '0921212121', specialty: 'Chỉnh hình', experience: 10, profile: { status: 'active' } },
  { _id: '22', name: 'Dr. Hồ Thị Thanh', email: 'hothithanh@hospital.com', phone: '0922222222', specialty: 'Hô hấp', experience: 12, profile: { status: 'active' } },
  { _id: '23', name: 'Dr. Tạ Văn Đức', email: 'tavanduc@hospital.com', phone: '0923232323', specialty: 'Tiêu hóa', experience: 14, profile: { status: 'active' } },
  { _id: '24', name: 'Dr. Giang Thị Huỳnh', email: 'giangthihuynh@hospital.com', phone: '0924242424', specialty: 'Thần kinh', experience: 18, profile: { status: 'active' } },
  { _id: '25', name: 'Dr. Trịnh Văn Hùng', email: 'trinvanhung@hospital.com', phone: '0925252525', specialty: 'Nha khoa', experience: 11, profile: { status: 'active' } },
  { _id: '26', name: 'Dr. Lai Thị Ngọc', email: 'laithingoc@hospital.com', phone: '0926262626', specialty: 'Da liễu', experience: 9, profile: { status: 'active' } },
  { _id: '27', name: 'Dr. Bùi Văn Hùng', email: 'buivanhung@hospital.com', phone: '0927272727', specialty: 'Mắt', experience: 17, profile: { status: 'active' } },
  { _id: '28', name: 'Dr. Chế Thị Huyền', email: 'chethihuyyen@hospital.com', phone: '0928282828', specialty: 'Tâm lý', experience: 8, profile: { status: 'active' } },
  { _id: '29', name: 'Dr. Đỗ Văn Tâm', email: 'dovantam@hospital.com', phone: '0929292929', specialty: 'Bỏng thương tích', experience: 13, profile: { status: 'active' } },
  { _id: '30', name: 'Dr. Phạm Thị Yên', email: 'phamthiyen@hospital.com', phone: '0930303030', specialty: 'Sản phụ khoa', experience: 15, profile: { status: 'active' } },
  { _id: '31', name: 'Dr. Trương Văn Tịnh', email: 'truongvantinh@hospital.com', phone: '0931313131', specialty: 'Xương khớp', experience: 12, profile: { status: 'active' } },
  { _id: '32', name: 'Dr. Võ Thị Tuyết', email: 'vothituyet@hospital.com', phone: '0932323232', specialty: 'Ung bướu', experience: 19, profile: { status: 'active' } },
  { _id: '33', name: 'Dr. Lương Văn Sáng', email: 'luongvansang@hospital.com', phone: '0933333333', specialty: 'Tai mũi họng', experience: 10, profile: { status: 'active' } },
  { _id: '34', name: 'Dr. Quách Thị Hương', email: 'quachthihuong@hospital.com', phone: '0934343434', specialty: 'Phòng khám đa khoa', experience: 11, profile: { status: 'active' } },
  { _id: '35', name: 'Dr. Hà Văn Định', email: 'havandinh@hospital.com', phone: '0935353535', specialty: 'Tim mạch', experience: 16, profile: { status: 'active' } },
  { _id: '36', name: 'Dr. Dương Thị Kiều', email: 'duongthikieu@hospital.com', phone: '0936363636', specialty: 'Nhi khoa', experience: 14, profile: { status: 'active' } },
  { _id: '37', name: 'Dr. Trịnh Văn Dũng', email: 'trinvandung@hospital.com', phone: '0937373737', specialty: 'Ngoại khoa', experience: 18, profile: { status: 'active' } },
  { _id: '38', name: 'Dr. Quý Thị Hồng', email: 'quythihong@hospital.com', phone: '0938383838', specialty: 'Da liễu', experience: 13, profile: { status: 'active' } },
  { _id: '39', name: 'Dr. Kiên Văn Minh', email: 'kienvanminh@hospital.com', phone: '0939393939', specialty: 'Mắt', experience: 12, profile: { status: 'active' } },
  { _id: '40', name: 'Dr. Tuyến Thị Hạnh', email: 'tuyenthihanh@hospital.com', phone: '0940404040', specialty: 'Nha khoa', experience: 10, profile: { status: 'active' } },
  { _id: '41', name: 'Dr. Vân Văn Hải', email: 'vanvamhai@hospital.com', phone: '0941414141', specialty: 'Sản phụ khoa', experience: 17, profile: { status: 'active' } },
  { _id: '42', name: 'Dr. Lý Thị Khánh', email: 'lyithikhanh@hospital.com', phone: '0942424242', specialty: 'Hô hấp', experience: 11, profile: { status: 'active' } },
  { _id: '43', name: 'Dr. Hòa Văn Tân', email: 'hoavantan@hospital.com', phone: '0943434343', specialty: 'Tiêu hóa', experience: 15, profile: { status: 'active' } },
  { _id: '44', name: 'Dr. Huệ Thị Sương', email: 'hueithisuong@hospital.com', phone: '0944444444', specialty: 'Thần kinh', experience: 13, profile: { status: 'active' } },
  { _id: '45', name: 'Dr. Năng Văn Thắng', email: 'nangvanthang@hospital.com', phone: '0945454545', specialty: 'Chỉnh hình', experience: 16, profile: { status: 'active' } }
];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      // Lấy tên bác sĩ hiện tại từ localStorage
      const currentUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser')) || {};
      const currentDoctorName = currentUser.name || 'Dr. Trần Hữu Bình';
      
      // Thay thế bác sĩ đầu tiên bằng tên bác sĩ hiện tại
      const doctors = [...FAKE_DOCTORS];
      doctors[0] = {
        ...doctors[0],
        name: currentDoctorName,
        email: (currentUser.email || 'tranhuubinh@hospital.com').toLowerCase()
      };
      
      setDoctors(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Fallback vẫn dùng dữ liệu fake
      setDoctors(FAKE_DOCTORS);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bác sĩ này?')) return;

    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/doctor-list/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete doctor');
      
      setDoctors(doctors.filter(d => d._id !== id));
      toast.success('Xóa bác sĩ thành công');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast.error('Không thể xóa bác sĩ');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Danh Sách Bác Sĩ</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin bác sĩ trong hệ thống</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus size={20} />
          Thêm Bác Sĩ
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc chuyên khoa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredDoctors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tên Bác Sĩ</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Điện Thoại</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Chuyên Khoa</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kinh Nghiệm</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        {doctor.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        {doctor.phone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-400" />
                        {doctor.specialty || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-gray-400" />
                        {doctor.experience ? `${doctor.experience} năm` : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700 p-2 rounded hover:bg-blue-50">
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(doctor._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Không tìm thấy bác sĩ nào</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Tổng Bác Sĩ</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{doctors.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Bác Sĩ Hoạt Động</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {doctors.filter(d => d.profile?.status === 'active').length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Chuyên Khoa</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {new Set(doctors.map(d => d.profile?.specialty)).size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
