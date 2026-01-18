import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorProfile',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  dayOfWeek: {
    type: String,
    enum: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
  },
  shifts: [{
    shiftName: String,
    startTime: String,
    endTime: String,
    room: String,
    maxPatients: Number,
    currentPatients: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  notes: String,
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Schedule', scheduleSchema);
