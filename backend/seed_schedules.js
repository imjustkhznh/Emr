import mongoose from 'mongoose';
import Schedule from './models/Schedule.js';
import DoctorProfile from './models/DoctorProfile.js';
import dotenv from 'dotenv';

dotenv.config();

async function seedSchedules() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get a doctor profile
    const doctor = await DoctorProfile.findOne();
    if (!doctor) {
      console.log('❌ No doctor profile found');
      process.exit(1);
    }
    console.log(`👨‍⚕️ Using doctor: ${doctor.name}`);

    // Clear old schedules
    await Schedule.deleteMany({ doctor: doctor._id });
    console.log('🗑️ Cleared old schedules');

    // Generate schedules for the next 30 days
    const schedules = [];
    const today = new Date();
    
    const shifts = [
      { shiftName: 'Ca Sáng', startTime: '08:00', endTime: '12:00', room: '101', maxPatients: 10 },
      { shiftName: 'Ca Chiều', startTime: '13:00', endTime: '17:00', room: '101', maxPatients: 8 }
    ];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const dayOfWeek = date.getDay();
      const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      
      // Skip Sunday (dayOfWeek = 0)
      if (dayOfWeek === 0) continue;
      
      // Create schedule with shifts
      const schedule = new Schedule({
        doctor: doctor._id,
        date: date,
        dayOfWeek: dayNames[dayOfWeek],
        shifts: shifts,
        notes: `Lịch làm việc ngày ${date.toLocaleDateString('vi-VN')}`
      });

      schedules.push(schedule);
    }

    // Save all schedules
    await Schedule.insertMany(schedules);
    console.log(`✅ Created ${schedules.length} schedules`);

    console.log('\n📊 Summary:');
    console.log(`   Doctor: ${doctor.name}`);
    console.log(`   Schedules: ${schedules.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedSchedules();
