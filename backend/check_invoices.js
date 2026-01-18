import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Invoice from './models/Invoice.js';

async function checkInvoices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const invoices = await Invoice.find().limit(3);
    
    console.log('\n📋 Sample Invoices:');
    invoices.forEach((inv, idx) => {
      console.log(`\n--- Invoice ${idx + 1} ---`);
      console.log(`ID: ${inv._id}`);
      console.log(`Invoice #: ${inv.invoiceNumber}`);
      console.log(`Patient Name: ${inv.patientName}`);
      console.log(`Due Date: ${inv.dueDate}`);
      console.log(`Total: ${inv.total}`);
      console.log(`Status: ${inv.status}`);
    });

    // Check distinct due dates
    const dueDates = await Invoice.distinct('dueDate');
    console.log(`\n📅 Unique Due Dates Count: ${dueDates.length}`);
    console.log('First 5 due dates:', dueDates.slice(0, 5).map(d => new Date(d).toLocaleDateString('vi-VN')));

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkInvoices();
