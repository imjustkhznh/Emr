import React, { useState } from 'react';
import { Star, Send, Search, User } from 'lucide-react';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, doctorName: 'Dr. Trần Hữu Bình', specialty: 'Tim mạch', rating: 5, date: '2025-01-15', comment: 'Bác sĩ rất tận tâm, giải thích chi tiết, khám kỹ lưỡng' },
    { id: 2, doctorName: 'Dr. Đặng Ngọc Hiểu', specialty: 'Tiêu hóa', rating: 4, date: '2025-01-20', comment: 'Chuyên môn cao, nhưng thời gian chờ hơi lâu' },
    { id: 3, doctorName: 'Dr. Phạm Mạnh Dũng', specialty: 'Ngoại khoa', rating: 5, date: '2024-12-20', comment: 'Xuất sắc, chất lượng phục vụ tốt, tư vấn rõ ràng' }
  ]);
  const [newReview, setNewReview] = useState({ doctor: '', rating: 5, comment: '' });

  const filteredReviews = reviews.filter(r =>
    r.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addReview = () => {
    if (newReview.doctor && newReview.comment) {
      setReviews([...reviews, {
        id: reviews.length + 1,
        doctorName: newReview.doctor,
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment
      }]);
      setNewReview({ doctor: '', rating: 5, comment: '' });
    }
  };

  const getRatingColor = (rating) => {
    if (rating === 5) return 'text-yellow-500';
    if (rating === 4) return 'text-orange-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="mb-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Đánh Giá Bác Sĩ</h1>
        <p className="text-yellow-100">Chia sẻ trải nghiệm khám bệnh của bạn</p>
      </div>

      {/* Add Review Form */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200">
        <h3 className="text-xl font-bold mb-4">Viết Đánh Giá Mới</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <select value={newReview.doctor} onChange={(e) => setNewReview({...newReview, doctor: e.target.value})} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="">Chọn bác sĩ</option>
            <option value="Dr. Trần Hữu Bình">Dr. Trần Hữu Bình</option>
            <option value="Dr. Đặng Ngọc Hiểu">Dr. Đặng Ngọc Hiểu</option>
            <option value="Dr. Phạm Mạnh Dũng">Dr. Phạm Mạnh Dũng</option>
          </select>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Đánh giá:</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setNewReview({...newReview, rating: s})} className="text-3xl hover:scale-110 transition">
                  <Star size={24} className={newReview.rating >= s ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'} />
                </button>
              ))}
            </div>
          </div>
          <textarea value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} placeholder="Viết nhận xét của bạn..." className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24"></textarea>
        </div>
        <button onClick={addReview} className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-2 rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2">
          <Send size={18} /> Gửi Đánh Giá
        </button>
      </div>

      {/* Reviews List */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm bác sĩ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((r) => (
          <div key={r.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-yellow-500">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{r.doctorName}</h3>
                <p className="text-gray-600 text-sm">{r.specialty}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                ))}
                {[...Array(5 - r.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-gray-300" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-3">{r.comment}</p>
            <p className="text-xs text-gray-500">Đánh giá lúc: {new Date(r.date).toLocaleDateString('vi-VN')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
