import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, Shield, Filter, Loader, X } from 'lucide-react';
import { toast } from 'react-toastify';

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const response = await fetch('http://localhost:5000/api/user', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await response.json();
      if (data.success) {
        setUsersList(data.data);
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh sách người dùng');
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
              {filteredUsers.map((user) => (
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
