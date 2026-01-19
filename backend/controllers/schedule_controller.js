import Schedule from '../models/Schedule.js';
import DoctorProfile from '../models/DoctorProfile.js';

export const getMySchedules = async (req, res) => {
  try {
    // Get doctorProfileId from authenticated user
    const userId = req.user.id;
    
    // Find doctor profile by userId
    const doctorProfile = await DoctorProfile.findOne({ userId });
    
    if (!doctorProfile) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy hồ sơ bác sĩ'
      });
    }
    
    const schedules = await Schedule.find({ doctor: doctorProfile._id })
      .sort({ date: 1 });
    
    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy lịch làm việc của tôi',
      error: error.message
    });
  }
};

export const getSchedulesByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const schedules = await Schedule.find({ doctor: doctorId })
      .populate('doctor', 'userId specialty');
    
    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy lịch làm việc',
      error: error.message
    });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('doctor', 'userId specialty')
      .sort({ date: 1 });
    
    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách lịch làm việc',
      error: error.message
    });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const { doctor, date, dayOfWeek, shifts, isRecurring, recurringPattern } = req.body;

    const schedule = new Schedule({
      doctor,
      date,
      dayOfWeek,
      shifts,
      isRecurring,
      recurringPattern
    });

    await schedule.save();

    res.status(201).json({
      success: true,
      message: 'Tạo lịch làm việc thành công',
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo lịch làm việc',
      error: error.message
    });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Lịch làm việc không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật lịch làm việc thành công',
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật lịch làm việc',
      error: error.message
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Lịch làm việc không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa lịch làm việc thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa lịch làm việc',
      error: error.message
    });
  }
};
