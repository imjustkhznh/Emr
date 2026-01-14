import Appointment from '../models/Appointment.js';
import User from '../models/User_Model.js';

// Lấy dữ liệu báo cáo cho bác sĩ
export const getDoctorReports = async (req, res) => {
  try {
    const doctorId = req.user._id || req.user.id; // Lấy ID bác sĩ từ token
    const { timeRange = 'month' } = req.query;

    console.log('📊 Getting reports for doctor:', doctorId);

    // Tính toán khoảng thời gian
    const now = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    // Lấy tất cả cuộc hẹn (không filter theo bác sĩ để test)
    // Trong thực tế, bạn có thể filter theo doctorProfileId hoặc doctor user ID
    const allAppointments = await Appointment.find({}).populate('patientId', 'name dateOfBirth email phone');

    console.log(`📋 Total appointments in DB: ${allAppointments.length}`);

    // Lấy cuộc hẹn trong khoảng thời gian
    const appointmentsInRange = allAppointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= startDate && aptDate <= now;
    });

    // Tính toán các chỉ số
    const totalPatients = new Set(allAppointments.map(apt => apt.patientId._id.toString())).size;
    const totalAppointments = allAppointments.length;
    const completedAppointments = allAppointments.filter(apt => apt.status === 'completed').length;
    const cancelledAppointments = allAppointments.filter(apt => apt.status === 'cancelled').length;
    const noShowAppointments = allAppointments.filter(apt => apt.status === 'no_show').length;
    const appointmentsThisMonth = appointmentsInRange.length;

    // Tính tỷ lệ hoàn thành
    const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
    const cancellationRate = totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0;

    // Dữ liệu cuộc hẹn hàng tháng (12 tháng gần nhất)
    const monthlyData = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthName = monthStart.toLocaleDateString('vi-VN', { month: 'short' }).substring(0, 3);
      const count = allAppointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= monthStart && aptDate <= monthEnd;
      }).length;

      monthlyData.push({
        month: monthName,
        value: count,
        max: 25
      });
    }

    // Phân bố tình trạng
    const pendingAppointments = allAppointments.filter(apt => apt.status === 'pending' || apt.status === 'confirmed').length;

    // Thống kê chi tiết
    const newPatientsThisMonth = (await Promise.all(
      Array.from(new Set(appointmentsInRange.map(apt => apt.patientId._id.toString()))).map(id =>
        User.findById(id)
      )
    )).filter(user => {
      const createdDate = new Date(user.timestramp);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return createdDate >= monthAgo;
    }).length;

    // Tính tỷ lệ bệnh nhân quay lại
    const patientsWithMultipleAppointments = allAppointments.reduce((acc, apt) => {
      const patientId = apt.patientId._id.toString();
      acc[patientId] = (acc[patientId] || 0) + 1;
      return acc;
    }, {});

    const returningPatients = Object.values(patientsWithMultipleAppointments).filter(count => count > 1).length;
    const returningRate = totalPatients > 0 ? Math.round((returningPatients / totalPatients) * 100) : 0;

    // Thời gian hẹn trung bình
    const avgAppointmentTime = 30; // Mặc định 30 phút

    // Đánh giá trung bình (nếu có review)
    const averageRating = 4.8; // Placeholder

    return res.status(200).json({
      success: true,
      data: {
        totalPatients,
        totalAppointments,
        completedAppointments,
        completionRate,
        cancelledAppointments,
        cancellationRate,
        noShowAppointments,
        appointmentsThisMonth,
        pendingAppointments,
        monthlyData,
        statusDistribution: [
          {
            status: 'Hoàn Thành',
            count: completedAppointments,
            color: 'bg-green-500',
            percentage: Math.round((completedAppointments / totalAppointments) * 100) || 0
          },
          {
            status: 'Đang Chờ',
            count: pendingAppointments,
            color: 'bg-yellow-500',
            percentage: Math.round((pendingAppointments / totalAppointments) * 100) || 0
          },
          {
            status: 'Bị Hủy',
            count: cancelledAppointments,
            color: 'bg-red-500',
            percentage: Math.round((cancelledAppointments / totalAppointments) * 100) || 0
          }
        ],
        newPatientsThisMonth,
        returningPatients,
        returningRate,
        avgAppointmentTime,
        averageRating
      }
    });
  } catch (err) {
    console.error('Error in getDoctorReports:', err);
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
