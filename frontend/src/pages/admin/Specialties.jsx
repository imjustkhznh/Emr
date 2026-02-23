import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Edit, Trash2, Users, Loader, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Specialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: ''
  });

  // Fake data
  const fakeSpecialties = [
    {
      _id: 1,
      name: 'Tim Mạch',
      description: 'Chuyên khoa về bệnh tim, mạch máu và huyết áp',
      doctorCount: 5
    },
    {
      _id: 2,
      name: 'Hô Hấp',
      description: 'Chuyên khoa về bệnh đường hô hấp, phổi',
      doctorCount: 4
    },
    {
      _id: 3,
      name: 'Tiêu Hóa',
      description: 'Chuyên khoa về bệnh dạ dày, ruột, gan, tụy',
      doctorCount: 3
    },
    {
      _id: 4,
      name: 'Thần Kinh',
      description: 'Chuyên khoa về bệnh thần kinh, não',
      doctorCount: 4
    },
    {
      _id: 5,
      name: 'Ngoài Da',
      description: 'Chuyên khoa về bệnh da liễu, mụn',
      doctorCount: 3
    },
    {
      _id: 6,
      name: 'Nhi Khoa',
      description: 'Chuyên khoa khám chữa bệnh cho trẻ em',
      doctorCount: 5
    },
    {
      _id: 7,
      name: 'Phụ Sản',
      description: 'Chuyên khoa về phụ nữ và sinh đẻ',
      doctorCount: 6
    },
    {
      _id: 8,
      name: 'Chỉnh Hình',
      description: 'Chuyên khoa về xương, khớp, cơ',
      doctorCount: 4
    },
    {
      _id: 9,
      name: 'Mắt',
      description: 'Chuyên khoa về bệnh mắt, thị lực',
      doctorCount: 3
    },
    {
      _id: 10,
      name: 'Tai Mũi Họng',
      description: 'Chuyên khoa về bệnh tai, mũi, họng',
      doctorCount: 2
    },
    {
      _id: 11,
      name: 'Tâm Thần',
      description: 'Chuyên khoa về bệnh tâm thần, lo âu',
      doctorCount: 3
    },
    {
      _id: 12,
      name: 'Ung Thư',
      description: 'Chuyên khoa về bệnh ung thư',
      doctorCount: 5
    }
  ];

  useEffect(() => {
    // Load fake data immediately
    setSpecialties(fakeSpecialties);
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

  // Handle Add New
  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({ name: '', description: '', code: '' });
    setShowModal(true);
  };

  // Handle Edit
  const handleEditClick = (specialty) => {
    setIsEditing(true);
    setFormData({
      _id: specialty._id,
      name: specialty.name,
      description: specialty.description,
      code: specialty.code || ''
    });
    setShowModal(true);
  };

  // Handle Delete
  const handleDeleteClick = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa chuyên khoa này?')) {
      setSpecialties(specialties.filter(s => s._id !== id));
      toast.success('Xóa chuyên khoa thành công');
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (isEditing) {
      // Edit existing
      setSpecialties(specialties.map(s =>
        s._id === formData._id ? { ...s, ...formData } : s
      ));
      toast.success('Cập nhật chuyên khoa thành công');
    } else {
      // Add new
      const newSpecialty = {
        _id: specialties.length + 1,
        ...formData,
        doctorCount: 0
      };
      setSpecialties([...specialties, newSpecialty]);
      toast.success('Thêm chuyên khoa thành công');
    }

    setShowModal(false);
    setFormData({ name: '', description: '', code: '' });
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', description: '', code: '' });
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
        <button 
          onClick={handleAddClick}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
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
                    <button 
                      onClick={() => handleEditClick(specialty)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(specialty._id)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="Xóa"
                    >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Chỉnh Sửa Chuyên Khoa' : 'Thêm Chuyên Khoa Mới'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Chuyên Khoa *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên chuyên khoa..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã Chuyên Khoa
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="VD: CK001"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô Tả *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết về chuyên khoa..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 h-24 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {isEditing ? 'Cập Nhật' : 'Tạo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Specialties;
