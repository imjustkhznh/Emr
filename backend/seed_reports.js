import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';
import Appointment from './models/Appointment.js';
import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';

dotenv.config();

const seedReportData = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Xóa dữ liệu cũ
    await Appointment.deleteMany({});
    console.log('🗑️  Cleared old appointments');

    // Lấy doctor đầu tiên
    const doctor = await User.findOne({ role: 'doctor' });
    if (!doctor) {
      console.log('❌ No doctor found in database');
      process.exit(1);
    }
    console.log('👨‍⚕️ Found doctor:', doctor.name);

    // Lấy bệnh nhân
    const patients = await User.find({ role: 'patients' }).limit(10);
    if (patients.length === 0) {
      console.log('❌ No patients found in database');
      process.exit(1);
    }
    console.log(`👥 Found ${patients.length} patients`);

    // Tạo 20 appointments mẫu
    const appointments = [];
    const now = new Date();

    for (let i = 0; i < 20; i++) {
      const patient = patients[i % patients.length];
      const daysAgo = Math.floor(Math.random() * 90); // Random 0-90 ngày trước
      const appointmentDate = new Date(now);
      appointmentDate.setDate(appointmentDate.getDate() - daysAgo);

      const hour = Math.floor(Math.random() * 8) + 8; // 8-15 giờ
      const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45 phút

      const appointmentTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

      const statuses = ['completed', 'completed', 'completed', 'completed', 'pending', 'cancelled'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      appointments.push({
        patientId: patient._id,
        doctorProfileId: doctor._id,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        reason: ['Khám sơ bộ', 'Tái khám', 'Kiểm tra sức khỏe định kỳ', 'Tư vấn'][Math.floor(Math.random() * 4)],
        status: status,
        doctorInfo: {
          userId: doctor._id,
          name: doctor.name,
          specialty: 'Nội tổng quát'
        },
        patientInfo: {
          name: patient.name,
          email: patient.email,
          phone: patient.phone,
          age: Math.floor(Math.random() * 60) + 20
        }
      });
    }

    const createdAppointments = await Appointment.insertMany(appointments);
    console.log(`✅ Created ${createdAppointments.length} appointments`);

    // Hiển thị thống kê
    const completed = appointments.filter(a => a.status === 'completed').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;
    const pending = appointments.filter(a => a.status === 'pending').length;

    console.log(`\n📊 Statistics:`);
    console.log(`   - Completed: ${completed} (${Math.round(completed / appointments.length * 100)}%)`);
    console.log(`   - Cancelled: ${cancelled} (${Math.round(cancelled / appointments.length * 100)}%)`);
    console.log(`   - Pending: ${pending} (${Math.round(pending / appointments.length * 100)}%)`);
    console.log(`   - Total Patients: ${new Set(appointments.map(a => a.patientId.toString())).size}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedReportData();
