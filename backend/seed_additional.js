import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Department from './models/Department.js';
import Invoice from './models/Invoice.js';
import Schedule from './models/Schedule.js';
import Specialty from './models/Specialty.js';
import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seedAdditionalData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Department.deleteMany({});
    await Invoice.deleteMany({});
    await Schedule.deleteMany({});
    await Specialty.deleteMany({});
    console.log('🗑️ Cleared old data');

    // Get users and doctors
    const users = await User.find({});
    const doctors = await DoctorProfile.find({}).populate('userId');
    
    console.log(`📋 Found ${users.length} users and ${doctors.length} doctors`);

    // Create Specialties
    const specialtyNames = ['Tim Mạch', 'Ngoại', 'Nội', 'Nhi', 'Phụ Sản', 'Tâm Thần'];
    const specialties = [];
    
    for (const name of specialtyNames) {
      const specialty = new Specialty({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description: `Chuyên khoa ${name} chuyên điều trị các bệnh liên quan.`,
        isActive: true
      });
      await specialty.save();
      specialties.push(specialty);
    }
    console.log(`✅ Created ${specialties.length} specialties`);

    // Create Departments
    const departments = [];
    const deptNames = [
      { name: 'Khoa Tim Mạch', code: 'TM001' },
      { name: 'Khoa Ngoại', code: 'NG001' },
      { name: 'Khoa Nội', code: 'N001' },
      { name: 'Khoa Nhi', code: 'NH001' },
      { name: 'Khoa Phụ Sản', code: 'PS001' }
    ];

    for (let dept of deptNames) {
      const newDept = new Department({
        name: dept.name,
        code: dept.code,
        description: `Khoa ${dept.name.toLowerCase()}`,
        phone: '0123456789',
        email: `${dept.code.toLowerCase()}@hospital.com`,
        location: `Tầng ${Math.floor(Math.random() * 5) + 1}`,
        doctors: doctors.slice(0, 3).map(d => d._id),
        status: 'active'
      });
      await newDept.save();
      departments.push(newDept);
    }
    console.log(`✅ Created ${departments.length} departments`);

    // Create Invoices
    const invoices = [];
    // Lấy tất cả users - sẽ dùng tên của họ làm bệnh nhân
    // Loại bỏ những user là doctor hoặc admin
    const patients = users.filter(u => !u.role || (u.role !== 'doctor' && u.role !== 'admin' && u.role !== 'Admin')).slice(0, 20);
    
    console.log(`📋 Found ${patients.length} patients from database`);
    
    const invoiceStatuses = ['paid', 'pending', 'overdue'];

    // Tạo tối đa 20 hóa đơn từ bệnh nhân
    const invoiceCount = Math.min(20, patients.length);
    
    for (let i = 0; i < invoiceCount; i++) {
      const patient = patients[i];
      const patientName = patient.name || 'Unknown Patient';
      const items = [
        { description: 'Khám bệnh', quantity: 1, unitPrice: 300000, amount: 300000 },
        { description: 'Xét nghiệm máu', quantity: 1, unitPrice: 500000, amount: 500000 },
        { description: 'Siêu âm', quantity: 1, unitPrice: 800000, amount: 800000 }
      ];
      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      const tax = subtotal * 0.1;
      
      // Tính ngày hết hạn khác nhau cho mỗi hóa đơn (15-45 ngày từ bây giờ)
      const daysUntilDue = 15 + (i % 30);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysUntilDue);
      
      // Tính ngày phát hành cách đây i ngày
      const issuedDate = new Date();
      issuedDate.setDate(issuedDate.getDate() - i);

      const invoice = new Invoice({
        invoiceNumber: `HĐ-2024-${String(i + 1).padStart(5, '0')}`,
        patient: patient ? patient._id : null,
        patientName: patientName,
        items,
        subtotal,
        tax,
        total: subtotal + tax,
        status: invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)],
        dueDate: dueDate,
        paidDate: Math.random() > 0.5 ? issuedDate : null,
        issuedDate: issuedDate
      });
      await invoice.save();
      invoices.push(invoice);
    }
    console.log(`✅ Created ${invoices.length} invoices`);

    // Create Schedules
    const schedules = [];
    const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
    
    for (let i = 0; i < doctors.length; i++) {
      for (let j = 0; j < 5; j++) {
        const shiftDate = new Date();
        shiftDate.setDate(shiftDate.getDate() + j);

        const schedule = new Schedule({
          doctor: doctors[i]._id,
          date: shiftDate,
          dayOfWeek: dayNames[j],
          shifts: [
            {
              shiftName: 'Ca Sáng',
              startTime: '08:00',
              endTime: '12:00',
              room: `Phòng ${i + 1}A`,
              maxPatients: 20,
              currentPatients: Math.floor(Math.random() * 15)
            },
            {
              shiftName: 'Ca Chiều',
              startTime: '14:00',
              endTime: '18:00',
              room: `Phòng ${i + 1}B`,
              maxPatients: 20,
              currentPatients: Math.floor(Math.random() * 15)
            }
          ],
          isRecurring: true,
          recurringPattern: 'weekly'
        });
        await schedule.save();
        schedules.push(schedule);
      }
    }
    console.log(`✅ Created ${schedules.length} schedules`);

    console.log('✅ All data seeded successfully');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedAdditionalData();
