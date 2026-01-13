import mongoose from "mongoose";

const examinationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  examinationDate: {
    type: Date,
    default: Date.now
  },
  diagnosis: {
    type: String,
    required: true
  },
  symptoms: [String],
  findings: String,
  treatment: String,
  notes: String,
  status: {
    type: String,
    enum: ['completed', 'pending'],
    default: 'completed'
  },
  patientInfo: {
    name: String,
    patientCode: String,
    phone: String,
    dateOfBirth: Date,
    gender: String
  },
  doctorInfo: {
    name: String,
    specialty: String,
    phone: String
  }
}, { 
  timestamps: true 
});

const Examination = mongoose.model('Examination', examinationSchema);
export default Examination;
