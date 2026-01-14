import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';

dotenv.config();

// Define Doctor Schema inline for this seed
const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialty: String,
  experience: Number,
  bio: String,
  degree: String,
  hospital: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const DoctorCollection = mongoose.model('doctor', doctorSchema);

const seedDoctorCollection = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Danh sách bác sĩ mẫu
    const doctorList = [
      {
        name: 'PGS.TS. Trần Ngọc Anh',
        email: 'dr.tranngoca@gmail.com',
        phone: '0901234567',
        specialty: 'Nội tổng quát',
        experience: 18,
        bio: 'Phó Giáo sư, Tiến sĩ chuyên khoa Nội tổng quát, 18 năm kinh nghiệm tại Bệnh viện Bạch Mai. Chuyên điều trị các bệnh mãn tính, tiểu đường, huyết áp cao.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Bạch Mai',
        status: 'active'
      },
      {
        name: 'TS. Nguyễn Minh Tuấn',
        email: 'dr.nguyenminhtu@gmail.com',
        phone: '0902234567',
        specialty: 'Tim mạch',
        experience: 15,
        bio: 'Tiến sĩ chuyên khoa Tim mạch, bác sĩ huyện cấp. 15 năm điều trị các bệnh tim mạch, suy tim, rối loạn nhịp tim. Có chứng chỉ can thiệp tim mạch quốc tế.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Trung ương Quân đội 108',
        status: 'active'
      },
      {
        name: 'BS.CKI. Lê Hương Giang',
        email: 'dr.lehuongg@gmail.com',
        phone: '0903234567',
        specialty: 'Hô hấp',
        experience: 12,
        bio: 'Bác sĩ chuyên khoa I về Hô hấp, 12 năm kinh nghiệm. Chuyên gia trong điều trị hen suyễn, bệnh phổi tắc nghẽn mãn tính (COPD), lao phổi. Tốt nghiệp Đại học Y Hà Nội.',
        degree: 'Bác sĩ chuyên khoa I',
        hospital: 'Bệnh viện Phổi Trung ương',
        status: 'active'
      },
      {
        name: 'TS. Phạm Văn Thắng',
        email: 'dr.phamvanthan@gmail.com',
        phone: '0904234567',
        specialty: 'Tiêu hóa',
        experience: 14,
        bio: 'Tiến sĩ chuyên khoa Tiêu hóa, bác sĩ có kinh nghiệm 14 năm. Chuyên điều trị viêm dạ dày, loét dạ dày, polyp đại tràng, gan nhiễm mỡ. Có chứng chỉ nội soi đường tiêu hóa.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Đại học Y Hà Nội',
        status: 'active'
      },
      {
        name: 'BS.CKI. Đặng Thị Hương',
        email: 'dr.danghuong@gmail.com',
        phone: '0905234567',
        specialty: 'Thần kinh',
        experience: 11,
        bio: 'Bác sĩ chuyên khoa I Thần kinh, 11 năm điều trị các bệnh thần kinh. Chuyên gia về đau đầu, chứng mất ngủ, tai biến mạch não, Parkinson. Tốt nghiệp Đại học Y Hà Nội.',
        degree: 'Bác sĩ chuyên khoa I',
        hospital: 'Bệnh viện Bạch Mai',
        status: 'active'
      },
      {
        name: 'PGS.TS. Vũ Quang Thọ',
        email: 'dr.vuquangtho@gmail.com',
        phone: '0906234567',
        specialty: 'Ngoại tổng quát',
        experience: 20,
        bio: 'Phó Giáo sư, Tiến sĩ chuyên khoa Ngoại tổng quát, 20 năm kinh nghiệm phẫu thuật. Chuyên gia về phẫu thuật ung thư, phẫu thuật tiêu hóa, phẫu thuật cấp cứu. Huấn luyện viên quốc gia.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện K - Trung tâm Ung bướu',
        status: 'active'
      },
      {
        name: 'BS.CKI. Hoàng Thị Minh Hương',
        email: 'dr.hoangminh@gmail.com',
        phone: '0907234567',
        specialty: 'Sản phụ khoa',
        experience: 10,
        bio: 'Bác sĩ chuyên khoa I Sản phụ khoa, 10 năm kinh nghiệm. Chuyên gia về chăm sóc thai kỳ, kỹ thuật siêu âm sản phụ khoa, điều trị vô sinh. Có kinh nghiệm đỡ đẻ tự nhiên và mổ lấy thai.',
        degree: 'Bác sĩ chuyên khoa I',
        hospital: 'Bệnh viện Phụ sản Trung ương',
        status: 'active'
      },
      {
        name: 'TS. Ngô Đức Minh',
        email: 'dr.ngoducm@gmail.com',
        phone: '0908234567',
        specialty: 'Nhi',
        experience: 13,
        bio: 'Tiến sĩ chuyên khoa Nhi, 13 năm điều trị các bệnh nhi khoa. Chuyên gia về các bệnh lây nhiễm ở trẻ em, dinh dưỡng, phát triển trẻ. Có chứng chỉ quốc tế về chăm sóc sơ sinh.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Nhi Trung ương',
        status: 'active'
      }
    ];

    console.log(`\n📝 Seeding ${doctorList.length} doctors into 'doctor' collection...`);

    // Xóa các bác sĩ cũ (optional)
    // await DoctorCollection.deleteMany({});

    // Chèn dữ liệu mới
    const result = await DoctorCollection.insertMany(doctorList);
    console.log(`✅ Inserted ${result.length} doctors`);

    // Hiển thị danh sách
    const allDoctors = await DoctorCollection.find();
    console.log(`\n👨‍⚕️ Total doctors in collection: ${allDoctors.length}`);
    
    console.log('\n📋 Doctor List:');
    allDoctors.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name}`);
      console.log(`   📧 Email: ${doc.email}`);
      console.log(`   📞 Phone: ${doc.phone}`);
      console.log(`   🏥 Specialty: ${doc.specialty}`);
      console.log(`   💼 Hospital: ${doc.hospital}\n`);
    });

    console.log('✨ Seed doctor collection completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDoctorCollection();
