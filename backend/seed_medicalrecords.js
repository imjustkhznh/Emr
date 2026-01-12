import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// ID của bác sĩ đang đăng nhập
const DOCTOR_ID = '6964c3af193eac11ce88a635';

const medicalRecordSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  status: String,
  assignedDoctors: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now }
}, { collection: 'medicalrecords' });
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

const patients = [
  { name: 'Nguyễn Văn An', age: 30, gender: 'Nam', phone: '0912345678', status: 'chua_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Trần Thị Bình', age: 25, gender: 'Nữ', phone: '0987654321', status: 'da_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Lê Văn Cường', age: 40, gender: 'Nam', phone: '0909123123', status: 'dang_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Phạm Thị Dung', age: 35, gender: 'Nữ', phone: '0911000001', status: 'da_huy', assignedDoctors: [DOCTOR_ID] },
  { name: 'Hoàng Minh Tuấn', age: 28, gender: 'Nam', phone: '091000000', status: 'chua_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Vũ Thị Lan', age: 32, gender: 'Nữ', phone: '091001234', status: 'dang_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Đặng Văn Hùng', age: 45, gender: 'Nam', phone: '091002468', status: 'da_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Bùi Thị Mai', age: 29, gender: 'Nữ', phone: '091003702', status: 'da_huy', assignedDoctors: [DOCTOR_ID] },
  { name: 'Phan Văn Quang', age: 38, gender: 'Nam', phone: '091004936', status: 'chua_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Đỗ Thị Hạnh', age: 34, gender: 'Nữ', phone: '091006170', status: 'dang_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Ngô Văn Phúc', age: 27, gender: 'Nam', phone: '091007404', status: 'da_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Lý Thị Thu', age: 31, gender: 'Nữ', phone: '091008638', status: 'da_huy', assignedDoctors: [DOCTOR_ID] },
  { name: 'Trịnh Văn Sơn', age: 36, gender: 'Nam', phone: '091009872', status: 'chua_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Tạ Thị Kim', age: 24, gender: 'Nữ', phone: '091011106', status: 'dang_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Phùng Văn Tài', age: 41, gender: 'Nam', phone: '091012340', status: 'da_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Lâm Thị Hoa', age: 33, gender: 'Nữ', phone: '091013574', status: 'da_huy', assignedDoctors: [DOCTOR_ID] },
  { name: 'Vương Văn Khánh', age: 39, gender: 'Nam', phone: '091014808', status: 'chua_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Châu Thị Yến', age: 26, gender: 'Nữ', phone: '091016042', status: 'dang_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Kiều Văn Phong', age: 37, gender: 'Nam', phone: '091017276', status: 'da_kham', assignedDoctors: [DOCTOR_ID] },
  { name: 'Lưu Thị Hương', age: 29, gender: 'Nữ', phone: '091018510', status: 'da_huy', assignedDoctors: [DOCTOR_ID] }
];

async function seedMedicalRecords() {
  await mongoose.connect(MONGODB_URI);
  await MedicalRecord.deleteMany({});
  await MedicalRecord.insertMany(patients);
  console.log('Đã thêm 20 bệnh nhân mẫu vào medicalrecords');
  await mongoose.disconnect();
}

seedMedicalRecords().catch(console.error);
