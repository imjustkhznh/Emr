import axios from 'axios';

// Test credentials (giống như frontend login)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjRjM2FmMTkzZWFjMTFjZTg4YTYzNSIsImVtYWlsIjoiZG9jdG9yQGdtYWlsLmNvbSIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE3MzcwMzgyNzV9.OzaSg8TkH6YCKXFz4jf-k5m8A_L6e1S5_dU_YWDGEhA';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

async function test() {
  try {
    console.log('=== Testing Examination API ===\n');

    // 1. Get all users to find a patient
    console.log('1. Fetching patients...');
    const usersRes = await api.get('/user');
    const patients = usersRes.data.data;
    console.log(`Found ${patients.length} users`);
    
    const patient = patients[0];
    console.log(`Selected patient: ${patient.name} (ID: ${patient._id})\n`);

    // 2. Create examination
    console.log('2. Creating examination...');
    const examRes = await api.post('/examinations', {
      patientId: patient._id, // Use actual ObjectId
      diagnosis: 'Cúm thường',
      symptoms: ['Sốt cao', 'Ho', 'Mệt mỏi'],
      findings: 'Viêm họng',
      treatment: 'Thuốc kháng virus',
      notes: 'Theo dõi trong 1 tuần',
      status: 'completed'
    });
    
    console.log('✅ Examination created successfully!');
    console.log(`Examination ID: ${examRes.data.data._id}`);
    console.log(`Diagnosis: ${examRes.data.data.diagnosis}\n`);

    // 3. Get all examinations
    console.log('3. Fetching all examinations...');
    const allRes = await api.get('/examinations');
    console.log(`✅ Found ${allRes.data.data.length} examinations\n`);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

test();
