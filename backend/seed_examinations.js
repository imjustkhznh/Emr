import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Examination from './models/Examination.js';
import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seedExaminations() {
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
    await Examination.deleteMany({});
    console.log('🗑️ Cleared old examinations');

    // Dữ liệu khám lâm sàng
    const examinationCases = [
      {
        diagnosis: 'Cảm cúm',
        symptoms: ['Sốt', 'Ho', 'Mệt mỏi', 'Đau họng'],
        findings: 'Hạch cổ sưng nhẹ, niêm mạc họng đỏ',
        treatment: 'Uống thuốc hạ sốt, kháng virus',
        notes: 'Tái khám nếu không hết sau 5 ngày'
      },
      {
        diagnosis: 'Viêm phổi',
        symptoms: ['Ho dai dẳng', 'Sốt cao', 'Khó thở', 'Đau ngực'],
        findings: 'X-quang phổi: viêm phổi trái, cần nhập viện',
        treatment: 'Sử dụng kháng sinh, nhập viện theo dõi',
        notes: 'Cấp cứu, cần theo dõi liên tục'
      },
      {
        diagnosis: 'Đau đầu căng thẳng',
        symptoms: ['Đau đầu kéo dài', 'Căng cơ cổ', 'Mệt mỏi'],
        findings: 'Não bộ bình thường, không phát hiện bất thường',
        treatment: 'Giảm căng thẳng, massage, yoga',
        notes: 'Tái khám nếu còn đau'
      },
      {
        diagnosis: 'Tiểu đường type 2',
        symptoms: ['Khát nước', 'Tiểu nhiều', 'Mệt mỏi', 'Giảm cân'],
        findings: 'Đường huyết: 240 mg/dL, cần kiểm soát chế độ ăn',
        treatment: 'Kiểm soát chế độ ăn, tập thể dục, dùng thuốc',
        notes: 'Kiểm tra định kỳ 1-2 lần/tháng'
      },
      {
        diagnosis: 'Tăng huyết áp',
        symptoms: ['Đau đầu', 'Chóng mặt', 'Đỏ mặt'],
        findings: 'Huyết áp: 160/100 mmHg, cần theo dõi hàng ngày',
        treatment: 'Dùng thuốc hạ huyết áp, giảm muối',
        notes: 'Theo dõi huyết áp sáng tối, tái khám 1 tháng'
      },
      {
        diagnosis: 'Viêm họng',
        symptoms: ['Đau họng', 'Ho', 'Sốt nhẹ', 'Khó nuốt'],
        findings: 'Niêm mạc họng đỏ sưng, hạch cổ sưng',
        treatment: 'Kháng sinh, bôi thuốc xịt họng',
        notes: 'Uống nước ấm, tránh cay nóng'
      },
      {
        diagnosis: 'Dị ứng (Mẩn ngứa)',
        symptoms: ['Ngứa, mẩn đỏ', 'Sưng tấy', 'Chảy nước'],
        findings: 'Mẩn đỏ rải rác trên thân và tay, không sốt',
        treatment: 'Bôi kem dưỡng da, uống chống dị ứng',
        notes: 'Tránh chất kích ứng, tái khám 1 tuần'
      },
      {
        diagnosis: 'Loét dạ dày',
        symptoms: ['Đau vùng bàn tay', 'Buồn nôn', 'Chán ăn'],
        findings: 'Nội soi: loét dạ dày cỡ 1cm, chảy máu',
        treatment: 'Thuốc bảo vệ dạ dày, tránh cay nóng',
        notes: 'Tái khám sau 2 tuần, nội soi lại'
      }
    ];

    const examinations = [];

    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      const doctor = doctors[i % doctors.length];
      const examinationCase = examinationCases[i % examinationCases.length];

      // Tạo 2-3 buổi khám cho mỗi bệnh nhân
      const examCount = Math.floor(Math.random() * 2) + 2;
      
      for (let j = 0; j < examCount; j++) {
        const examinationDate = new Date();
        examinationDate.setDate(examinationDate.getDate() - Math.floor(Math.random() * 60));
        examinationDate.setHours(Math.floor(Math.random() * 10) + 7, Math.floor(Math.random() * 60), 0);

        const examination = new Examination({
          patientId: patient._id,
          doctorId: doctor.userId._id,
          examinationDate: examinationDate,
          diagnosis: examinationCase.diagnosis,
          symptoms: examinationCase.symptoms,
          findings: examinationCase.findings,
          treatment: examinationCase.treatment,
          notes: examinationCase.notes,
          status: Math.random() > 0.1 ? 'completed' : 'pending',
          patientInfo: {
            name: patient.name,
            patientCode: patient.patientCode || `BN${patient._id.toString().slice(-6).toUpperCase()}`,
            phone: patient.phone,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender || (Math.random() > 0.5 ? 'Nam' : 'Nữ')
          },
          doctorInfo: {
            name: doctor.userId.name,
            specialty: doctor.specialty,
            phone: doctor.userId.phone
          }
        });

        examinations.push(examination);
      }
    }

    // Lưu dữ liệu
    await Examination.insertMany(examinations);
    console.log(`✅ Created ${examinations.length} examinations`);

    console.log('\n📊 Summary:');
    console.log(`   Patients: ${patients.length}`);
    console.log(`   Doctors: ${doctors.length}`);
    console.log(`   Examinations: ${examinations.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedExaminations();
