import Appointment from '../models/Appointment.js';
import User from '../models/User_Model.js';
import Report from '../models/Report.js';

// Lấy dữ liệu báo cáo cho bác sĩ
export const getDoctorReports = async (req, res) => {
  try {
    const doctorId = req.user._id || req.user.id; // Lấy ID bác sĩ từ token
    const { timeRange = 'month' } = req.query;

    console.log('📊 Getting reports for timeRange:', timeRange);

    // Lấy báo cáo phù hợp theo timeRange
    let reportFilter = { isActive: true, reportPeriod: timeRange };
    const report = await Report.findOne(reportFilter).sort({ generatedAt: -1 });

    if (report) {
      console.log('✅ Report found:', report.reportName);
      
      // Tính đánh giá: base 3 sao + (completion rate / 100 * 2) để range từ 3-5 sao
      const calculatedRating = 3 + (report.appointments.completionRate / 100) * 2;
      const ratingValue = Math.min(5, Math.max(3, calculatedRating)).toFixed(1);

      return res.status(200).json({
        success: true,
        data: {
          totalPatients: report.statistics.totalPatients,
          totalAppointments: report.appointments.total,
          completedAppointments: report.appointments.completed,
          completionRate: report.appointments.completionRate,
          cancelledAppointments: report.appointments.cancelled,
          cancellationRate: report.appointments.cancellationRate,
          noShowAppointments: report.appointments.noShow,
          appointmentsThisMonth: report.appointments.total,
          pendingAppointments: report.appointments.pending + report.appointments.confirmed,
          monthlyData: report.monthlyData,
          statusDistribution: report.statusDistribution,
          newPatientsThisMonth: report.statistics.newPatients,
          returningPatients: report.statistics.returningPatients,
          returningRate: report.statistics.returningRate,
          avgAppointmentTime: report.performance.avgAppointmentTime,
          averageRating: parseFloat(ratingValue),
          doctorStats: report.doctors.topPerformers,
          specialtyDemand: report.analysis.specialtyDemand,
          peakTimes: report.analysis.peakAppointmentTimes,
          busyDays: report.analysis.busyDays,
          recommendations: report.analysis.recommendations,
          reportName: report.reportName,
          generatedAt: report.generatedAt
        }
      });
    }

    // Nếu không tìm thấy báo cáo, tính toán từ appointments
    console.log('📋 No report found, calculating from appointments');

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

    // Lấy tất cả cuộc hẹn
    const allAppointments = await Appointment.find({}).populate('patientId', 'name dateOfBirth email phone');

    console.log(`📋 Total appointments in DB: ${allAppointments.length}`);

    // Filter các appointment có patientId hợp lệ
    const validAppointments = allAppointments.filter(apt => apt.patientId && apt.patientId._id);

    // Lấy cuộc hẹn trong khoảng thời gian
    const appointmentsInRange = validAppointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= startDate && aptDate <= now;
    });

    // Tính toán các chỉ số
    const totalPatients = new Set(validAppointments.map(apt => apt.patientId._id.toString())).size;
    const totalAppointments = validAppointments.length;
    const completedAppointments = validAppointments.filter(apt => apt.status === 'completed').length;
    const cancelledAppointments = validAppointments.filter(apt => apt.status === 'cancelled').length;
    const noShowAppointments = validAppointments.filter(apt => apt.status === 'no_show').length;
    const appointmentsThisMonth = appointmentsInRange.length;

    // Tính tỷ lệ hoàn thành
    const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
    const cancellationRate = totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0;

    // Dữ liệu cuộc hẹn hàng tháng (12 tháng gần nhất)
    const monthlyData = [];
    const monthNames = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthIndex = monthStart.getMonth();
      const monthName = monthNames[monthIndex];
      
      const count = validAppointments.filter(apt => {
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
    const pendingAppointments = validAppointments.filter(apt => apt.status === 'pending' || apt.status === 'confirmed').length;

    // Thống kê chi tiết
    const patientIds = new Set();
    appointmentsInRange.forEach(apt => {
      if (apt.patientId && apt.patientId._id) {
        patientIds.add(apt.patientId._id.toString());
      }
    });

    const newPatientsThisMonth = (await Promise.all(
      Array.from(patientIds).map(id => User.findById(id))
    )).filter(user => {
      if (!user) return false;
      const createdDate = new Date(user.createdAt || user.dateOfBirth || new Date());
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return createdDate >= monthAgo;
    }).length;

    // Tính tỷ lệ bệnh nhân quay lại
    const patientsWithMultipleAppointments = validAppointments.reduce((acc, apt) => {
      if (apt.patientId && apt.patientId._id) {
        const patientId = apt.patientId._id.toString();
        acc[patientId] = (acc[patientId] || 0) + 1;
      }
      return acc;
    }, {});

    const returningPatients = Object.values(patientsWithMultipleAppointments).filter(count => count > 1).length;
    const returningRate = totalPatients > 0 ? Math.round((returningPatients / totalPatients) * 100) : 0;

    // Tính đánh giá: base 3 sao + (completion rate / 100 * 2) để range từ 3-5 sao
    const calculatedRating = 3 + (completionRate / 100) * 2;
    const avgRating = Math.min(5, Math.max(3, calculatedRating)).toFixed(1);
    const avgAppointmentTime = 30;

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
          averageRating: parseFloat(avgRating)
        }
      });
  } catch (err) {
    console.error('Error in getDoctorReports:', err);
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

// Lấy báo cáo từ database
export const getReportsFromDB = async (req, res) => {
  try {
    const { timeRange = 'month' } = req.query;

    console.log('📊 Fetching reports from DB with timeRange:', timeRange);

    // Lấy báo cáo mới nhất
    const report = await Report.findOne({ reportPeriod: timeRange, isActive: true })
      .sort({ generatedAt: -1 });

    if (!report) {
      console.log('⚠️ No report found, generating from appointments');
      return res.status(200).json({
        success: true,
        message: 'Không tìm thấy báo cáo trong database, vui lòng chạy seed',
        data: null
      });
    }

    console.log('✅ Report found:', report.reportName);

    return res.status(200).json({
      success: true,
      data: {
        totalPatients: report.statistics.totalPatients,
        totalAppointments: report.appointments.total,
        completedAppointments: report.appointments.completed,
        completionRate: report.appointments.completionRate,
        cancelledAppointments: report.appointments.cancelled,
        cancellationRate: report.appointments.cancellationRate,
        noShowAppointments: report.appointments.noShow,
        appointmentsThisMonth: report.appointments.total,
        pendingAppointments: report.appointments.pending + report.appointments.confirmed,
        monthlyData: report.monthlyData,
        statusDistribution: report.statusDistribution,
        newPatientsThisMonth: report.statistics.newPatients,
        returningPatients: report.statistics.returningPatients,
        returningRate: report.statistics.returningRate,
        avgAppointmentTime: report.performance.avgAppointmentTime,
        averageRating: report.performance.averageRating,
        doctorStats: report.doctors.topPerformers,
        specialtyDemand: report.analysis.specialtyDemand,
        peakTimes: report.analysis.peakAppointmentTimes,
        busyDays: report.analysis.busyDays,
        recommendations: report.analysis.recommendations,
        reportName: report.reportName,
        generatedAt: report.generatedAt
      }
    });
  } catch (err) {
    console.error('Error in getReportsFromDB:', err);
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

// Lấy tất cả báo cáo (lịch sử)
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({ isActive: true })
      .sort({ generatedAt: -1 })
      .limit(12);

    console.log(`✅ Found ${reports.length} reports`);

    const formattedReports = reports.map(report => ({
      _id: report._id,
      reportName: report.reportName,
      reportPeriod: report.reportPeriod,
      startDate: report.startDate,
      endDate: report.endDate,
      totalAppointments: report.appointments.total,
      completedAppointments: report.appointments.completed,
      completionRate: report.appointments.completionRate,
      totalPatients: report.statistics.totalPatients,
      newPatients: report.statistics.newPatients,
      generatedAt: report.generatedAt,
      isActive: report.isActive
    }));

    return res.status(200).json({
      success: true,
      data: formattedReports
    });
  } catch (err) {
    console.error('Error in getAllReports:', err);
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

// Lấy chi tiết báo cáo theo ID
export const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Báo cáo không tồn tại'
      });
    }

    return res.status(200).json({
      success: true,
      data: report
    });
  } catch (err) {
    console.error('Error in getReportById:', err);
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
