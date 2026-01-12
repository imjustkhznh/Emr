import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Appointment from './models/Appointment.js';

const MONGODB_URI = process.env.MONGODB_URI;

// Dữ liệu mẫu, cần thay patientId/doctorProfileId bằng id thực tế nếu có
const appointments = [
  {
    patientId: new mongoose.Types.ObjectId(),
    doctorProfileId: new mongoose.Types.ObjectId(),
    appointmentDate: new Date('2026-01-15'),
    appointmentTime: '09:00',
    reason: 'Khám tổng quát',
    status: 'pending',
    patientInfo: { name: 'Nguyễn Văn An', age: 30, phone: '0912345678', gender: 'Nam' },
    doctorInfo: { name: 'BS. Trần Văn B', specialty: 'Nội tổng quát' }
  },
  {
    patientId: new mongoose.Types.ObjectId(),
    doctorProfileId: new mongoose.Types.ObjectId(),
    appointmentDate: new Date('2026-01-16'),
    appointmentTime: '10:30',
    reason: 'Khám tim mạch',
    status: 'confirmed',
    patientInfo: { name: 'Trần Thị Bình', age: 25, phone: '0987654321', gender: 'Nữ' },
    doctorInfo: { name: 'BS. Lê Văn C', specialty: 'Tim mạch' }
  },
  {
    patientId: new mongoose.Types.ObjectId(),
    doctorProfileId: new mongoose.Types.ObjectId(),
    appointmentDate: new Date('2026-01-17'),
    appointmentTime: '14:00',
    reason: 'Khám hô hấp',
    status: 'completed',
    patientInfo: { name: 'Lê Văn Cường', age: 40, phone: '0909123123', gender: 'Nam' },
    doctorInfo: { name: 'BS. Phạm Thị D', specialty: 'Hô hấp' }
  },
  {
    patientId: new mongoose.Types.ObjectId(),
    doctorProfileId: new mongoose.Types.ObjectId(),
    appointmentDate: new Date('2026-01-18'),
    appointmentTime: '08:15',
    reason: 'Khám tiêu hóa',
    status: 'cancelled',
    patientInfo: { name: 'Phạm Thị Dung', age: 35, phone: '0911000001', gender: 'Nữ' },
    doctorInfo: { name: 'BS. Hoàng Minh T', specialty: 'Tiêu hóa' }
  },
  {
    patientId: new mongoose.Types.ObjectId(),
    doctorProfileId: new mongoose.Types.ObjectId(),
    appointmentDate: new Date('2026-01-19'),
    appointmentTime: '11:45',
    reason: 'Khám mắt',
    status: 'pending',
    patientInfo: { name: 'Hoàng Minh Tuấn', age: 28, phone: '091000000', gender: 'Nam' },
    doctorInfo: { name: 'BS. Vũ Thị L', specialty: 'Mắt' }
  }
];

async function seedAppointments() {
  await mongoose.connect(MONGODB_URI);
  await Appointment.deleteMany({});
  await Appointment.insertMany(appointments);
  console.log('Đã thêm 5 lịch hẹn mẫu vào appointments');
  await mongoose.disconnect();
}

seedAppointments().catch(console.error);
