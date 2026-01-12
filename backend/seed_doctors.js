import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
  email: String,
  hashpassword: String,
  name: String,
  phone: String,
  role: String
});

const User = mongoose.model('User', userSchema);

const doctors = [
  {
    email: 'doctor1@hospital.com',
    name: 'Bác sĩ Nguyễn Thế Hùng',
    phone: '0912345678',
    password: 'password123'
  },
  {
    email: 'doctor2@hospital.com',
    name: 'Bác sĩ Trần Đình Khoa',
    phone: '0987654321',
    password: 'password123'
  },
  {
    email: 'doctor3@hospital.com',
    name: 'Bác sĩ Lê Minh Tuấn',
    phone: '0909123123',
    password: 'password123'
  },
  {
    email: 'doctor4@hospital.com',
    name: 'Bác sĩ Phạm Văn Hiệp',
    phone: '0911000001',
    password: 'password123'
  },
  {
    email: 'doctor5@hospital.com',
    name: 'Bác sĩ Hoàng Văn Nam',
    phone: '0910000002',
    password: 'password123'
  },
  {
    email: 'doctor6@hospital.com',
    name: 'Bác sĩ Vũ Minh Châu',
    phone: '0910001234',
    password: 'password123'
  },
  {
    email: 'doctor7@hospital.com',
    name: 'Bác sĩ Đặng Quốc Khánh',
    phone: '0910002468',
    password: 'password123'
  },
  {
    email: 'doctor8@hospital.com',
    name: 'Bác sĩ Bùi Thị Thanh Hương',
    phone: '0910003702',
    password: 'password123'
  },
  {
    email: 'doctor9@hospital.com',
    name: 'Bác sĩ Phan Anh Tuấn',
    phone: '0910004936',
    password: 'password123'
  },
  {
    email: 'doctor10@hospital.com',
    name: 'Bác sĩ Đỗ Thị Lan Anh',
    phone: '0910006170',
    password: 'password123'
  }
];

async function seedDoctors() {
  await mongoose.connect(MONGODB_URI);
  
  // Xóa bác sĩ cũ (giữ lại doctor@gmail.com)
  await User.deleteMany({ 
    role: 'doctor',
    email: { $ne: 'doctor@gmail.com' }
  });
  
  // Tạo danh sách bác sĩ mới
  const createdDoctors = [];
  for (const doctor of doctors) {
    const hashedPassword = await bcrypt.hash(doctor.password, 10);
    const newDoctor = await User.create({
      email: doctor.email,
      hashpassword: hashedPassword,
      name: doctor.name,
      phone: doctor.phone,
      role: 'doctor'
    });
    createdDoctors.push({
      _id: newDoctor._id,
      email: newDoctor.email,
      name: newDoctor.name,
      phone: newDoctor.phone
    });
  }
  
  console.log('\n✅ Đã tạo danh sách bác sĩ:');
  console.log('════════════════════════════════════════════');
  createdDoctors.forEach((doc, idx) => {
    console.log(`\n${idx + 1}. ${doc.name}`);
    console.log(`   ID: ${doc._id}`);
    console.log(`   Email: ${doc.email}`);
    console.log(`   Phone: ${doc.phone}`);
    console.log(`   Password: password123`);
  });
  console.log('\n════════════════════════════════════════════');
  console.log(`\nTổng cộng: ${createdDoctors.length} bác sĩ`);
  
  await mongoose.disconnect();
}

seedDoctors().catch(console.error);
