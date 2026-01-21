import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, Shield, Filter, Loader, X } from 'lucide-react';
import { toast } from 'react-toastify';

// Dữ liệu fake 45 bác sĩ (giống Doctors.jsx)
const FAKE_DOCTORS_45 = [
  { _id: '1', name: 'Dr. Trần Hữu Bình', email: 'tranhuubinh@hospital.com', phone: '0901111111', specialty: 'Tim mạch', experience: 15, profile: { status: 'active' }, role: 'doctor' },
  { _id: '2', name: 'Dr. Phạm Mạnh Dũng', email: 'phammainhdung@hospital.com', phone: '0902222222', specialty: 'Nhi khoa', experience: 12, profile: { status: 'active' }, role: 'doctor' },
  { _id: '3', name: 'Dr. Vũ Quốc Thái', email: 'vuquocthai@hospital.com', phone: '0903333333', specialty: 'Ngoại khoa', experience: 18, profile: { status: 'active' }, role: 'doctor' },
  { _id: '4', name: 'Dr. Đặng Ngọc Hiểu', email: 'dangnochieu@hospital.com', phone: '0904444444', specialty: 'Da liễu', experience: 10, profile: { status: 'active' }, role: 'doctor' },
  { _id: '5', name: 'Dr. Bùi Hồng Anh', email: 'buihonganh@hospital.com', phone: '0905555555', specialty: 'Mắt', experience: 14, profile: { status: 'active' }, role: 'doctor' },
  { _id: '6', name: 'Dr. Nguyễn Văn Hùng', email: 'nguyenvanhung@hospital.com', phone: '0906666666', specialty: 'Nha khoa', experience: 11, profile: { status: 'active' }, role: 'doctor' },
  { _id: '7', name: 'Dr. Hoàng Thị Mai', email: 'hoangthimai@hospital.com', phone: '0907777777', specialty: 'Sản phụ khoa', experience: 16, profile: { status: 'active' }, role: 'doctor' },
  { _id: '8', name: 'Dr. Lý Văn Chung', email: 'lyvanching@hospital.com', phone: '0908888888', specialty: 'Hô hấp', experience: 13, profile: { status: 'active' }, role: 'doctor' },
  { _id: '9', name: 'Dr. Cao Thị Liên', email: 'caothilien@hospital.com', phone: '0909999999', specialty: 'Tâm lý', experience: 9, profile: { status: 'active' }, role: 'doctor' },
  { _id: '10', name: 'Dr. Dương Văn Long', email: 'duongvanlong@hospital.com', phone: '0910101010', specialty: 'Tiêu hóa', experience: 17, profile: { status: 'active' }, role: 'doctor' },
  { _id: '11', name: 'Dr. Trần Thị Hương', email: 'tranthihuong@hospital.com', phone: '0911111111', specialty: 'Thần kinh', experience: 14, profile: { status: 'active' }, role: 'doctor' },
  { _id: '12', name: 'Dr. Lê Văn Kiên', email: 'levankien@hospital.com', phone: '0912121212', specialty: 'Bỏng thương tích', experience: 8, profile: { status: 'active' }, role: 'doctor' },
  { _id: '13', name: 'Dr. Phan Minh Tuấn', email: 'phanminhttuan@hospital.com', phone: '0913131313', specialty: 'Xương khớp', experience: 19, profile: { status: 'active' }, role: 'doctor' },
  { _id: '14', name: 'Dr. Võ Thị Hạnh', email: 'vothihanh@hospital.com', phone: '0914141414', specialty: 'Ung bướu', experience: 12, profile: { status: 'active' }, role: 'doctor' },
  { _id: '15', name: 'Dr. Huỳnh Văn Sơn', email: 'huyunhvanson@hospital.com', phone: '0915151515', specialty: 'Tai mũi họng', experience: 11, profile: { status: 'active' }, role: 'doctor' },
  { _id: '16', name: 'Dr. Tô Thị Xuân', email: 'tothixuan@hospital.com', phone: '0916161616', specialty: 'Phòng khám đa khoa', experience: 7, profile: { status: 'active' }, role: 'doctor' },
  { _id: '17', name: 'Dr. Kiều Minh Hạo', email: 'kieuminhhao@hospital.com', phone: '0917171717', specialty: 'Tim mạch', experience: 16, profile: { status: 'active' }, role: 'doctor' },
  { _id: '18', name: 'Dr. Đinh Thị Hồng', email: 'dinhthihong@hospital.com', phone: '0918181818', specialty: 'Nhi khoa', experience: 13, profile: { status: 'active' }, role: 'doctor' },
  { _id: '19', name: 'Dr. Bạch Văn Hải', email: 'bauvamhai@hospital.com', phone: '0919191919', specialty: 'Ngoại khoa', experience: 20, profile: { status: 'active' }, role: 'doctor' },
  { _id: '20', name: 'Dr. Sơn Thị Linh', email: 'sonthilinh@hospital.com', phone: '0920202020', specialty: 'Phụ khoa', experience: 15, profile: { status: 'active' }, role: 'doctor' },
  { _id: '21', name: 'Dr. Vương Văn Tú', email: 'vuongvantu@hospital.com', phone: '0921212121', specialty: 'Chỉnh hình', experience: 10, profile: { status: 'active' }, role: 'doctor' },
  { _id: '22', name: 'Dr. Hồ Thị Thanh', email: 'hothithanh@hospital.com', phone: '0922222222', specialty: 'Hô hấp', experience: 12, profile: { status: 'active' }, role: 'doctor' },
  { _id: '23', name: 'Dr. Tạ Văn Đức', email: 'tavanduc@hospital.com', phone: '0923232323', specialty: 'Tiêu hóa', experience: 14, profile: { status: 'active' }, role: 'doctor' },
  { _id: '24', name: 'Dr. Giang Thị Huỳnh', email: 'giangthihuynh@hospital.com', phone: '0924242424', specialty: 'Thần kinh', experience: 18, profile: { status: 'active' }, role: 'doctor' },
  { _id: '25', name: 'Dr. Trịnh Văn Hùng', email: 'trinvanhung@hospital.com', phone: '0925252525', specialty: 'Nha khoa', experience: 11, profile: { status: 'active' }, role: 'doctor' },
  { _id: '26', name: 'Dr. Lai Thị Ngọc', email: 'laithingoc@hospital.com', phone: '0926262626', specialty: 'Da liễu', experience: 9, profile: { status: 'active' }, role: 'doctor' },
  { _id: '27', name: 'Dr. Bùi Văn Hùng', email: 'buivanhung@hospital.com', phone: '0927272727', specialty: 'Mắt', experience: 17, profile: { status: 'active' }, role: 'doctor' },
  { _id: '28', name: 'Dr. Chế Thị Huyền', email: 'chethihuyyen@hospital.com', phone: '0928282828', specialty: 'Tâm lý', experience: 8, profile: { status: 'active' }, role: 'doctor' },
  { _id: '29', name: 'Dr. Đỗ Văn Tâm', email: 'dovantam@hospital.com', phone: '0929292929', specialty: 'Bỏng thương tích', experience: 13, profile: { status: 'active' }, role: 'doctor' },
  { _id: '30', name: 'Dr. Phạm Thị Yên', email: 'phamthiyen@hospital.com', phone: '0930303030', specialty: 'Sản phụ khoa', experience: 15, profile: { status: 'active' }, role: 'doctor' },
  { _id: '31', name: 'Dr. Trương Văn Tịnh', email: 'truongvantinh@hospital.com', phone: '0931313131', specialty: 'Xương khớp', experience: 12, profile: { status: 'active' }, role: 'doctor' },
  { _id: '32', name: 'Dr. Võ Thị Tuyết', email: 'vothituyet@hospital.com', phone: '0932323232', specialty: 'Ung bướu', experience: 19, profile: { status: 'active' }, role: 'doctor' },
  { _id: '33', name: 'Dr. Lương Văn Sáng', email: 'luongvansang@hospital.com', phone: '0933333333', specialty: 'Tai mũi họng', experience: 10, profile: { status: 'active' }, role: 'doctor' },
  { _id: '34', name: 'Dr. Quách Thị Hương', email: 'quachthihuong@hospital.com', phone: '0934343434', specialty: 'Phòng khám đa khoa', experience: 11, profile: { status: 'active' }, role: 'doctor' },
  { _id: '35', name: 'Dr. Hà Văn Định', email: 'havandinh@hospital.com', phone: '0935353535', specialty: 'Tim mạch', experience: 16, profile: { status: 'active' }, role: 'doctor' },
  { _id: '36', name: 'Dr. Dương Thị Kiều', email: 'duongthikieu@hospital.com', phone: '0936363636', specialty: 'Nhi khoa', experience: 14, profile: { status: 'active' }, role: 'doctor' },
  { _id: '37', name: 'Dr. Trịnh Văn Dũng', email: 'trinvandung@hospital.com', phone: '0937373737', specialty: 'Ngoại khoa', experience: 18, profile: { status: 'active' }, role: 'doctor' },
  { _id: '38', name: 'Dr. Quý Thị Hồng', email: 'quythihong@hospital.com', phone: '0938383838', specialty: 'Da liễu', experience: 13, profile: { status: 'active' }, role: 'doctor' },
  { _id: '39', name: 'Dr. Kiên Văn Minh', email: 'kienvanminh@hospital.com', phone: '0939393939', specialty: 'Mắt', experience: 12, profile: { status: 'active' }, role: 'doctor' },
  { _id: '40', name: 'Dr. Tuyến Thị Hạnh', email: 'tuyenthihanh@hospital.com', phone: '0940404040', specialty: 'Nha khoa', experience: 10, profile: { status: 'active' }, role: 'doctor' },
  { _id: '41', name: 'Dr. Vân Văn Hải', email: 'vanvamhai@hospital.com', phone: '0941414141', specialty: 'Sản phụ khoa', experience: 17, profile: { status: 'active' }, role: 'doctor' },
  { _id: '42', name: 'Dr. Lý Thị Khánh', email: 'lyithikhanh@hospital.com', phone: '0942424242', specialty: 'Hô hấp', experience: 11, profile: { status: 'active' }, role: 'doctor' },
  { _id: '43', name: 'Dr. Hòa Văn Tân', email: 'hoavantan@hospital.com', phone: '0943434343', specialty: 'Tiêu hóa', experience: 15, profile: { status: 'active' }, role: 'doctor' },
  { _id: '44', name: 'Dr. Huệ Thị Sương', email: 'hueithisuong@hospital.com', phone: '0944444444', specialty: 'Thần kinh', experience: 13, profile: { status: 'active' }, role: 'doctor' },
  { _id: '45', name: 'Dr. Năng Văn Thắng', email: 'nangvanthang@hospital.com', phone: '0945454545', specialty: 'Chỉnh hình', experience: 16, profile: { status: 'active' }, role: 'doctor' }
];

