import React, { useState } from 'react';
import { BookOpen, Search, Filter, Eye, Bookmark } from 'lucide-react';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles] = useState([
    { id: 1, title: '10 Cách Giữ Tim Khỏe Mạnh', category: 'Tim mạch', date: '2025-01-20', readTime: '5 phút', content: 'Tìm hiểu các cách đơn giản để bảo vệ sức khỏe tim mạch của bạn...' },
    { id: 2, title: 'Chế Độ Ăn Lành Mạnh Cho Bệnh Tiêu Hóa', category: 'Tiêu hóa', date: '2025-01-18', readTime: '7 phút', content: 'Hướng dẫn chi tiết về chế độ ăn uống phù hợp cho người có vấn đề tiêu hóa...' },
    { id: 3, title: 'Bài Tập Nhẹ Sau Phẫu Thuật', category: 'Ngoại khoa', date: '2025-01-15', readTime: '6 phút', content: 'Các bài tập an toàn giúp phục hồi sau phẫu thuật hiệu quả...' },
    { id: 4, title: 'Quản Lý Huyết Áp Cao Tự Nhiên', category: 'Tim mạch', date: '2025-01-10', readTime: '8 phút', content: 'Những cách tự nhiên để kiểm soát huyết áp cao mà không cần dùng quá nhiều thuốc...' },
    { id: 5, title: 'Lợi Ích Của Yoga Cho Sức Khỏe', category: 'Tổng quát', date: '2025-01-05', readTime: '5 phút', content: 'Yoga không chỉ giúp linh hoạt mà còn cải thiện sức khỏe tâm thần...' }
  ]);

  const categories = ['all', 'Tim mạch', 'Tiêu hóa', 'Ngoại khoa', 'Tổng quát'];
  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Bài Viết Sức Khỏe</h1>
        <p className="text-purple-100">Tìm hiểu thêm về sức khỏe và y tế</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex gap-4 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Tìm kiếm bài viết..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg font-semibold transition ${selectedCategory === cat ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-500'}`}>
            {cat === 'all' ? 'Tất cả' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border-l-4 border-purple-500 flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="text-purple-600 flex-shrink-0" size={28} />
                <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full whitespace-nowrap">
                  {article.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">{article.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {article.readTime}</span>
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-2">
              <button className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition flex items-center justify-center gap-1 font-semibold">
                <Eye size={16} /> Đọc
              </button>
              <button className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy bài viết</p>
        </div>
      )}
    </div>
  );
};

export default Articles;
