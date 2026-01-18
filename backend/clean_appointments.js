import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Appointment from './models/Appointment.js';
import DoctorProfile from './models/DoctorProfile.js';
import User from './models/User_Model.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function cleanAppointments() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Xóa appointments cũ
    const deletedCount = await Appointment.deleteMany({});
    console.log(`🗑️ Deleted ${deletedCount.deletedCount} old appointments`);

    // Lấy patients collection
    const patientsCollection = mongoose.connection.db.collection('patients');
    const allPatients = await patientsCollection.find({}).toArray();
    console.log(`🏥 Found ${allPatients.length} patients`);

    // Lấy doctor profiles (loại bỏ "Doctor User")
    let allDoctors = await DoctorProfile.find({}).populate('userId');
    console.log(`👨‍⚕️ Found ${allDoctors.length} doctor profiles`);

    // Lọc bỏ doctors không có userId hoặc userId là "Doctor User"
    allDoctors = allDoctors.filter(doc => {
      return doc.userId && doc.userId.name && doc.userId.name !== 'Doctor User';
    });

    console.log(`✅ Valid doctors after filter: ${allDoctors.length}`);

    // Tạo appointments mới chỉ với patients
    const sampleAppointments = [];
    const doctors = allDoctors.slice(0, 5);
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const reasons = ['Khám tổng quát', 'Khám tim mạch', 'Khám ngoại', 'Tái khám', 'Kiểm tra sức khỏe'];

    for (let i = 0; i < 50; i++) {
      const patient = allPatients[i % allPatients.length];
      const doctor = doctors[i % doctors.length];
      const status = statuses[i % statuses.length];

      // Tạo appointment trong 90 ngày gần đây
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() - Math.floor(Math.random() * 90));
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
          age: patient.age || 30, 
          phone: patient.phone || '0912345678', 
          gender: patient.gender || 'Nam' 
        },
        doctorInfo: { 
          name: doctor.userId?.name || 'Doctor', 
          specialty: doctor.specialty || 'Nội tổng quát' 
        }
      });
    }

    await Appointment.insertMany(sampleAppointments);
    console.log(`✅ Created ${sampleAppointments.length} valid appointments`);

    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanAppointments();
