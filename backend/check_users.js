import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';
import User from './models/User_Model.js';

dotenv.config();

const checkUsers = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    // Lấy tổng số users
    const totalUsers = await User.countDocuments({});
    console.log(`📊 Total Users: ${totalUsers}`);

    // Phân loại theo role
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    console.log('\n📋 Users by Role:');
    roleStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });

    // Hiển thị chi tiết doctors
    console.log('\n👨‍⚕️ Doctors:');
    const doctors = await User.find({ role: 'doctor' }).select('name email phone');
    doctors.forEach((doc, i) => {
      console.log(`   ${i + 1}. ${doc.name} (${doc.email}) - ${doc.phone}`);
    });

    // Hiển thị chi tiết patients
    console.log('\n👥 Patients:');
    const patients = await User.find({ role: 'patients' }).select('name email phone').limit(10);
    patients.forEach((pat, i) => {
      console.log(`   ${i + 1}. ${pat.name} (${pat.email}) - ${pat.phone}`);
    });
    if (patients.length === 10) {
      const totalPatients = await User.countDocuments({ role: 'patients' });
      console.log(`   ... và ${totalPatients - 10} bệnh nhân khác`);
    }

    // Hiển thị chi tiết Nurses
    console.log('\n💉 Nurses:');
    const nurses = await User.find({ role: 'Nurse' }).select('name email phone');
    if (nurses.length > 0) {
      nurses.forEach((nurse, i) => {
        console.log(`   ${i + 1}. ${nurse.name} (${nurse.email}) - ${nurse.phone}`);
      });
    } else {
      console.log('   (None)');
    }

    // Hiển thị chi tiết Admins
    console.log('\n🔑 Admins:');
    const admins = await User.find({ role: 'Admin' }).select('name email phone');
    if (admins.length > 0) {
      admins.forEach((admin, i) => {
        console.log(`   ${i + 1}. ${admin.name} (${admin.email}) - ${admin.phone}`);
      });
    } else {
      console.log('   (None)');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkUsers();
