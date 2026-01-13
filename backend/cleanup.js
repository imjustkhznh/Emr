import mongoose from 'mongoose';
import User from './models/User_Model.js';
import Examination from './models/Examination.js';
import dotenv from 'dotenv';

dotenv.config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emr');
    console.log('Connected to MongoDB');

    // Delete all examinations first (foreign key constraint)
    const deletedExams = await Examination.deleteMany({});
    console.log(`✅ Deleted ${deletedExams.deletedCount} examinations`);

    // Delete all patients except doctor and admin
    const deletedUsers = await User.deleteMany({ 
      role: { $nin: ['doctor', 'Admin'] } 
    });
    console.log(`✅ Deleted ${deletedUsers.deletedCount} patients/users`);

    await mongoose.connection.close();
    console.log('✅ Cleanup done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

cleanup();
