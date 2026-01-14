import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.config.js';
import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';

dotenv.config();

const seedDoctors = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Danh sách bác sĩ mẫu với thông tin chi tiết
    const doctorList = [
      {
        name: 'PGS.TS. Trần Ngọc Anh',
        email: 'dr.tranngoca@gmail.com',
        password: 'doctor123',
        phone: '0901234567',
        specialty: 'Nội tổng quát',
        experience: 18,
        bio: 'Phó Giáo sư, Tiến sĩ chuyên khoa Nội tổng quát, 18 năm kinh nghiệm tại Bệnh viện Bạch Mai. Chuyên điều trị các bệnh mãn tính, tiểu đường, huyết áp cao.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Bạch Mai'
      },
      {
        name: 'TS. Nguyễn Minh Tuấn',
        email: 'dr.nguyenminhtu@gmail.com',
        password: 'doctor123',
        phone: '0902234567',
        specialty: 'Tim mạch',
        experience: 15,
        bio: 'Tiến sĩ chuyên khoa Tim mạch, bác sĩ huyện cấp. 15 năm điều trị các bệnh tim mạch, suy tim, rối loạn nhịp tim. Có chứng chỉ can thiệp tim mạch quốc tế.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Trung ương Quân đội 108'
      },
      {
        name: 'BS.CKI. Lê Hương Giang',
        email: 'dr.lehuongg@gmail.com',
        password: 'doctor123',
        phone: '0903234567',
        specialty: 'Hô hấp',
        experience: 12,
        bio: 'Bác sĩ chuyên khoa I về Hô hấp, 12 năm kinh nghiệm. Chuyên gia trong điều trị hen suyễn, bệnh phổi tắc nghẽn mãn tính (COPD), lao phổi. Tốt nghiệp Đại học Y Hà Nội.',
        degree: 'Bác sĩ chuyên khoa I',
        hospital: 'Bệnh viện Phổi Trung ương'
      },
      {
        name: 'TS. Phạm Văn Thắng',
        email: 'dr.phamvanthan@gmail.com',
        password: 'doctor123',
        phone: '0904234567',
        specialty: 'Tiêu hóa',
        experience: 14,
        bio: 'Tiến sĩ chuyên khoa Tiêu hóa, bác sĩ có kinh nghiệm 14 năm. Chuyên điều trị viêm dạ dày, loét dạ dày, polyp đại tràng, gan nhiễm mỡ. Có chứng chỉ nội soi đường tiêu hóa.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Đại học Y Hà Nội'
      },
      {
        name: 'BS.CKI. Đặng Thị Hương',
        email: 'dr.danghuong@gmail.com',
        password: 'doctor123',
        phone: '0905234567',
        specialty: 'Thần kinh',
        experience: 11,
        bio: 'Bác sĩ chuyên khoa I Thần kinh, 11 năm điều trị các bệnh thần kinh. Chuyên gia về đau đầu, chứng mất ngủ, tai biến mạch não, Parkinson. Tốt nghiệp Đại học Y Hà Nội.',
        degree: 'Bác sĩ chuyên khoa I',
        hospital: 'Bệnh viện Bạch Mai'
      },
      {
        name: 'PGS.TS. Vũ Quang Thọ',
        email: 'dr.vuquangtho@gmail.com',
        password: 'doctor123',
        phone: '0906234567',
        specialty: 'Ngoại tổng quát',
        experience: 20,
        bio: 'Phó Giáo sư, Tiến sĩ chuyên khoa Ngoại tổng quát, 20 năm kinh nghiệm phẫu thuật. Chuyên gia về phẫu thuật ung thư, phẫu thuật tiêu hóa, phẫu thuật cấp cứu. Huấn luyện viên quốc gia.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện K - Trung tâm Ung bướu'
      },
      {
        name: 'BS.CKI. Hoàng Thị Minh Hương',
        email: 'dr.hoangminh@gmail.com',
        password: 'doctor123',
        phone: '0907234567',
        specialty: 'Sản phụ khoa',
        experience: 10,
        bio: 'Bác sĩ chuyên khoa I Sản phụ khoa, 10 năm kinh nghiệm. Chuyên gia về chăm sóc thai kỳ, kỹ thuật siêu âm sản phụ khoa, điều trị vô sinh. Có kinh nghiệm đỡ đẻ tự nhiên và mổ lấy thai.',
        degree: 'Bác sĩ chuyên khoa I',
        hospital: 'Bệnh viện Phụ sản Trung ương'
      },
      {
        name: 'TS. Ngô Đức Minh',
        email: 'dr.ngoducm@gmail.com',
        password: 'doctor123',
        phone: '0908234567',
        specialty: 'Nhi',
        experience: 13,
        bio: 'Tiến sĩ chuyên khoa Nhi, 13 năm điều trị các bệnh nhi khoa. Chuyên gia về các bệnh lây nhiễm ở trẻ em, dinh dưỡng, phát triển trẻ. Có chứng chỉ quốc tế về chăm sóc sơ sinh.',
        degree: 'Tiến sĩ Y học',
        hospital: 'Bệnh viện Nhi Trung ương'
      }
    ];

    console.log(`\n📝 Seeding ${doctorList.length} doctors...`);

    for (const doctorData of doctorList) {
      try {
        // Kiểm tra email đã tồn tại
        const existingUser = await User.findOne({ email: doctorData.email });
        if (existingUser) {
          console.log(`⏭️  Doctor ${doctorData.email} already exists, skipping...`);
          continue;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(doctorData.password, salt);

        // Tạo user
        const newUser = new User({
          name: doctorData.name,
          email: doctorData.email,
          hashpassword: hashPassword,
          phone: doctorData.phone,
          role: 'doctor',
          dateOfBirth: new Date('1980-01-01'),
          gender: 'male'
        });

        const savedUser = await newUser.save();
        console.log(`✅ Created doctor user: ${doctorData.email}`);

        // Tạo doctor profile
        const doctorProfile = new DoctorProfile({
          userId: savedUser._id,
          name: doctorData.name,
          specialty: doctorData.specialty,
          experience: doctorData.experience,
          bio: doctorData.bio,
          phone: doctorData.phone,
          email: doctorData.email,
          status: 'active'
        });

        await doctorProfile.save();
        console.log(`✅ Created doctor profile for: ${doctorData.name}`);

      } catch (error) {
        console.error(`❌ Error creating doctor ${doctorData.email}:`, error.message);
      }
    }

    // Hiển thị danh sách bác sĩ vừa tạo
    const doctors = await User.find({ role: 'doctor' });
    console.log(`\n👨‍⚕️ Total doctors in database: ${doctors.length}`);
    
    console.log('\n📋 Doctor List:');
    doctors.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name} (${doc.email}) - ${doc.phone}`);
    });

    console.log('\n✨ Seed doctors completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDoctors();
