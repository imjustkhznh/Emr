import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  FileText,
  Bell,
  CreditCard,
  MessageCircle,
  Star,
  Stethoscope,
  HeartPulse,
  Brain,
  ShieldCheck,
  UserCircle2,
  Phone,
  Activity,
} from 'lucide-react';

const PatientHome = () => {
  return (
    <div className="bg-gradient-to-b from-primary-50 via-white to-secondary-50">
      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <p className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
            Chăm sóc sức khỏe cho gia đình bạn
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900 leading-snug">
            Đặt lịch khám, xét nghiệm{' '}
            <span className="text-primary-600">nhanh chóng và an toàn</span> ngay tại nhà.
          </h1>
          <p className="text-sm lg:text-base text-secondary-600 max-w-xl">
            Hệ thống MediCare EMR giúp bạn quản lý lịch khám, xem kết quả xét nghiệm và lưu trữ hồ sơ sức
            khỏe mọi lúc, mọi nơi.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/patient/appointments"
              className="px-5 py-2.5 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700"
            >
              Đặt lịch khám ngay
            </Link>
            <Link
              to="/patient/results"
              className="px-5 py-2.5 rounded-full border border-primary-200 text-primary-700 text-sm font-semibold bg-white hover:bg-primary-50"
            >
              Xem kết quả xét nghiệm
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 pt-2 text-xs text-secondary-600">
            <div>
              <p className="font-semibold text-secondary-900">24/7</p>
              <p>Đặt lịch online</p>
            </div>
            <div>
              <p className="font-semibold text-secondary-900">100% bảo mật</p>
              <p>Hồ sơ sức khỏe</p>
            </div>
            <div>
              <p className="font-semibold text-secondary-900">Hơn 200+</p>
              <p>Bác sĩ và chuyên gia</p>
            </div>
          </div>
        </div>

        {/* Illustration card */}
        <div className="relative">
          <div className="rounded-3xl bg-gradient-to-tr from-primary-500 via-primary-400 to-primary-300 text-white p-6 lg:p-7 shadow-xl overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative space-y-4">
              <p className="text-lg font-semibold">Ưu đãi tháng này</p>
              <p className="text-2xl font-bold leading-snug">
                Gói khám tổng quát cho phụ nữ <br />
                <span className="text-yellow-200">Ưu đãi đến 30%</span>
              </p>
              <p className="text-xs text-primary-50 max-w-xs">
                Phát hiện sớm các bệnh lý thường gặp, chủ động bảo vệ sức khỏe bản thân và gia đình.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <p className="font-semibold">Khám tại nhà</p>
                  <p className="text-primary-50 mt-1">Lấy mẫu xét nghiệm tận nơi</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <p className="font-semibold">Kết quả online</p>
                  <p className="text-primary-50 mt-1">Nhận kết quả trên ứng dụng</p>
                </div>
              </div>
              <button className="mt-1 inline-flex items-center px-4 py-2 rounded-full bg-white text-primary-600 text-xs font-semibold hover:bg-primary-50">
                Tư vấn miễn phí
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick booking with inline form */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 rounded-2xl border border-primary-100 bg-primary-50/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-primary-700 font-semibold uppercase tracking-wide">
                  ĐẶT LỊCH KHÁM NHANH
                </p>
                <p className="text-sm text-secondary-700">
                  Chọn chuyên khoa, thời gian và để lại lý do, chúng tôi sẽ xác nhận sớm nhất.
                </p>
              </div>
              <Stethoscope className="hidden md:block w-8 h-8 text-primary-500" />
            </div>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
              <div className="md:col-span-1">
                <label className="block text-secondary-600 mb-1">Chuyên khoa</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Nội tổng quát</option>
                  <option>Tim mạch</option>
                  <option>Sản phụ khoa</option>
                  <option>Nhi khoa</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="block text-secondary-600 mb-1">Ngày khám</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-secondary-600 mb-1">Khung giờ</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>08:00 - 09:00</option>
                  <option>09:00 - 10:00</option>
                  <option>14:00 - 15:00</option>
                </select>
              </div>
              <div className="md:col-span-1 flex md:flex-col gap-2 justify-end md:justify-start">
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700"
                >
                  Đặt lịch ngay
                </button>
                <Link
                  to="/patient/appointments"
                  className="w-full md:w-auto px-4 py-2 rounded-lg border border-primary-200 text-primary-700 text-sm text-center hover:bg-primary-50"
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className="md:col-span-4">
                <label className="block text-secondary-600 mb-1">Lý do khám (tuỳ chọn)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: khám sức khỏe định kỳ, đau đầu kéo dài..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </form>
          </div>

          <div className="space-y-3 text-sm">
            <Link
              to="/patient/results"
              className="rounded-2xl border border-primary-100 bg-primary-50/40 p-4 flex gap-3 items-center hover:shadow-sm"
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900">Xem kết quả xét nghiệm</p>
                <p className="text-secondary-500 text-xs">
                  Tra cứu nhanh kết quả xét nghiệm và chẩn đoán hình ảnh.
                </p>
              </div>
            </Link>
            <Link
              to="/patient/visits"
              className="rounded-2xl border border-primary-100 bg-primary-50/30 p-4 flex gap-3 items-center hover:shadow-sm"
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary-600">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900">Lịch sử khám bệnh</p>
                <p className="text-secondary-500 text-xs">
                  Xem lại toàn bộ các lần khám và chẩn đoán trước đây.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-secondary-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <Link
            to="/patient/prescriptions"
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Đơn thuốc &amp; điều trị</p>
              <p className="text-secondary-600 text-xs">
                Xem lại đơn thuốc, liều dùng và hướng dẫn điều trị chi tiết.
              </p>
            </div>
          </Link>
          <Link
            to="/patient/payments"
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Thanh toán viện phí</p>
              <p className="text-secondary-600 text-xs">
                Theo dõi hóa đơn, thanh toán trực tuyến nhanh chóng và an toàn.
              </p>
            </div>
          </Link>
          <Link
            to="/patient/notifications"
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Thông báo &amp; nhắc lịch</p>
              <p className="text-secondary-600 text-xs">
                Không bỏ lỡ lịch khám, kết quả mới hay thông báo quan trọng từ bệnh viện.
              </p>
            </div>
          </Link>
          <Link
            to="/patient/telemedicine"
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Tư vấn trực tuyến</p>
              <p className="text-secondary-600 text-xs">
                Đặt lịch tư vấn qua video/voice/chat với bác sĩ ngay tại nhà.
              </p>
            </div>
          </Link>
          <Link
            to="/patient/reviews"
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Đánh giá dịch vụ</p>
              <p className="text-secondary-600 text-xs">
                Gửi phản hồi về chất lượng khám chữa bệnh và trải nghiệm của bạn.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles preview */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Bài viết nổi bật</h2>
            <Link
              to="/patient/articles"
              className="text-sm text-primary-700 font-semibold hover:text-primary-800"
            >
              Xem tất cả bài viết
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            <div className="bg-secondary-50 rounded-2xl border border-secondary-100 p-4">
              <p className="text-[11px] text-primary-700 font-semibold mb-1">Sức khỏe phụ nữ</p>
              <p className="font-semibold text-secondary-900 mb-1">
                Khám sức khỏe định kỳ giúp phát hiện bệnh sớm
              </p>
              <p className="text-xs text-secondary-600">
                Cơ thể phụ nữ thay đổi theo từng giai đoạn, việc tầm soát sớm giúp bảo vệ sức khỏe
                lâu dài...
              </p>
            </div>
            <div className="bg-secondary-50 rounded-2xl border border-secondary-100 p-4">
              <p className="text-[11px] text-primary-700 font-semibold mb-1">Dinh dưỡng</p>
              <p className="font-semibold text-secondary-900 mb-1">
                Thực đơn lành mạnh cho gia đình bận rộn
              </p>
              <p className="text-xs text-secondary-600">
                Gợi ý các nhóm thực phẩm giúp giữ năng lượng cả ngày mà vẫn tốt cho tim mạch...
              </p>
            </div>
            <div className="bg-secondary-50 rounded-2xl border border-secondary-100 p-4">
              <p className="text-[11px] text-primary-700 font-semibold mb-1">Tim mạch</p>
              <p className="font-semibold text-secondary-900 mb-1">
                5 thói quen tốt cho người tăng huyết áp
              </p>
              <p className="text-xs text-secondary-600">
                Tập thể dục nhẹ nhàng, ngủ đủ giấc và kiểm soát cân nặng là chìa khóa kiểm soát
                huyết áp...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor team */}
      <section className="bg-secondary-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Đội ngũ chuyên gia y tế</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            {[
              { name: 'BSCKII. Nguyễn Quốc Dũng', specialty: 'Chẩn đoán hình ảnh' },
              { name: 'PGS.TS. Đoàn Hữu Nghị', specialty: 'Tim mạch can thiệp' },
              { name: 'TS.BS. Lê Chính Đại', specialty: 'Ung bướu' },
            ].map((d) => (
              <div
                key={d.name}
                className="bg-white rounded-3xl border border-gray-100 px-6 pt-8 pb-6 flex flex-col items-center gap-3 shadow-sm"
              >
                <div className="w-32 h-32 rounded-full bg-primary-50 flex items-center justify-center mb-1">
                  <UserCircle2 className="w-16 h-16 text-primary-400" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">{d.name}</p>
                  <p className="text-xs text-primary-700 mt-1">Chuyên khoa: {d.specialty}</p>
                </div>
                <button className="mt-1 inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-primary-200 text-primary-700 text-xs font-semibold hover:bg-primary-50">
                  <Phone className="w-3 h-3" />
                  Đặt lịch với bác sĩ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties grid */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            Các chuyên khoa y tế tại MediCare EMR
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            {[
              { icon: <HeartPulse className="w-6 h-6" />, label: 'Tim mạch' },
              { icon: <Brain className="w-6 h-6" />, label: 'Thần kinh' },
              { icon: <Stethoscope className="w-6 h-6" />, label: 'Nội tổng quát' },
              { icon: <ShieldCheck className="w-6 h-6" />, label: 'Miễn dịch - Dị ứng' },
              { icon: <UserCircle2 className="w-6 h-6" />, label: 'Nhi khoa' },
              { icon: <Activity className="w-6 h-6" />, label: 'Nội tiết - Đái tháo đường' },
            ].map((s) => (
              <div
                key={s.label}
                className="border border-primary-50 bg-primary-50/60 rounded-2xl px-4 py-5 flex flex-col items-start gap-3 hover:bg-primary-50"
              >
                <div className="text-primary-600">{s.icon}</div>
                <p className="font-semibold text-secondary-900 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership / insurance form */}
      <section className="bg-secondary-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-sm">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-secondary-900">
              Ưu đãi thành viên &amp; đăng ký bảo hiểm
            </h2>
            <ul className="space-y-2 text-secondary-700 text-sm">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Theo dõi lịch sử khám chữa bệnh và quyền lợi bảo hiểm y tế.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Đăng ký các gói khám, tầm soát sức khỏe định kỳ với mức giá ưu đãi.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>Nhận thông báo quyền lợi mới, chương trình chăm sóc khách hàng thân thiết.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-sm">
            <p className="text-secondary-700 text-sm">
              Đăng ký email và thông tin bảo hiểm để nhận tư vấn chi tiết từ đội ngũ MediCare EMR.
            </p>
            <form className="space-y-3 text-sm">
              <div>
                <label className="block text-secondary-600 mb-1">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-secondary-600 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-secondary-600 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="09xx xxx xxx"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-secondary-600 mb-1">Đơn vị bảo hiểm</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Bảo hiểm y tế nhà nước</option>
                  <option>Bảo hiểm tư nhân</option>
                  <option>Chưa có bảo hiểm</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700"
              >
                Đăng ký tư vấn bảo hiểm
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientHome;

