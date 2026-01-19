import mongoose from 'mongoose';
import MedicalRecord from './models/medical_record.js';
import User from './models/User_Model.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedMedicalRecords() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get patients from users collection - filter out doctors and admins
    const patients = await User.find({ 
      $or: [
        { role: { $nin: ['doctor', 'admin', 'Admin'] } },
        { role: null }
      ]
    }).limit(20);
    
    if (patients.length === 0) {
      console.log('❌ No patients found');
      process.exit(1);
    }
    console.log(`👥 Found ${patients.length} patients`);

    // Clear old records
    await MedicalRecord.deleteMany({});
    console.log('🗑️ Cleared old medical records');

    // Create medical records with matched diagnosis and treatment
    const medicalCases = [
      {
        diagnosis: 'Cảm cúm',
        symptoms: ['Sốt', 'Ho', 'Mệt mỏi', 'Đau họng'],
        treatment: 'Uống thuốc hạ sốt, kháng virus theo đơn. Nghỉ ngơi đầy đủ, uống nước ấm. Theo dõi huyết áp hàng ngày. Nếu sốt không giảm sau 3 ngày hoặc có khó thở, đến bệnh viện ngay.'
      },
      {
        diagnosis: 'Viêm phổi',
        symptoms: ['Ho dai dẳng', 'Sốt cao', 'Khó thở', 'Đau ngực'],
        treatment: 'Sử dụng kháng sinh theo đơn (7-10 ngày). Nhập viện theo dõi nếu cần. Chụp X-quang phổi để xác nhận. Uống thuốc long đờm. Cần theo dõi oxy huyết, huyết áp liên tục.'
      },
      {
        diagnosis: 'Đau đầu căng thẳng',
        symptoms: ['Đau đầu kéo dài', 'Căng cơ cổ', 'Mệt mỏi'],
        treatment: 'Giảm căng thẳng bằng cách thư giãn, yoga. Uống thuốc giảm đau khi cần. Massage nhẹ nhàng vùng cổ và vai. Ngủ đủ 7-8 tiếng mỗi đêm.'
      },
      {
        diagnosis: 'Tiểu đường type 2',
        symptoms: ['Khát nước', 'Tiểu nhiều', 'Mệt mỏi', 'Giảm cân'],
        treatment: 'Kiểm soát chế độ ăn uống (tránh đường, tinh bột trắng). Tập thể dục 30 phút/ngày, 5 ngày/tuần. Uống thuốc theo đơn hàng ngày. Kiểm tra đường huyết 1-2 lần/tuần.'
      },
      {
        diagnosis: 'Tăng huyết áp',
        symptoms: ['Đau đầu', 'Chóng mặt', 'Đỏ mặt', 'Khó chịu ở tim'],
        treatment: 'Uống thuốc hạ huyết áp theo đơn mỗi sáng. THEO DÕI HUYẾT ÁP HÀNG NGÀY sáng và tối. Giảm muối trong ăn uống. Tập thể dục nhẹ. Giảm căng thẳng.'
      },
      {
        diagnosis: 'Viêm họng',
        symptoms: ['Đau họng', 'Ho', 'Sốt nhẹ', 'Khó nuốt'],
        treatment: 'Uống thuốc kháng sinh nếu do vi khuẩn (3-5 ngày). Bôi thuốc xịt hoặc ngậm viên họng. Uống nước ấm, mật ong. Tránh thức ăn cay nóng, cứng.'
      },
      {
        diagnosis: 'Dị ứng (Mẩn ngứa)',
        symptoms: ['Ngứa, mẩn đỏ', 'Sưng tấy', 'Chảy nước', 'Khó chịu'],
        treatment: 'Tránh chất kích ứng (xà phòng, hóa chất). Bôi kem dưỡng da ít nhất 2 lần/ngày. Uống thuốc chống dị ứng nếu ngứa nặng. Tìm nguyên nhân gây dị ứng và tránh.'
      },
      {
        diagnosis: 'Loét dạ dày',
        symptoms: ['Đau vùng bàn tay', 'Buồn nôn', 'Chán ăn', 'Nóng rát'],
        treatment: 'Uống thuốc bảo vệ dạ dày theo đơn. Ăn thường xuyên (5-6 bữa nhỏ/ngày). Tránh cay nót, cà phê, rượu. Giảm căng thẳng. Không tự dùng NSAIDs.'
      }
    ];

    const records = [];

    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      
      // Create 2-3 medical records per patient
      const recordCount = Math.floor(Math.random() * 2) + 2;
      
      for (let j = 0; j < recordCount; j++) {
        const visitDate = new Date();
        visitDate.setDate(visitDate.getDate() - Math.floor(Math.random() * 30));
        
        // Randomly select a medical case
        const medicalCase = medicalCases[Math.floor(Math.random() * medicalCases.length)];
        
        // Generate blood pressure based on diagnosis
        let systolic = 120;
        let diastolic = 80;
        if (medicalCase.diagnosis === 'Tăng huyết áp') {
          systolic = 140 + Math.floor(Math.random() * 30);
          diastolic = 90 + Math.floor(Math.random() * 20);
        } else if (medicalCase.diagnosis === 'Cảm cúm') {
          systolic = 115 + Math.floor(Math.random() * 15);
          diastolic = 75 + Math.floor(Math.random() * 10);
        }
        
        const record = new MedicalRecord({
          patientId: patient._id,
          doctorId: new mongoose.Types.ObjectId('6964c3af193eac11ce88a635'), // Default doctor
          visitDate: visitDate,
          chiefComplaint: `Khám vì: ${medicalCase.diagnosis}`,
          symptoms: medicalCase.symptoms,
          vitalSigns: {
            bloodPressure: {
              systolic: systolic,
              diastolic: diastolic
            },
            heartRate: 70 + Math.floor(Math.random() * 30),
            temperature: medicalCase.diagnosis === 'Cảm cúm' || medicalCase.diagnosis === 'Viêm phổi' ? 37.5 + Math.random() * 1.5 : 36.8 + Math.random() * 0.5,
            weight: 60 + Math.floor(Math.random() * 20),
            height: 160 + Math.floor(Math.random() * 20)
          },
          diagnosis: medicalCase.diagnosis,
          treatment: medicalCase.treatment,
          prescription: [{
            medicationName: medicalCase.diagnosis,
            dosage: '1-2 viên',
            frequency: '3 lần/ngày',
            duration: '7 ngày',
            instructions: 'Uống trước hoặc sau bữa ăn'
          }],
          notes: `Bệnh nhân được khám ngày ${visitDate.toLocaleDateString('vi-VN')}. Kết quả: ${medicalCase.diagnosis}. Tình trạng: ổn định.`,
          status: 'completed'
        });
        
        records.push(record);
      }
    }

    // Save all records
    await MedicalRecord.insertMany(records);
    console.log(`✅ Created ${records.length} medical records`);

    console.log('\n📊 Summary:');
    console.log(`   Patients: ${patients.length}`);
    console.log(`   Medical Records: ${records.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedMedicalRecords();
