import mongoose from 'mongoose';
import User from './models/User_Model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seedPatients = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emr');
    console.log('Connected to MongoDB');

    // Create 20 patients with exact names and patient codes from the patient list
    const patients = [
      {
        name: 'Nguyễn Văn An',
        email: 'nguyen.van.an@gmail.com',
        phone: '0912345678',
        gender: 'male',
        dateOfBirth: new Date('1990-01-15'),
        patientCode: 'BN001',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Trần Thị Bình',
        email: 'tran.thi.binh@gmail.com',
        phone: '0987654321',
        gender: 'female',
        dateOfBirth: new Date('1992-03-20'),
        patientCode: 'BN002',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Lê Văn Cường',
        email: 'le.van.cuong@gmail.com',
        phone: '0909123123',
        gender: 'male',
        dateOfBirth: new Date('1988-05-10'),
        patientCode: 'BN003',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Phạm Thị Dung',
        email: 'pham.thi.dung@gmail.com',
        phone: '0911000001',
        gender: 'female',
        dateOfBirth: new Date('1995-07-25'),
        patientCode: 'BN004',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Hoàng Minh Tuấn',
        email: 'hoang.minh.tuan@gmail.com',
        phone: '0910000000',
        gender: 'male',
        dateOfBirth: new Date('1991-09-12'),
        patientCode: 'BN005',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Vũ Thị Lan',
        email: 'vu.thi.lan@gmail.com',
        phone: '0910001234',
        gender: 'female',
        dateOfBirth: new Date('1993-11-08'),
        patientCode: 'BN006',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Đặng Văn Hùng',
        email: 'dang.van.hung@gmail.com',
        phone: '0910002468',
        gender: 'male',
        dateOfBirth: new Date('1989-02-14'),
        patientCode: 'BN007',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Bùi Thị Mai',
        email: 'bui.thi.mai@gmail.com',
        phone: '0910003702',
        gender: 'female',
        dateOfBirth: new Date('1994-04-28'),
        patientCode: 'BN008',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Phan Văn Quang',
        email: 'phan.van.quang@gmail.com',
        phone: '0910004936',
        gender: 'male',
        dateOfBirth: new Date('1987-06-30'),
        patientCode: 'BN009',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Đỗ Thị Hạnh',
        email: 'do.thi.hanh@gmail.com',
        phone: '0910006170',
        gender: 'female',
        dateOfBirth: new Date('1996-08-19'),
        patientCode: 'BN010',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Ngô Văn Phúc',
        email: 'ngo.van.phuc@gmail.com',
        phone: '0910007404',
        gender: 'male',
        dateOfBirth: new Date('1990-10-05'),
        patientCode: 'BN011',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Lý Thị Thu',
        email: 'ly.thi.thu@gmail.com',
        phone: '0910008638',
        gender: 'female',
        dateOfBirth: new Date('1992-12-22'),
        patientCode: 'BN012',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Trịnh Văn Sơn',
        email: 'trinh.van.son@gmail.com',
        phone: '0910009872',
        gender: 'male',
        dateOfBirth: new Date('1991-01-17'),
        patientCode: 'BN013',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Tạ Thị Kim',
        email: 'ta.thi.kim@gmail.com',
        phone: '0910011106',
        gender: 'female',
        dateOfBirth: new Date('1994-03-09'),
        patientCode: 'BN014',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Phùng Văn Tài',
        email: 'phung.van.tai@gmail.com',
        phone: '0910012340',
        gender: 'male',
        dateOfBirth: new Date('1988-07-11'),
        patientCode: 'BN015',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Lâm Thị Hoa',
        email: 'lam.thi.hoa@gmail.com',
        phone: '0910013574',
        gender: 'female',
        dateOfBirth: new Date('1993-09-15'),
        patientCode: 'BN016',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Vương Văn Khánh',
        email: 'vuong.van.khanh@gmail.com',
        phone: '0910014808',
        gender: 'male',
        dateOfBirth: new Date('1989-11-27'),
        patientCode: 'BN017',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Châu Thị Yến',
        email: 'chau.thi.yen@gmail.com',
        phone: '0910016042',
        gender: 'female',
        dateOfBirth: new Date('1996-02-20'),
        patientCode: 'BN018',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Kiều Văn Phong',
        email: 'kieu.van.phong@gmail.com',
        phone: '0910017276',
        gender: 'male',
        dateOfBirth: new Date('1987-04-03'),
        patientCode: 'BN019',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Lưu Thị Hương',
        email: 'luu.thi.huong@gmail.com',
        phone: '0910018510',
        gender: 'female',
        dateOfBirth: new Date('1991-06-13'),
        patientCode: 'BN020',
        role: 'patients',
        hashpassword: await bcrypt.hash('123456', 10),
      },
    ];

    // Insert patients
    await User.insertMany(patients);
    console.log(`✅ Created 20 patients with BN001-BN020`);

    await mongoose.connection.close();
    console.log('✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedPatients();
