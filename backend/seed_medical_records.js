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

    // Create medical records
    const diagnostics = [
      'Cảm cúm',
      'Viêm phổi',
      'Đau đầu',
      'Tiểu đường type 2',
      'Tăng huyết áp',
      'Viêm họng',
      'Dị ứng',
      'Loét dạ dày'
    ];

    const treatments = [
      'Uống thuốc theo đơn, nghỉ ngơi',
      'Kháng sinh, theo dõi tình trạng',
      'Giảm căng thẳng, uống thuốc',
      'Kiểm soát chế độ ăn, tập thể dục',
      'Theo dõi huyết áp hàng ngày',
      'Bôi thuốc, uống nước ấm',
      'Tránh thực phẩm gây dị ứng',
      'Ăn mềm, tránh cay nóng'
    ];

    const records = [];

    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i];
      
      // Create 2-3 medical records per patient
      const recordCount = Math.floor(Math.random() * 2) + 2;
      
      for (let j = 0; j < recordCount; j++) {
        const visitDate = new Date();
        visitDate.setDate(visitDate.getDate() - Math.floor(Math.random() * 30));
        
        const randomDiagnosis = diagnostics[Math.floor(Math.random() * diagnostics.length)];
        const randomTreatment = treatments[Math.floor(Math.random() * treatments.length)];
        
        const record = new MedicalRecord({
          patientId: patient._id,
          doctorId: new mongoose.Types.ObjectId('6964c3af193eac11ce88a635'), // Default doctor
          visitDate: visitDate,
          chiefComplaint: `Khám tổng quát định kỳ ngày ${visitDate.toLocaleDateString('vi-VN')}`,
          symptoms: ['Mệt mỏi', 'Đau cơ', 'Sốt nhẹ'],
          vitalSigns: {
            bloodPressure: {
              systolic: 110 + Math.floor(Math.random() * 20),
              diastolic: 70 + Math.floor(Math.random() * 15)
            },
            heartRate: 70 + Math.floor(Math.random() * 30),
            temperature: 36.8 + Math.random() * 1,
            weight: 60 + Math.floor(Math.random() * 20),
            height: 160 + Math.floor(Math.random() * 20)
          },
          diagnosis: randomDiagnosis,
          prescription: [{
            medicationName: randomDiagnosis,
            dosage: '1 viên',
            frequency: '3 lần/ngày',
            duration: '7 ngày',
            instructions: 'Uống trước hoặc sau bữa ăn'
          }],
          notes: randomTreatment,
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
