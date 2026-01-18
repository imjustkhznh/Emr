import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import DoctorProfile from './models/DoctorProfile.js';
import User from './models/User_Model.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function checkDoctors() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const doctors = await DoctorProfile.find({}).populate('userId');
    console.log(`\n📋 Total doctors: ${doctors.length}\n`);

    doctors.forEach((doc, idx) => {
      console.log(`${idx + 1}. Doctor Profile ID: ${doc._id}`);
      console.log(`   Name: ${doc.userId?.name || 'NO USER'}`);
      console.log(`   Specialty: ${doc.specialty}`);
      console.log(`   UserId: ${doc.userId?._id || 'NULL'}`);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkDoctors();
