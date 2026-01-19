import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User_Model.js';
import DoctorProfile from './models/DoctorProfile.js';
import Appointment from './models/Appointment.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function debugDoctorData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Lấy doctor user
    const doctorUser = await User.findOne({ email: 'dr.tranngoca@gmail.com' });
    console.log('\n👨‍⚕️ Doctor User:', {
      _id: doctorUser._id,
      email: doctorUser.email,
      role: doctorUser.role
    });

    // Tìm DoctorProfile của doctor này
    const doctorProfile = await DoctorProfile.findOne({ userId: doctorUser._id });
    console.log('\n🏥 Doctor Profile:', doctorProfile ? {
      _id: doctorProfile._id,
      userId: doctorProfile.userId,
      specialty: doctorProfile.specialty
    } : 'NOT FOUND');

    // Tìm appointments của doctor profile này
    if (doctorProfile) {
      const appointments = await Appointment.find({ doctorProfileId: doctorProfile._id });
      console.log('\n📋 Appointments for this doctor profile:', appointments.length);
      if (appointments.length > 0) {
        console.log('First appointment:', {
          _id: appointments[0]._id,
          doctorProfileId: appointments[0].doctorProfileId,
          patientInfo: appointments[0].patientInfo
        });
      }
    }

    // Tìm tất cả doctor profiles
    const allDoctorProfiles = await DoctorProfile.find({});
    console.log('\n📊 Total DoctorProfiles:', allDoctorProfiles.length);

    // Tìm appointments của tất cả
    const allAppointments = await Appointment.find({});
    console.log('📋 Total Appointments:', allAppointments.length);

    // Phân tích appointments theo doctorProfileId
    const appointmentsByDoctor = {};
    for (const apt of allAppointments) {
      const key = apt.doctorProfileId.toString();
      appointmentsByDoctor[key] = (appointmentsByDoctor[key] || 0) + 1;
    }
    
    console.log('\n📈 Appointments by DoctorProfile:');
    for (const [doctorId, count] of Object.entries(appointmentsByDoctor)) {
      const doc = allDoctorProfiles.find(d => d._id.toString() === doctorId);
      console.log(`  ${doctorId}: ${count} appointments (User: ${doc?.userId})`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

debugDoctorData();
