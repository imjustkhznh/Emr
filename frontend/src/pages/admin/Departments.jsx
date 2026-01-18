import React, { useState, useEffect } from 'react';
import { Building2, Plus, Edit, Trash2, Users, MapPin, Phone, Mail, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '', phone: '', email: '', location: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/departments');
      const data = await response.json();
      if (data.success) {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Lỗi khi tải danh sách khoa phòng');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Tạo khoa phòng thành công');
        setFormData({ name: '', code: '', phone: '', email: '', location: '' });
        setShowForm(false);
        fetchDepartments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Lỗi khi tạo khoa phòng');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-3 rounded-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản Lý Khoa Phòng</h1>
            <p className="text-gray-600 mt-1">Quản lý các khoa phòng của bệnh viện ({departments.length})</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Thêm Khoa Mới
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleCreateDepartment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tên khoa"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Mã khoa (VD: KTM001)"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                required
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Vị trí (VD: Tầng 2)"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Tạo Khoa
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Mã: <span className="font-semibold">{dept.code}</span></p>
            <div className="space-y-2">
              {dept.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {dept.phone}
                </div>
              )}
              {dept.location && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {dept.location}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-700 pt-2">
                <Users className="h-4 w-4 text-indigo-600" />
                <span className="font-semibold">{dept.doctors?.length || 0} bác sĩ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
