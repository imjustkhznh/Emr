import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function checkPatients() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Kiểm tra collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('📋 Available collections:', collectionNames);

    // Kiểm tra patients collection
    if (collectionNames.includes('patients')) {
      const patientsCollection = mongoose.connection.db.collection('patients');
      const count = await patientsCollection.countDocuments();
      console.log(`\n✅ Found 'patients' collection with ${count} documents`);

      const sample = await patientsCollection.findOne();
      console.log('\n📄 Sample patient document:');
      console.log(JSON.stringify(sample, null, 2));
    } else {
      console.log('\n❌ No "patients" collection found');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkPatients();
