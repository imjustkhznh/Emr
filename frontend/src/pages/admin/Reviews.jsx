import React, { useState } from 'react';
import { Star, Search, Filter, MessageCircle, User, Calendar, MapPin } from 'lucide-react';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-3 rounded-lg">
          <Star className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Đánh Giá & Phản Hồi</h1>
          <p className="text-gray-600 mt-1">Xem đánh giá từ bệnh nhân và phản hồi dịch vụ</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng Đánh Giá', value: '256', color: 'blue' },
          { label: 'Trung Bình', value: '4.2', color: 'yellow' },
          { label: '5 Sao', value: '156', color: 'green' },
          { label: 'Cần Trả Lời', value: '12', color: 'red' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border border-${stat.color}-200 rounded-xl p-6`}>
            <p className={`text-sm font-semibold text-${stat.color}-700 mb-2`}>{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-900`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đánh giá..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="outline-none bg-white font-semibold text-gray-700 cursor-pointer"
            >
              <option value="all">Tất Cả Sao</option>
              <option value="5">5 Sao</option>
              <option value="4">4 Sao</option>
              <option value="3">3 Sao</option>
              <option value="1">1-2 Sao</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {String.fromCharCode(64 + item)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-gray-900">Bệnh Nhân {item}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < (5 - item % 3) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Đánh giá cho Bác Sĩ Nguyễn Văn A</p>
                  <p className="text-gray-700 mb-4">
                    Bác sĩ rất tận tình, lắng nghe tôi kỹ càng và giải thích rõ ràng về tình trạng sức khỏe. Dịch vụ tuyệt vời!
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      2024-01-15
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Khám Tim Mạch
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
            {item % 2 === 0 && (
              <div className="ml-16 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-bold text-gray-700 mb-2">💬 Phản Hồi từ Bác Sĩ:</p>
                <p className="text-sm text-gray-700">Cảm ơn bạn đã tin tưởng và chọn dịch vụ của chúng tôi. Hẹn gặp bạn lần sau!</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