// Tạo dữ liệu fake 1250 bệnh nhân (giống Patients.jsx)
const generateFakePatients = () => {
  const firstNames = ['Nguyễn', 'Trần', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Dương', 'Cao', 'Lê', 'Võ', 'Phan', 'Lý', 'Huỳnh', 'Kiều', 'Hà', 'Trương', 'Quách', 'Đỗ', 'Tô'];
  const lastNames = ['Văn', 'Thị', 'Minh', 'Hữu', 'Mạnh', 'Quốc', 'Ngọc', 'Hồng', 'Kiên', 'Long', 'Hương', 'Linh', 'Mai', 'Hạnh', 'Khánh', 'Sơn', 'Tuấn', 'Dũng', 'Ân', 'Bảo'];
  const cities = ['Hà Nội', 'TP. HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Biên Hòa', 'Nha Trang', 'Huế', 'Hải Dương', 'Thái Nguyên'];
  const genders = ['Nam', 'Nữ'];
  const statuses = ['Hoạt động', 'Tạm dừng', 'Đang điều trị'];

  const patients = [];
  for (let i = 1; i <= 1250; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const middleName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    patients.push({
      _id: `patient_${i}`,
      name: `${firstName} ${middleName} ${lastName}`,
      email: `patient${i}@email.com`,
      phone: `09${Math.floor(Math.random() * 900000000).toString().padStart(8, '0')}`,
      age: Math.floor(Math.random() * (80 - 18 + 1)) + 18,
      gender: genders[Math.floor(Math.random() * genders.length)],
      address: `${Math.floor(Math.random() * 999) + 1} ${cities[Math.floor(Math.random() * cities.length)]}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: 'patients',
      isActive: Math.random() > 0.05
    });
  }
  return patients;
};

// Tạo dữ liệu fake 50 nhân viên
const generateFakeNurses = () => {
  const firstNames = ['Nguyễn', 'Trần', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Dương', 'Cao', 'Lê'];
  const lastNames = ['Văn', 'Thị', 'Minh', 'Hữu', 'Mạnh', 'Quốc', 'Ngọc', 'Hồng', 'Kiên', 'Long'];
  
  const nurses = [];
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    nurses.push({
      _id: `nurse_${i}`,
      name: `${firstName} ${lastName}`,
      email: `nurse${i}@hospital.com`,
      phone: `09${Math.floor(Math.random() * 900000000).toString().padStart(8, '0')}`,
      role: 'Nurse',
      isActive: Math.random() > 0.08,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    });
  }
  return nurses;
};

// Tạo dữ liệu fake người dùng
const generateFakeUsers = () => {
  const allUsers = [];
  
  // 1 Admin
  allUsers.push({
    _id: 'USER_0001',
    name: 'Admin System',
    email: 'admin@hospital.com',
    phone: '0912345678',
    role: 'Admin',
    isActive: true,
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  });

  // 45 bác sĩ
  FAKE_DOCTORS_45.forEach((doctor, index) => {
    allUsers.push({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      role: 'doctor',
      isActive: doctor.profile?.status === 'active',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    });
  });

  // 1250 bệnh nhân
  const patients = generateFakePatients();
  patients.forEach(patient => {
    allUsers.push({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      role: 'patients',
      isActive: patient.isActive,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    });
  });

  // 50 nhân viên
  const nurses = generateFakeNurses();
  nurses.forEach(nurse => {
    allUsers.push({
      _id: nurse._id,
      name: nurse.name,
      email: nurse.email,
      phone: nurse.phone,
      role: 'Nurse',
      isActive: nurse.isActive,
      createdAt: nurse.createdAt
    });
  });

  return allUsers;
};

const FAKE_USERS = generateFakeUsers();

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'patients',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Sử dụng dữ liệu fake
      setUsersList(FAKE_USERS);
      setCurrentPage(1);
    } catch (error) {
      console.error('Lỗi:', error);
      // Fallback vẫn dùng dữ liệu fake
      setUsersList(FAKE_USERS);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = usersList.filter(user => {
    const matchSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    return matchSearch && matchRole;
  });

  // Reset page khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole]);

  // Tính toán pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleCreateUser = async () => {
    try {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Mật khẩu không trùng khớp');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        })
      });

      const data = await response.json();
      if (data.success || response.ok) {
        setUsersList([...usersList, data.data || { name: formData.name, email: formData.email, role: formData.role }]);
        setShowCreateModal(false);
        setFormData({ name: '', email: '', phone: '', role: 'patients', password: '', confirmPassword: '' });
        toast.success('Tạo người dùng thành công!');
        fetchUsers();
      } else {
        toast.error(data.message || 'Lỗi khi tạo người dùng');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Lỗi khi tạo người dùng');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      password: '',
      confirmPassword: ''
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      if (!formData.name || !formData.email) {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return;
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role
      };

      if (formData.password) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Mật khẩu không trùng khớp');
          return;
        }
        updateData.password = formData.password;
      }

      const response = await fetch(`http://localhost:5000/api/user/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      if (data.success) {
        setUsersList(usersList.map(u => u._id === selectedUser._id ? data.data : u));
        setShowEditModal(false);
        toast.success('Cập nhật người dùng thành công!');
        fetchUsers();
      } else {
        toast.error(data.message || 'Lỗi khi cập nhật người dùng');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Lỗi khi cập nhật người dùng');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });

        if (response.ok) {
          setUsersList(usersList.filter(u => u._id !== userId));
          toast.success('Xóa người dùng thành công!');
        } else {
          toast.error('Lỗi khi xóa người dùng');
        }
      } catch (error) {
        console.error('Lỗi:', error);
        toast.error('Lỗi khi xóa người dùng');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-lg">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản Lý Người Dùng</h1>
            <p className="text-gray-600 mt-1">Quản lý tài khoản và phân quyền</p>
          </div>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Thêm Người Dùng
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="outline-none bg-white font-semibold text-gray-700 cursor-pointer"
            >
              <option value="all">Tất Cả Vai Trò</option>
              <option value="Admin">Admin</option>
              <option value="doctor">Bác Sĩ</option>
              <option value="patients">Bệnh Nhân</option>
              <option value="Nurse">Nhân Viên</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto text-purple-500" />
          </div>
        ) : filteredUsers.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Người Dùng</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Vai Trò</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Trạng Thái</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {(user.name?.[0] || 'U').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user._id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'doctor' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'patients' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {user.role === 'Admin' ? 'Admin' : 
                       user.role === 'doctor' ? 'Bác Sĩ' : 
                       user.role === 'patients' ? 'Bệnh Nhân' : 'Nhân Viên'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${user.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-semibold text-gray-700">
                        {user.isActive !== false ? 'Hoạt Động' : 'Tạm Khóa'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
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
            Không có người dùng nào
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                  {page}
                </button>
              );
            } else if (
              (page === 2 && currentPage > 3) ||
              (page === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              return (
                <span key={page} className="px-2 py-2 text-gray-500">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
            Tiếp
          </button>

          <div className="ml-4 text-sm text-gray-600">
            Trang {currentPage} / {totalPages} | Tổng: {filteredUsers.length} người dùng
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Thêm Người Dùng Mới</h2>
              <button onClick={() => setShowCreateModal(false)} className="hover:bg-purple-800 p-2 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Họ Tên *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="Nhập họ tên"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Điện Thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Vai Trò *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  <option value="patients">Bệnh Nhân</option>
                  <option value="doctor">Bác Sĩ</option>
                  <option value="Admin">Admin</option>
                  <option value="Nurse">Nhân Viên</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mật Khẩu *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Xác Nhận Mật Khẩu *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="Xác nhận mật khẩu"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <button
                  onClick={handleCreateUser}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Tạo Người Dùng
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Chỉnh Sửa Người Dùng</h2>
              <button onClick={() => setShowEditModal(false)} className="hover:bg-blue-800 p-2 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Họ Tên *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Nhập họ tên"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Điện Thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Vai Trò *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="patients">Bệnh Nhân</option>
                  <option value="doctor">Bác Sĩ</option>
                  <option value="Admin">Admin</option>
                  <option value="Nurse">Nhân Viên</option>
                </select>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm font-semibold text-gray-600 mb-3">Để trống nếu không muốn đổi mật khẩu</p>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mật Khẩu Mới</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Xác Nhận Mật Khẩu</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t">
                <button
                  onClick={handleUpdateUser}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Lưu Thay Đổi
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
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

export default UsersManagement;
