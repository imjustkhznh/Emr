import mongoose from 'mongoose';
import Examination from './models/Examination.js';
import User from './models/User_Model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedExaminations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emr');
    console.log('Connected to MongoDB');

    // Get all patients (all users except doctors and admins)
    const patients = await User.find({ 
      role: { $nin: ['doctor', 'Admin'] } 
    }).limit(20);  // Limit to avoid too many examinations
    
    if (patients.length === 0) {
      console.error('No patient found');
      process.exit(1);
    }

    // Get first doctor
    const doctor = await User.findOne({ role: 'doctor' });
    if (!doctor) {
      console.error('No doctor found');
      process.exit(1);
    }

    console.log('Found', patients.length, 'patients');
    console.log('Doctor:', doctor.name, doctor._id);

    // Sample diagnoses
    const sampleData = [
      { diagnosis: 'Cúm thường', symptoms: ['Sốt cao 39°C', 'Ho liên tục', 'Đau họng'], findings: 'Viêm họng, tắc mũi', treatment: 'Thuốc kháng virus, Paracetamol', notes: 'Theo dõi trong 5-7 ngày', status: 'completed' },
      { diagnosis: 'Viêm phế quản cấp', symptoms: ['Ho có đờm', 'Khó thở nhẹ', 'Chán ăn'], findings: 'Âm phế quản bất thường, SpO2 94%', treatment: 'Kháng sinh, Dạo phế quản', notes: 'Uống thuốc đầy đủ, tái khám sau 1 tuần', status: 'completed' },
      { diagnosis: 'Đau đầu do căng thẳng', symptoms: ['Đau đầu ở phía sau', 'Căng cơ cổ', 'Mệt mỏi'], findings: 'Bình thường', treatment: 'Nghỉ ngơi, massage nhẹ', notes: 'Giảm stress, uống nước đủ', status: 'pending' },
      { diagnosis: 'Viêm họng cấp', symptoms: ['Đau họng', 'Nuốt khó', 'Sốt nhẹ'], findings: 'Họng đỏ, có mủ trắng', treatment: 'Kháng sinh, sử dụng spray họng', notes: 'Tái khám nếu không hết trong 3 ngày', status: 'completed' },
      { diagnosis: 'Cảm cúm đơn giản', symptoms: ['Chảy mũi', 'Hắt hơi', 'Sổ mũi'], findings: 'Bình thường', treatment: 'Nghỉ ngơi, uống nước ấm', notes: 'Các triệu chứng sẽ tự khỏi trong 1-2 tuần', status: 'completed' },
    ];

    // Create examinations for each patient
    const exams = patients.map((patient, idx) => {
      const sample = sampleData[idx % sampleData.length];
      return {
        patientId: patient._id,
        doctorId: doctor._id,
        diagnosis: sample.diagnosis,
        symptoms: sample.symptoms,
        findings: sample.findings,
        treatment: sample.treatment,
        notes: sample.notes,
        status: sample.status,
        patientInfo: {
          name: patient.name,
          patientCode: patient.patientCode,
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
        },
        doctorInfo: {
          name: doctor.name,
          specialty: 'General',
          phone: doctor.phone,
        },
      };
    });

    // Insert examinations
    await Examination.insertMany(exams);
    console.log(`✅ Created ${exams.length} examinations for ${patients.length} patients`);

    await mongoose.connection.close();
    console.log('✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedExaminations();
