import React, { useState } from 'react';
import { BookOpen, Search, Eye, Bookmark, Calendar, Clock, X } from 'lucide-react';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  
  const [articles] = useState([
    { id: 1, title: '10 Cách Giữ Tim Khỏe Mạnh', category: 'Tim mạch', date: '2025-01-20', readTime: '5 phút', content: 'Tim là một trong những cơ quan quan trọng nhất trong cơ thể chúng ta. Để giữ tim khỏe mạnh, bạn cần:\n\n1. Tập thể dục đều đặn: Nên tập ít nhất 150 phút mỗi tuần.\n2. Ăn lành mạnh: Tránh thực phẩm nhiều dầu mỡ.\n3. Kiểm soát căng thẳng: Tập thiền hoặc yoga.\n4. Ngủ đủ: Nên ngủ 7-9 tiếng mỗi đêm.\n5. Kiểm soát cân nặng: Duy trì chỉ số BMI lành mạnh.' },
    { id: 2, title: 'Chế Độ Ăn Lành Mạnh Cho Bệnh Tiêu Hóa', category: 'Tiêu hóa', date: '2025-01-18', readTime: '7 phút', content: 'Những người bị bệnh tiêu hóa cần chú ý đặc biệt đến chế độ ăn uống của mình. Dưới đây là những gợi ý:\n\n1. Ăn từng bữa nhỏ: Chia thành 5-6 bữa mỗi ngày.\n2. Tránh những thực phẩm cay nóng.\n3. Uống nhiều nước: Ít nhất 2 lít mỗi ngày.\n4. Ăn chậm và nhai kỹ.\n5. Tránh cà phê và rượu.' },
    { id: 3, title: 'Bài Tập Nhẹ Sau Phẫu Thuật', category: 'Ngoại khoa', date: '2025-01-15', readTime: '6 phút', content: 'Sau phẫu thuật, bạn cần tập luyện nhẹ nhàng để phục hồi:\n\n1. Bắt đầu từ ngày thứ 2-3 sau phẫu thuật.\n2. Đi bộ là bài tập tốt nhất.\n3. Tăng cường độ từ từ.\n4. Tuân theo hướng dẫn của bác sĩ.\n5. Dừng ngay nếu cảm thấy đau đớn.' },
    { id: 4, title: 'Quản Lý Huyết Áp Cao Tự Nhiên', category: 'Tim mạch', date: '2025-01-10', readTime: '8 phút', content: 'Huyết áp cao là một vấn đề sức khỏe phổ biến. Đây là những cách tự nhiên để quản lý:\n\n1. Giảm muối trong chế độ ăn.\n2. Tập thể dục thường xuyên.\n3. Giảm cân nếu cần thiết.\n4. Uống rượu vừa phải.\n5. Kiểm tra huyết áp thường xuyên.' },
    { id: 5, title: 'Lợi Ích Của Yoga Cho Sức Khỏe', category: 'Tổng quát', date: '2025-01-05', readTime: '5 phút', content: 'Yoga không chỉ là một bài tập thể chất mà còn là một phương pháp chăm sóc sức khỏe toàn diện:\n\n1. Cải thiện sức mạnh cơ bắp.\n2. Tăng tính linh hoạt.\n3. Giảm căng thẳng và lo âu.\n4. Cải thiện giấc ngủ.\n5. Tăng cường hệ thống miễn dịch.' }
  ]);

  const categories = ['all', 'Tim mạch', 'Tiêu hóa', 'Ngoại khoa', 'Tổng quát'];
  
  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSaveArticle = (articleId) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Tim mạch': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
      'Tiêu hóa': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' },
      'Ngoại khoa': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-800' },
      'Tổng quát': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' }
    };
    return colors[category] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Bài Viết Sức Khỏe</h1>
          <p className="text-base text-gray-600">Tìm hiểu thêm về sức khỏe và y tế từ các bài viết chuyên môn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-200 rounded-lg p-3">
                <BookOpen className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Tổng Bài Viết</p>
                <p className="text-2xl font-bold text-blue-900">{articles.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-pink-200 rounded-lg p-3">
                <Bookmark className="w-5 h-5 text-pink-700" />
              </div>
              <div>
                <p className="text-sm text-pink-700">Đã Lưu</p>
                <p className="text-2xl font-bold text-pink-900">{savedArticles.length}</p>
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
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredArticles.map((article) => {
            const colors = getCategoryColor(article.category);
            const isSaved = savedArticles.includes(article.id);
            
            return (
              <div
                key={article.id}
                className={`${colors.bg} ${colors.border} rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`${colors.bg} rounded-lg p-2.5`}>
                      <BookOpen className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
                      {article.category}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSaveArticle(article.id)}
                    className={`transition-transform ${isSaved ? 'scale-110' : ''}`}
                  >
                    <Bookmark
                      size={20}
                      className={isSaved ? 'fill-pink-500 text-pink-500' : 'text-gray-400 hover:text-pink-500'}
                    />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{article.title}</h3>
                
                <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-3">{article.content}</p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-5 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} className={colors.text} />
                      {new Date(article.date).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} className={colors.text} />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedArticle(article)}
                  className={`w-full ${colors.text} bg-white hover:bg-gray-50 font-semibold py-2.5 rounded-lg transition border ${colors.border} flex items-center justify-center gap-2`}
                >
                  <Eye size={18} />
                  Đọc Chi Tiết
                </button>
              </div>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-purple-100">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Không tìm thấy bài viết nào</p>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedArticle.category}</p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(selectedArticle.date).toLocaleDateString('vi-VN')}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Article Content */}
              <div className="prose prose-sm max-w-none mb-6">
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 whitespace-pre-wrap mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-gray-200 pt-6">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg transition"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    toggleSaveArticle(selectedArticle.id);
                  }}
                  className={`flex-1 ${
                    savedArticles.includes(selectedArticle.id)
                      ? 'bg-pink-600 hover:bg-pink-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2`}
                >
                  <Bookmark size={18} />
                  {savedArticles.includes(selectedArticle.id) ? 'Bỏ Lưu' : 'Lưu Bài'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
