import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Report from './models/Report.js';
import Appointment from './models/Appointment.js';
import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seedReports() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Xóa dữ liệu cũ
    await Report.deleteMany({});
    await Appointment.deleteMany({}); // Xóa appointments cũ để tạo mới
    console.log('🗑️ Cleared old reports and appointments');

    // Lấy dữ liệu từ appointments và users để tạo báo cáo
    let allAppointments = await Appointment.find({}).populate('patientId').populate('doctorProfileId');
    const allDoctors = await DoctorProfile.find({}).populate('userId');
    const allUsers = await User.find({});

    console.log(`📋 Appointments found: ${allAppointments.length}`);

    // Tạo dữ liệu appointments mẫu nếu chưa có hoặc quá ít
    if (allAppointments.length < 20) {
      console.log('📝 Creating sample appointments...');
      
      const sampleAppointments = [];
      // Lọc ra chỉ bệnh nhân (loại bỏ admin, doctor, staff)
      const patients = allUsers.filter(u => !u.role || u.role === 'patient').slice(0, 10);
      const doctors = allDoctors.slice(0, 5);
      const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      const reasons = ['Khám tổng quát', 'Khám tim mạch', 'Khám ngoại', 'Tái khám', 'Kiểm tra sức khỏe'];
      
      if (patients.length === 0) {
        console.log('⚠️ No patients found, using all users');
        patients.push(...allUsers.slice(0, 10));
      }
      
      for (let i = 0; i < 50; i++) {
        const patient = patients[i % patients.length];
        const doctor = doctors[i % doctors.length];
        const status = statuses[i % statuses.length];
        
        // Tạo appointment trong 90 ngày gần đây với phân bố không đều
        const daysAgo = Math.floor(Math.random() * 90);
        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() - daysAgo);
        appointmentDate.setHours(Math.floor(Math.random() * 10) + 7, Math.floor(Math.random() * 60), 0);
        
        sampleAppointments.push({
          patientId: patient._id,
          doctorProfileId: doctor._id,
          appointmentDate,
          appointmentTime: `${String(appointmentDate.getHours()).padStart(2, '0')}:00`,
          reason: reasons[Math.floor(Math.random() * reasons.length)],
          status,
          patientInfo: { 
            name: patient.name || 'Patient', 
            age: 30 + Math.floor(Math.random() * 40), 
            phone: patient.phone || '0912345678', 
            gender: Math.random() > 0.5 ? 'Nam' : 'Nữ' 
          },
          doctorInfo: { 
            name: doctor.userId?.name || 'Doctor', 
            specialty: doctor.specialty || 'Nội tổng quát' 
          }
        });
      }
      
      await Appointment.insertMany(sampleAppointments);
      allAppointments = await Appointment.find({}).populate('patientId').populate('doctorProfileId');
      console.log(`✅ Created ${sampleAppointments.length} sample appointments with varied distribution`);
    }

    // Tính toán dữ liệu cho báo cáo tháng này
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const validAppointments = allAppointments.filter(apt => apt.patientId && apt.patientId._id);
    const appointmentsThisMonth = validAppointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= monthStart && aptDate <= monthEnd;
    });

    // Thống kê bệnh nhân
    const totalPatients = new Set(validAppointments.map(apt => apt.patientId._id.toString())).size;
    const patientIdsThisMonth = new Set(appointmentsThisMonth.map(apt => apt.patientId._id.toString()));
    const newPatients = patientIdsThisMonth.size;

    // Thống kê cuộc hẹn
    const completedAppointments = validAppointments.filter(apt => apt.status === 'completed').length;
    const pendingAppointments = validAppointments.filter(apt => apt.status === 'pending').length;
    const confirmedAppointments = validAppointments.filter(apt => apt.status === 'confirmed').length;
    const cancelledAppointments = validAppointments.filter(apt => apt.status === 'cancelled').length;
    const noShowAppointments = validAppointments.filter(apt => apt.status === 'no_show').length;

    const completionRate = validAppointments.length > 0 
      ? Math.round((completedAppointments / validAppointments.length) * 100) 
      : 0;

    // Bệnh nhân quay lại
    const patientsWithMultiple = validAppointments.reduce((acc, apt) => {
      const pid = apt.patientId._id.toString();
      acc[pid] = (acc[pid] || 0) + 1;
      return acc;
    }, {});
    const returningPatients = Object.values(patientsWithMultiple).filter(count => count > 1).length;
    const returningRate = totalPatients > 0 ? Math.round((returningPatients / totalPatients) * 100) : 0;

    // Dữ liệu hàng tháng (12 tháng)
    const monthlyData = [];
    const monthNames = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    
    for (let i = 11; i >= 0; i--) {
      const mStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthIndex = mStart.getMonth();
      const mName = monthNames[monthIndex];

      const mCount = validAppointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= mStart && aptDate <= mEnd;
      }).length;

      const mCompleted = validAppointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= mStart && aptDate <= mEnd && apt.status === 'completed';
      }).length;

      monthlyData.push({
        month: mName,
        appointmentCount: mCount,
        completedCount: mCompleted,
        newPatientsCount: Math.floor(Math.random() * (mCount / 2)) + 1,
        cancelledCount: Math.floor(mCount * 0.1),
        maxCapacity: 25
      });
    }

    // Thống kê bác sĩ
    const doctorStats = [];
    const peakHours = {};
    const busyDaysCount = {};

    for (const doctor of allDoctors.slice(0, 5)) {
      const doctorAppointments = validAppointments.filter(apt => 
        apt.doctorProfileId && apt.doctorProfileId._id.toString() === doctor._id.toString()
      );
      
      const doctorCompleted = doctorAppointments.filter(apt => apt.status === 'completed').length;
      const doctorCompletionRate = doctorAppointments.length > 0 
        ? Math.round((doctorCompleted / doctorAppointments.length) * 100) 
        : 0;

      // Tính thời gian khám trung bình từ appointments
      let totalDuration = 0;
      doctorAppointments.forEach(apt => {
        if (apt.appointmentTime) {
          totalDuration += 30; // Giả định mỗi cuộc khám ~30 phút
        }
      });
      const avgTime = doctorAppointments.length > 0 ? Math.round(totalDuration / doctorAppointments.length) : 30;

      // Tính đánh giá từ completion rate
      const doctorRating = (doctorCompletionRate / 100 * 5).toFixed(1);

      doctorStats.push({
        doctorId: doctor._id,
        doctorName: doctor.userId?.name || 'N/A',
        specialty: doctor.specialty || 'Nội tổng quát',
        appointmentsHandled: doctorAppointments.length,
        completionRate: doctorCompletionRate,
        averageRating: parseFloat(doctorRating),
        averageAppointmentTime: avgTime,
        totalPatientsSeen: new Set(doctorAppointments.map(apt => apt.patientId._id.toString())).size
      });

      // Thống kê giờ cao điểm
      doctorAppointments.forEach(apt => {
        if (apt.appointmentTime) {
          const hour = apt.appointmentTime.split(':')[0];
          peakHours[hour] = (peakHours[hour] || 0) + 1;
        }
      });

      // Thống kê ngày bận
      doctorAppointments.forEach(apt => {
        const day = new Date(apt.appointmentDate).toLocaleDateString('vi-VN', { weekday: 'long' });
        busyDaysCount[day] = (busyDaysCount[day] || 0) + 1;
      });
    }

    // Tính giờ cao điểm top 3
    const peakAppointmentTimes = Object.entries(peakHours)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour]) => `${hour}:00`);

    // Tính ngày bận top 3
    const busyDays = Object.entries(busyDaysCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([day]) => day);

    // Tính thời gian khám trung bình chung
    const avgAppointmentTimeOverall = doctorStats.length > 0 
      ? Math.round(doctorStats.reduce((sum, d) => sum + d.averageAppointmentTime, 0) / doctorStats.length)
      : 30;

    // Tính đánh giá trung bình từ completion rate
    const averageRatingOverall = (completionRate / 100 * 5).toFixed(1);

    // Tính thỏa mãn bệnh nhân dựa trên completion rate
    const patientSatisfactionOverall = Math.round(completionRate * 0.9 + 10); // 90% dựa vào completion, +10 base

    // Tính uptime dựa trên tỷ lệ không có lỗi (ước tính: completion + no issue = 99.5% base + adjustments)
    const systemUptimeOverall = (99 + (completionRate / 100)).toFixed(1);

    // Phân bố trạng thái
    const totalAppointments = validAppointments.length;
    const statusDistribution = [
      {
        status: 'Hoàn Thành',
        count: completedAppointments,
        percentage: totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0,
        color: 'bg-green-500'
      },
      {
        status: 'Đang Chờ',
        count: pendingAppointments + confirmedAppointments,
        percentage: totalAppointments > 0 ? Math.round(((pendingAppointments + confirmedAppointments) / totalAppointments) * 100) : 0,
        color: 'bg-yellow-500'
      },
      {
        status: 'Bị Hủy',
        count: cancelledAppointments,
        percentage: totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0,
        color: 'bg-red-500'
      }
    ];

    // Phân tích
    const recommendations = [
      'Tăng cường tiếp thị để thu hút bệnh nhân mới',
      'Cải thiện tỷ lệ hoàn thành cuộc hẹn',
      'Tập trung vào các chuyên khoa có nhu cầu cao',
      'Phát triển chương trình chăm sóc bệnh nhân tái khám',
      'Đánh giá lại khả năng cung cấp dịch vụ của bệnh viện'
    ];

    // Tạo báo cáo
    const report = new Report({
      reportName: `Báo cáo tháng ${now.getMonth() + 1}/${now.getFullYear()}`,
      reportPeriod: 'month',
      startDate: monthStart,
      endDate: monthEnd,
      
      statistics: {
        totalPatients,
        newPatients,
        returningPatients,
        returningRate
      },

      appointments: {
        total: totalAppointments,
        completed: completedAppointments,
        pending: pendingAppointments,
        confirmed: confirmedAppointments,
        cancelled: cancelledAppointments,
        noShow: noShowAppointments,
        completionRate,
        cancellationRate: totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0
      },

      examinations: {
        total: validAppointments.length,
        byDoctor: doctorStats,
        bySpecialty: [
          { specialty: 'Nội tổng quát', count: Math.ceil(validAppointments.length * 0.25), percentage: 25 },
          { specialty: 'Ngoại', count: Math.ceil(validAppointments.length * 0.2), percentage: 20 },
          { specialty: 'Tim mạch', count: Math.ceil(validAppointments.length * 0.15), percentage: 15 },
          { specialty: 'Hô hấp', count: Math.ceil(validAppointments.length * 0.15), percentage: 15 },
          { specialty: 'Khác', count: Math.ceil(validAppointments.length * 0.25), percentage: 25 }
        ]
      },

      doctors: {
        totalDoctors: allDoctors.length,
        activeDoctors: Math.ceil(allDoctors.length * 0.8),
        topPerformers: doctorStats.sort((a, b) => b.appointmentsHandled - a.appointmentsHandled).slice(0, 5)
      },

      monthlyData,

      statusDistribution,

      performance: {
        avgAppointmentTime: avgAppointmentTimeOverall,
        averageRating: parseFloat(averageRatingOverall),
        patientSatisfaction: patientSatisfactionOverall,
        systemUptime: parseFloat(systemUptimeOverall)
      },

      analysis: {
        peakAppointmentTimes: peakAppointmentTimes.length > 0 ? peakAppointmentTimes : ['09:00', '14:00', '15:30'],
        busyDays: busyDays.length > 0 ? busyDays : ['Thứ 2', 'Thứ 3', 'Thứ 4'],
        specialtyDemand: [
          { specialty: 'Nội tổng quát', demand: 'Cao', percentage: 28 },
          { specialty: 'Tim mạch', demand: 'Trung bình', percentage: 18 },
          { specialty: 'Ngoại', demand: 'Trung bình', percentage: 22 }
        ],
        recommendations
      },

      isActive: true,
      notes: 'Báo cáo tự động sinh tháng này'
    });

    await report.save();
    console.log('✅ Seed report created successfully');

    // Tạo thêm báo cáo cho các tháng trước
    for (let m = 1; m <= 3; m++) {
      const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
      const prevMonthEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0);
      const prevMonthName = prevMonthStart.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

      const prevReport = new Report({
        reportName: `Báo cáo ${prevMonthName}`,
        reportPeriod: 'month',
        startDate: prevMonthStart,
        endDate: prevMonthEnd,
        
        statistics: {
          totalPatients: totalPatients + Math.floor(Math.random() * 10),
          newPatients: Math.floor(Math.random() * 5) + 2,
          returningPatients: Math.floor(totalPatients * 0.6),
          returningRate: Math.floor(Math.random() * 20) + 50
        },

        appointments: {
          total: Math.floor(totalAppointments * (0.8 + Math.random() * 0.4)),
          completed: Math.floor(completedAppointments * (0.8 + Math.random() * 0.4)),
          pending: Math.floor(pendingAppointments * 0.8),
          confirmed: Math.floor(confirmedAppointments * 0.8),
          cancelled: Math.floor(cancelledAppointments * (0.7 + Math.random() * 0.5)),
          noShow: Math.floor(noShowAppointments * 0.9),
          completionRate: completionRate - Math.floor(Math.random() * 5),
          cancellationRate: Math.floor(Math.random() * 10) + 5
        },

        examinations: {
          total: Math.floor(validAppointments.length * 0.85),
          byDoctor: doctorStats.map(d => ({...d, appointmentsHandled: Math.floor(d.appointmentsHandled * 0.85)})),
          bySpecialty: [
            { specialty: 'Nội tổng quát', count: 15, percentage: 25 },
            { specialty: 'Ngoại', count: 12, percentage: 20 },
            { specialty: 'Tim mạch', count: 9, percentage: 15 },
            { specialty: 'Hô hấp', count: 9, percentage: 15 },
            { specialty: 'Khác', count: 15, percentage: 25 }
          ]
        },

        doctors: {
          totalDoctors: allDoctors.length,
          activeDoctors: Math.ceil(allDoctors.length * 0.75),
          topPerformers: doctorStats.slice(0, 3)
        },

        monthlyData: monthlyData.map(m => ({
          ...m,
          appointmentCount: Math.floor(m.appointmentCount * 0.9)
        })),

        statusDistribution,

        performance: {
          avgAppointmentTime: avgAppointmentTimeOverall,
          averageRating: parseFloat(averageRatingOverall),
          patientSatisfaction: patientSatisfactionOverall,
          systemUptime: parseFloat(systemUptimeOverall)
        },

        analysis: {
          peakAppointmentTimes: peakAppointmentTimes.length > 0 ? peakAppointmentTimes : ['10:00', '14:00'],
          busyDays: busyDays.length > 0 ? busyDays : ['Thứ 2', 'Thứ 3'],
          specialtyDemand: [
            { specialty: 'Nội tổng quát', demand: 'Cao', percentage: 28 },
            { specialty: 'Tim mạch', demand: 'Trung bình', percentage: 18 }
          ],
          recommendations
        },

        isActive: true
      });

      await prevReport.save();
      console.log(`✅ Previous month report ${m} created`);
    }

    console.log('✅ All reports seeded successfully');

    // Tạo báo cáo cho tuần này (week)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    
    const weekReport = new Report({
      reportName: `Báo cáo tuần này`,
      reportPeriod: 'week',
      startDate: weekStart,
      endDate: now,
      statistics: {
        totalPatients: Math.floor(totalPatients * 0.3),
        newPatients: Math.floor(newPatients * 0.2),
        returningPatients: Math.floor(returningPatients * 0.25),
        returningRate: Math.floor(Math.random() * 20) + 60
      },
      appointments: {
        total: Math.floor(totalAppointments * 0.2),
        completed: Math.floor(completedAppointments * 0.22),
        pending: Math.floor(pendingAppointments * 0.15),
        confirmed: Math.floor(confirmedAppointments * 0.2),
        cancelled: Math.floor(cancelledAppointments * 0.18),
        noShow: Math.floor(noShowAppointments * 0.1),
        completionRate: Math.round(Math.random() * 30) + 65,
        cancellationRate: Math.round(Math.random() * 15)
      },
      monthlyData: monthlyData.map(m => ({
        month: m.month,
        appointmentCount: Math.floor(m.appointmentCount * 0.15),
        completedCount: Math.floor(m.completedCount * 0.17),
        newPatientsCount: Math.floor(Math.random() * 2),
        cancelledCount: Math.floor(Math.random() * 1),
        maxCapacity: 5
      })),
      statusDistribution: [
        { status: 'Hoàn Thành', count: Math.floor(totalAppointments * 0.2 * 0.7), percentage: 70 },
        { status: 'Đang Chờ', count: Math.floor(totalAppointments * 0.2 * 0.2), percentage: 20 },
        { status: 'Bỏ Hẹn', count: Math.floor(totalAppointments * 0.2 * 0.1), percentage: 10 }
      ],
      performance: {
        avgAppointmentTime: 30,
        averageRating: 4.2
      },
      doctors: {
        totalDoctors: allDoctors.length,
        activeDoctors: Math.floor(allDoctors.length * 0.8),
        topPerformers: []
      },
      analysis: {
        specialtyDemand: [],
        peakAppointmentTimes: [],
        busyDays: [],
        recommendations: recommendations
      },
      isActive: true
    });
    await weekReport.save();
    console.log('✅ Week report created');

    // Tạo báo cáo cho quý này (quarter)
    const quarterStart = new Date(now);
    quarterStart.setMonth(now.getMonth() - 3);
    
    const quarterReport = new Report({
      reportName: `Báo cáo quý này`,
      reportPeriod: 'quarter',
      startDate: quarterStart,
      endDate: now,
      statistics: {
        totalPatients: Math.floor(totalPatients * 0.8),
        newPatients: Math.floor(newPatients * 0.7),
        returningPatients: Math.floor(returningPatients * 0.75),
        returningRate: Math.floor(Math.random() * 20) + 55
      },
      appointments: {
        total: Math.floor(totalAppointments * 0.7),
        completed: Math.floor(completedAppointments * 0.72),
        pending: Math.floor(pendingAppointments * 0.65),
        confirmed: Math.floor(confirmedAppointments * 0.7),
        cancelled: Math.floor(cancelledAppointments * 0.68),
        noShow: Math.floor(noShowAppointments * 0.7),
        completionRate: Math.round(Math.random() * 25) + 70,
        cancellationRate: Math.round(Math.random() * 12)
      },
      monthlyData: monthlyData.map(m => ({
        month: m.month,
        appointmentCount: Math.floor(m.appointmentCount * 0.7),
        completedCount: Math.floor(m.completedCount * 0.72),
        newPatientsCount: Math.floor(Math.random() * 8),
        cancelledCount: Math.floor(Math.random() * 3),
        maxCapacity: 20
      })),
      statusDistribution: [
        { status: 'Hoàn Thành', count: Math.floor(totalAppointments * 0.7 * 0.72), percentage: 72 },
        { status: 'Đang Chờ', count: Math.floor(totalAppointments * 0.7 * 0.18), percentage: 18 },
        { status: 'Bỏ Hẹn', count: Math.floor(totalAppointments * 0.7 * 0.1), percentage: 10 }
      ],
      performance: {
        avgAppointmentTime: 32,
        averageRating: 4.3
      },
      doctors: {
        totalDoctors: allDoctors.length,
        activeDoctors: Math.floor(allDoctors.length * 0.85),
        topPerformers: []
      },
      analysis: {
        specialtyDemand: [],
        peakAppointmentTimes: [],
        busyDays: [],
        recommendations: recommendations
      },
      isActive: true
    });
    await quarterReport.save();
    console.log('✅ Quarter report created');

    // Tạo báo cáo cho năm này (year)
    const yearStart = new Date(now);
    yearStart.setFullYear(now.getFullYear() - 1);
    
    const yearReport = new Report({
      reportName: `Báo cáo năm này`,
      reportPeriod: 'year',
      startDate: yearStart,
      endDate: now,
      statistics: {
        totalPatients: Math.floor(totalPatients * 1.2),
        newPatients: Math.floor(newPatients * 1.3),
        returningPatients: Math.floor(returningPatients * 1.15),
        returningRate: Math.floor(Math.random() * 20) + 50
      },
      appointments: {
        total: Math.floor(totalAppointments * 1.1),
        completed: Math.floor(completedAppointments * 1.12),
        pending: Math.floor(pendingAppointments * 1.0),
        confirmed: Math.floor(confirmedAppointments * 1.1),
        cancelled: Math.floor(cancelledAppointments * 1.05),
        noShow: Math.floor(noShowAppointments * 1.1),
        completionRate: Math.round(Math.random() * 20) + 75,
        cancellationRate: Math.round(Math.random() * 10)
      },
      monthlyData: monthlyData.map(m => ({
        month: m.month,
        appointmentCount: Math.floor(m.appointmentCount * 1.1),
        completedCount: Math.floor(m.completedCount * 1.12),
        newPatientsCount: Math.floor(Math.random() * 20),
        cancelledCount: Math.floor(Math.random() * 5),
        maxCapacity: 30
      })),
      statusDistribution: [
        { status: 'Hoàn Thành', count: Math.floor(totalAppointments * 1.1 * 0.75), percentage: 75 },
        { status: 'Đang Chờ', count: Math.floor(totalAppointments * 1.1 * 0.15), percentage: 15 },
        { status: 'Bỏ Hẹn', count: Math.floor(totalAppointments * 1.1 * 0.1), percentage: 10 }
      ],
      performance: {
        avgAppointmentTime: 31,
        averageRating: 4.4
      },
      doctors: {
        totalDoctors: allDoctors.length,
        activeDoctors: Math.floor(allDoctors.length * 0.9),
        topPerformers: []
      },
      analysis: {
        specialtyDemand: [],
        peakAppointmentTimes: [],
        busyDays: [],
        recommendations: recommendations
      },
      isActive: true
    });
    await yearReport.save();
    console.log('✅ Year report created');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding reports:', error);
    process.exit(1);
  }
}

seedReports();
