import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User_Model.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function updatePatientPasswords() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Patient accounts to update
    const patients = [
      { email: 'ta.thi.kim@gmail.com', password: 'Patient@Kim123' },
      { email: 'chau.thi.yen@gmail.com', password: 'Patient@Yen456' },
      { email: 'trinh.van.son@gmail.com', password: 'Patient@Son789' },
      { email: 'kieu.van.phong@gmail.com', password: 'Patient@Phong101' },
      { email: 'luu.thi.huong@gmail.com', password: 'Patient@Huong202' }
    ];

    for (const patient of patients) {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(patient.password, salt);
      
      const result = await User.updateOne(
        { email: patient.email },
        { hashpassword: hashpassword }
      );

      if (result.matchedCount > 0) {
        console.log(`✅ Updated password for ${patient.email}`);
      } else {
        console.log(`⚠️ User ${patient.email} not found`);
      }
    }

    console.log('✨ All patient passwords updated successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error updating passwords:', error);
    process.exit(1);
  }
}

updatePatientPasswords();
