import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  // Thông tin báo cáo cơ bản
  reportName: {
    type: String,
    required: true,
    example: 'Báo cáo tháng 1/2026'
  },
  
  reportPeriod: {
    type: String,
    enum: ['week', 'month', 'quarter', 'year'],
    default: 'month'
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },

  // Thống kê bệnh nhân
  statistics: {
    totalPatients: {
      type: Number,
      default: 0
    },
    newPatients: {
      type: Number,
      default: 0
    },
    returningPatients: {
      type: Number,
      default: 0
    },
    returningRate: {
      type: Number,
      default: 0
    }
  },

  // Thống kê cuộc hẹn
  appointments: {
    total: {
      type: Number,
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    },
    pending: {
      type: Number,
      default: 0
    },
    confirmed: {
      type: Number,
      default: 0
    },
    cancelled: {
      type: Number,
      default: 0
    },
    noShow: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    cancellationRate: {
      type: Number,
      default: 0
    }
  },

  // Thống kê khám lâm sàng
  examinations: {
    total: {
      type: Number,
      default: 0
    },
    byDoctor: [{
      doctorName: String,
      doctorId: mongoose.Schema.Types.ObjectId,
      count: Number,
      specialty: String
    }],
    bySpecialty: [{
      specialty: String,
      count: Number,
      percentage: Number
    }]
  },

  // Thống kê bác sĩ
  doctors: {
    totalDoctors: {
      type: Number,
      default: 0
    },
    activeDoctors: {
      type: Number,
      default: 0
    },
    topPerformers: [{
      doctorId: mongoose.Schema.Types.ObjectId,
      doctorName: String,
      specialty: String,
      appointmentsHandled: Number,
      completionRate: Number,
      averageRating: Number,
      totalPatientsSeen: Number
    }]
  },

  // Dữ liệu hàng tháng
  monthlyData: [{
    month: String,
    appointmentCount: Number,
    completedCount: Number,
    newPatientsCount: Number,
    cancelledCount: Number,
    maxCapacity: {
      type: Number,
      default: 25
    }
  }],

  // Phân bố trạng thái
  statusDistribution: [{
    status: String,
    count: Number,
    percentage: Number,
    color: String
  }],

  // Chỉ số hiệu suất
  performance: {
    avgAppointmentTime: {
      type: Number,
      default: 30
    },
    averageRating: {
      type: Number,
      default: 4.8
    },
    patientSatisfaction: {
      type: Number,
      default: 0
    },
    systemUptime: {
      type: Number,
      default: 0
    }
  },

  // Phân tích chi tiết
  analysis: {
    peakAppointmentTimes: [String],
    busyDays: [String],
    specialtyDemand: [{
      specialty: String,
      demand: String,
      percentage: Number
    }],
    recommendations: [String]
  },

  // Metadata
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  generatedAt: {
    type: Date,
    default: Date.now
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  },

  isActive: {
    type: Boolean,
    default: true
  },

  notes: {
    type: String,
    maxlength: 1000
  }

}, {
  timestamps: true
});

// Index để tìm kiếm nhanh
reportSchema.index({ reportPeriod: 1, startDate: 1 });
reportSchema.index({ generatedAt: -1 });
reportSchema.index({ isActive: 1 });

const Report = mongoose.model('Report', reportSchema);

export default Report;
