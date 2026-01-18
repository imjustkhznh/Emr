import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Edit, Trash2, Users, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/specialties', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await response.json();
      if (data.success) {
        setSpecialties(data.data);
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh sách chuyên khoa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-3 rounded-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản Lý Chuyên Khoa</h1>
            <p className="text-gray-600 mt-1">Quản lý các chuyên khoa khám bệnh</p>
          </div>
        </div>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Thêm Chuyên Khoa
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-8 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-pink-500" />
        </div>
      ) : specialties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty) => {
            const colors = ['red', 'blue', 'green', 'purple', 'pink', 'yellow'];
            const colorIndex = specialties.indexOf(specialty) % colors.length;
            const color = colors[colorIndex];
            
            const colorMap = {
              red: 'from-red-500 to-red-600',
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              purple: 'from-purple-500 to-purple-600',
              pink: 'from-pink-500 to-pink-600',
              yellow: 'from-yellow-500 to-yellow-600',
            };

            return (
              <div key={specialty._id} className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-all`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{specialty.name}</h3>
                    <div className="flex items-center gap-2 opacity-90">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{specialty.doctorCount || 0} bác sĩ</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs opacity-75">{specialty.description || 'Chuyên khoa'}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 bg-white rounded-2xl">
          Không có chuyên khoa nào
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Thêm Chuyên Khoa Mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên Chuyên Khoa</label>
            <input
              type="text"
              placeholder="Nhập tên chuyên khoa..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mã Chuyên Khoa</label>
            <input
              type="text"
              placeholder="VD: CK001"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mô Tả</label>
            <textarea
              placeholder="Mô tả chi tiết về chuyên khoa..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 h-24"
            />
          </div>
          <div className="md:col-span-2">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Tạo Chuyên Khoa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialties;
