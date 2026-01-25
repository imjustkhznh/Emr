import React, { useState } from 'react';
import { Star, Send, Search, User, MessageSquare } from 'lucide-react';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', rating: 5, date: '2025-01-15', comment: 'Bác sĩ rất tận tâm, giải thích chi tiết, khám kỹ lưỡng' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', rating: 4, date: '2025-01-20', comment: 'Chuyên môn cao, nhưng thời gian chờ hơi lâu' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', rating: 5, date: '2024-12-20', comment: 'Xuất sắc, chất lượng phục vụ tốt, tư vấn rõ ràng' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ doctor: '', specialty: '', rating: 5, comment: '' });

  const doctors = [
    // Tim mạch (6)
    { name: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch' },
    { name: 'Dr. Nguyễn Minh Tuấn', specialty: 'Tim mạch' },
    { name: 'Dr. Hoàng Văn Nam', specialty: 'Tim mạch' },
    { name: 'Dr. Võ Thị Hương', specialty: 'Tim mạch' },
    { name: 'Dr. Phan Đức Thông', specialty: 'Tim mạch' },
    { name: 'Dr. Lương Quốc Anh', specialty: 'Tim mạch' },
    
    // Tiêu hóa (6)
    { name: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa' },
    { name: 'Dr. Bùi Văn Long', specialty: 'Tiêu hóa' },
    { name: 'Dr. Trần Thị Mai', specialty: 'Tiêu hóa' },
    { name: 'Dr. Hồ Minh Khoa', specialty: 'Tiêu hóa' },
    { name: 'Dr. Ngô Xuân Huy', specialty: 'Tiêu hóa' },
    { name: 'Dr. Lê Thị Phương', specialty: 'Tiêu hóa' },
    
    // Ngoại khoa (6)
    { name: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa' },
    { name: 'Dr. Vũ Minh Tuấn', specialty: 'Ngoại khoa' },
    { name: 'Dr. Trần Sơn Hà', specialty: 'Ngoại khoa' },
    { name: 'Dr. Dương Quang Hải', specialty: 'Ngoại khoa' },
    { name: 'Dr. Nguyễn Thanh Sơn', specialty: 'Ngoại khoa' },
    { name: 'Dr. Tạ Quốc Khánh', specialty: 'Ngoại khoa' },
    
    // Hô hấp (5)
    { name: 'Dr. Lê Thanh Tùng', specialty: 'Hô hấp' },
    { name: 'Dr. Phạm Thị Hòa', specialty: 'Hô hấp' },
    { name: 'Dr. Chu Văn Minh', specialty: 'Hô hấp' },
    { name: 'Dr. Nguyễn Thị Tâm', specialty: 'Hô hấp' },
    { name: 'Dr. Đỗ Hữu Thọ', specialty: 'Hô hấp' },
    
    // Da liễu (5)
    { name: 'Dr. Nguyễn Văn An', specialty: 'Da liễu' },
    { name: 'Dr. Hoàng Linh Chi', specialty: 'Da liễu' },
    { name: 'Dr. Bùi Thanh Sỹ', specialty: 'Da liễu' },
    { name: 'Dr. Phan Văn Đức', specialty: 'Da liễu' },
    { name: 'Dr. Trương Thị Oanh', specialty: 'Da liễu' },
    
    // Nhi khoa (5)
    { name: 'Dr. Hoàng Thị Hương', specialty: 'Nhi khoa' },
    { name: 'Dr. Nguyễn Văn Hùng', specialty: 'Nhi khoa' },
    { name: 'Dr. Lý Thị Hân', specialty: 'Nhi khoa' },
    { name: 'Dr. Tống Quốc Việt', specialty: 'Nhi khoa' },
    { name: 'Dr. Vũ Thị Liên', specialty: 'Nhi khoa' },
    
    // Tâm thần (2)
    { name: 'Dr. Phan Linh Chi', specialty: 'Tâm thần' },
    { name: 'Dr. Phạm Duy Tân', specialty: 'Tâm thần' },
    
    // Mắt (2)
    { name: 'Dr. Bùi Quốc Hùng', specialty: 'Mắt' },
    { name: 'Dr. Lê Nhật Quang', specialty: 'Mắt' },
    
    // Tai Mũi Họng (2)
    { name: 'Dr. Nguyễn Công Hạnh', specialty: 'Tai Mũi Họng' },
    { name: 'Dr. Đường Văn Tuấn', specialty: 'Tai Mũi Họng' },
    
    // Chỉnh hình (1)
    { name: 'Dr. Đinh Quốc Hùng', specialty: 'Chỉnh hình' },
    
    // Nội tổng quát (2)
    { name: 'Dr. Trần Văn Tường', specialty: 'Nội tổng quát' },
    { name: 'Dr. Nông Đức Hải', specialty: 'Nội tổng quát' },
  ];

  const filteredReviews = reviews.filter(r =>
    r.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addReview = () => {
    if (newReview.doctor && newReview.comment) {
      setReviews([...reviews, {
        id: reviews.length + 1,
        doctorName: newReview.doctor,
        specialty: newReview.specialty,
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment
      }]);
      setNewReview({ doctor: '', specialty: '', rating: 5, comment: '' });
      setShowForm(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const getRatingColor = (rating) => {
    if (rating === 5) return 'text-yellow-500';
    if (rating === 4) return 'text-yellow-400';
    if (rating === 3) return 'text-yellow-300';
    return 'text-gray-400';
  };

  const RatingStars = ({ rating, size = 16 }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Đánh Giá Bác Sĩ</h1>
          <p className="text-base text-gray-600">Chia sẻ trải nghiệm khám bệnh của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-200 rounded-lg p-3">
                <Star className="w-5 h-5 text-yellow-700 fill-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-yellow-700">Đánh Giá Trung Bình</p>
                <p className="text-2xl font-bold text-yellow-900 flex items-center gap-2">
                  {averageRating}
                  <span className="text-lg">/ 5.0</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 rounded-lg p-3">
                <MessageSquare className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Tổng Đánh Giá</p>
                <p className="text-2xl font-bold text-blue-900">{reviews.length}</p>
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
              placeholder="Tìm kiếm bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Add Review Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md"
          >
            <Send size={20} />
            Viết Đánh Giá Mới
          </button>
        </div>

        {/* Add Review Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg border border-purple-200 p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Viết Đánh Giá Mới</h3>
            
            <div className="space-y-5">
              {/* Doctor Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Chọn Bác Sĩ</label>
                <select
                  value={newReview.doctor}
                  onChange={(e) => {
                    const selectedDoctor = doctors.find(d => d.name === e.target.value);
                    setNewReview({
                      ...newReview,
                      doctor: e.target.value,
                      specialty: selectedDoctor ? selectedDoctor.specialty : ''
                    });
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-white text-gray-900 font-medium"
                >
                  <option value="">-- Chọn bác sĩ --</option>
                  {doctors.map(doc => (
                    <option key={doc.name} value={doc.name}>
                      {doc.name} - {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Đánh Giá Sao</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        size={32}
                        className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {newReview.rating === 1 && '😞 Không hài lòng'}
                  {newReview.rating === 2 && '😐 Bình thường'}
                  {newReview.rating === 3 && '🙂 Tốt'}
                  {newReview.rating === 4 && '😊 Rất tốt'}
                  {newReview.rating === 5 && '😍 Xuất sắc'}
                </p>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Bình Luận</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Chia sẻ trải nghiệm khám bệnh của bạn..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 placeholder-gray-500 h-24 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg transition"
                >
                  Hủy
                </button>
                <button
                  onClick={addReview}
                  disabled={!newReview.doctor || !newReview.comment}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Gửi Đánh Giá
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="grid gap-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-lg border border-purple-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {r.doctorName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{r.doctorName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{r.specialty}</p>
                      <RatingStars rating={r.rating} size={18} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(r.date).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                {/* Comment */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{r.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-purple-100">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Không tìm thấy đánh giá nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
