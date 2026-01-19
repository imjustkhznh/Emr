import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Appointment from './models/Appointment.js';
import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seedAppointments() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Lấy dữ liệu
    const users = await User.find({});
    const doctors = await DoctorProfile.find({}).populate('userId');
    
    const patients = users.filter(u => !u.role || (u.role !== 'doctor' && u.role !== 'admin' && u.role !== 'Admin'));
    
    if (patients.length === 0 || doctors.length === 0) {
      console.log('❌ Không đủ dữ liệu (bệnh nhân hoặc bác sĩ)');
      process.exit(1);
    }

    // Xóa dữ liệu cũ
    await Appointment.deleteMany({});
    console.log('🗑️ Cleared old appointments');

    const statuses = ['completed', 'completed', 'completed', 'pending', 'confirmed', 'cancelled'];
    const reasons = [
      'Khám tổng quát', 
      'Khám tim mạch', 
      'Khám ngoại', 
      'Tái khám', 
      'Kiểm tra sức khỏe',
      'Khám sau chấn thương',
      'Theo dõi bệnh mạn tính'
    ];

    const appointments = [];

    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      const doctor = doctors[i % doctors.length];

      // Tạo 2-4 cuộc hẹn cho mỗi bệnh nhân
      const apptCount = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 0; j < apptCount; j++) {
        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() - Math.floor(Math.random() * 90));
        const hours = Math.floor(Math.random() * 10) + 7;
        const minutes = Math.floor(Math.random() * 60);
        
        appointmentDate.setHours(hours, minutes, 0);

        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];

        const appointment = new Appointment({
          patientId: patient._id,
          doctorProfileId: doctor._id,
          appointmentDate: appointmentDate,
          appointmentTime: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
          status: status,
          reason: reason,
          symptoms: ['Mệt mỏi', 'Đau nhẹ'],
          notes: `Cuộc hẹn khám: ${reason}`,
          doctorInfo: {
            userId: doctor.userId._id,
            name: doctor.userId.name,
            specialty: doctor.specialty,
            phone: doctor.userId.phone,
            consultationFee: 500000
          },
          patientInfo: {
            name: patient.name,
            phone: patient.phone,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender || (Math.random() > 0.5 ? 'Nam' : 'Nữ')
          },
          paymentStatus: 'paid',
          diagnosis: status === 'completed' ? reason : null,
          prescription: status === 'completed' ? 'Thuốc theo đơn' : null,
          doctorNotes: status === 'completed' ? 'Theo dõi tình trạng' : null
        });

        appointments.push(appointment);
      }
    }

    // Lưu dữ liệu
    await Appointment.insertMany(appointments);
    console.log(`✅ Created ${appointments.length} appointments`);

    console.log('\n📊 Summary:');
    console.log(`   Patients: ${patients.length}`);
    console.log(`   Doctors: ${doctors.length}`);
    console.log(`   Appointments: ${appointments.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedAppointments();
