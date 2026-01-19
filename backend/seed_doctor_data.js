import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User_Model.js';
import Appointment from './models/Appointment.js';
import Examination from './models/Examination.js';
import DoctorProfile from './models/DoctorProfile.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seedDoctorData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Lấy bác sĩ đầu tiên hoặc user đầu tiên làm bác sĩ
    let doctor = await User.findOne({ role: 'doctor' });
    if (!doctor) {
      doctor = await User.findOne({});
      console.log('⚠️ No doctor found, using first user');
    }

    const doctorId = doctor._id;
    const doctorName = doctor.name || 'Dr. Unknown';
    console.log(`👨‍⚕️ Using doctor: ${doctorName} (${doctorId})`);

    // Lấy tất cả patients (user không phải doctor/admin)
    const patients = await User.find({ 
      role: { $nin: ['doctor', 'admin', 'Admin'] } 
    }).limit(15);
    
    console.log(`👥 Found ${patients.length} patients`);

    // Xóa dữ liệu cũ của bác sĩ này
    await Appointment.deleteMany({ doctor: doctorId });
    await Examination.deleteMany({ doctor: doctorId });
    console.log('🗑️ Cleared old appointments and examinations');

    // Tạo fake appointments
    const appointments = [];
    const appointmentStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'];
    
    let doctorProfile = await DoctorProfile.findOne({ userId: doctorId });
    if (!doctorProfile) {
      console.log('⚠️ No doctor profile found, creating one...');
      doctorProfile = await DoctorProfile.create({
        userId: doctorId,
        specialization: 'General Medicine',
        licenseNumber: 'LIC-001',
        yearsOfExperience: 5
      });
    }

    const doctorProfileId = doctorProfile._id;
    console.log(`👨‍⚕️ Doctor Profile ID: ${doctorProfileId}`);
    
    for (let i = 0; i < 20; i++) {
      const patient = patients[i % patients.length];
      const daysFromNow = -10 + (i % 20);
      
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + daysFromNow);

      const hour = 8 + (i % 8);
      const minute = (i % 4) * 15; // 00, 15, 30, 45
      const appointmentTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

      const appointment = new Appointment({
        patientId: patient._id,
        doctorProfileId: doctorProfileId,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        reason: ['Khám tổng quát', 'Tái khám', 'Kiểm tra theo dõi', 'Đau đầu', 'Đau bụng'][i % 5],
        symptoms: [['Sốt', 'Ho'], ['Đau đầu'], ['Mệt mỏi'], ['Chóng mặt'], ['Buồn nôn']][i % 5],
        notes: `Appointment notes for patient ${patient.name}`,
        status: appointmentStatuses[i % appointmentStatuses.length],
        patientInfo: {
          name: patient.name,
          phone: '0123456789',
          gender: i % 2 === 0 ? 'Male' : 'Female'
        },
        doctorInfo: {
          name: doctorName,
          specialty: 'General Medicine',
          phone: '0987654321',
          userId: doctorId
        }
      });
      
      await appointment.save();
      appointments.push(appointment);
    }
    console.log(`✅ Created ${appointments.length} appointments`);

    // Tạo fake examinations
    const examinations = [];
    const examinationStatuses = ['completed', 'pending'];
    const departments = ['General', 'Cardiology', 'Dermatology', 'Neurology'];
    
    for (let i = 0; i < 25; i++) {
      const patient = patients[i % patients.length];
      const examinationDate = new Date();
      examinationDate.setDate(examinationDate.getDate() - (i % 30));

      const examination = new Examination({
        patientId: patient._id,
        doctorId: doctorId,
        examinationDate: examinationDate,
        symptoms: ['Sốt', 'Ho', 'Đau đầu', 'Chóng mặt', 'Mệt mỏi'][i % 5].split(','),
        diagnosis: ['Cảm cúm', 'Viêm đường hô hấp', 'Đau đầu căng thẳng', 'Buồn nôn', 'Mệt mỏi'][i % 5],
        treatment: 'Kê đơn thuốc và theo dõi',
        findings: `Patient is in stable condition. Examination findings recorded on ${new Date().toLocaleDateString()}`,
        status: examinationStatuses[i % examinationStatuses.length],
        notes: `Examination findings for patient ${patient.name}. Patient is stable. Continue treatment.`,
        patientInfo: {
          name: patient.name,
          phone: '0123456789',
          gender: i % 2 === 0 ? 'Male' : 'Female'
        },
        doctorInfo: {
          name: doctorName,
          specialty: 'General Medicine',
          phone: '0987654321',
          userId: doctorId
        }
      });
      
      await examination.save();
      examinations.push(examination);
    }
    console.log(`✅ Created ${examinations.length} examinations`);

    console.log('✨ All doctor data seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Doctor: ${doctorName}`);
    console.log(`   - Appointments: ${appointments.length}`);
    console.log(`   - Examinations: ${examinations.length}`);
    console.log(`   - Patients: ${patients.length}`);
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedDoctorData();
