import User from '../models/User_Model.js';
import DoctorProfile from '../models/DoctorProfile.js';

// Lấy danh sách tất cả bác sĩ
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-hashpassword');
    
    // Lấy thêm thông tin từ DoctorProfile
    const doctorsWithProfile = await Promise.all(
      doctors.map(async (doctor) => {
        const profile = await DoctorProfile.findOne({ userId: doctor._id });
        return {
          ...doctor.toObject(),
          profile: profile || {}
        };
      })
    );

    res.status(200).json({
      success: true,
      message: 'Lấy danh sách bác sĩ thành công',
      data: doctorsWithProfile
    });
  } catch (error) {
    console.error('Error in getDoctors:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Lấy chi tiết 1 bác sĩ
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await User.findById(id).select('-hashpassword');
    
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({
        success: false,
        message: 'Bác sĩ không tồn tại'
      });
    }

    const profile = await DoctorProfile.findOne({ userId: id });

    res.status(200).json({
      success: true,
      data: {
        ...doctor.toObject(),
        profile: profile || {}
      }
    });
  } catch (error) {
    console.error('Error in getDoctorById:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Cập nhật thông tin bác sĩ
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, ...profileData } = req.body;

    // Cập nhật User
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phone, email },
      { new: true }
    ).select('-hashpassword');

    // Cập nhật DoctorProfile
    if (Object.keys(profileData).length > 0) {
      await DoctorProfile.findOneAndUpdate(
        { userId: id },
        { ...profileData, name, phone, email },
        { new: true, upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin bác sĩ thành công',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error in updateDoctor:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Xóa bác sĩ
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    // Xóa Doctor Profile trước
    await DoctorProfile.findOneAndDelete({ userId: id });

    // Xóa User
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'Bác sĩ không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa bác sĩ thành công',
      data: deletedUser
    });
  } catch (error) {
    console.error('Error in deleteDoctor:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};
