import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
    unique: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorProfile',
    required: true
  },
  
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  
  isAnonymous: {
    type: Boolean,
    default: false
  },
  
  // Admin có thể ẩn review không phù hợp
  isVisible: {
    type: Boolean,
    default: true
  }
  
}, { 
  timestamps: true 
});

reviewSchema.index({ doctorProfileId: 1, isVisible: 1, createdAt: -1 });
reviewSchema.index({ patientId: 1 });

export default mongoose.model('Review', reviewSchema);