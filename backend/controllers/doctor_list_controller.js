import mongoose from 'mongoose';

// Define Doctor Schema for the 'doctor' collection
const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialty: String,
  experience: Number,
  bio: String,
  degree: String,
  hospital: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('doctor', doctorSchema);

// Lấy danh sách tất cả bác sĩ từ collection 'doctor'
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      message: 'Lấy danh sách bác sĩ thành công',
      data: doctors
    });
  } catch (error) {
    console.error('Error in getAllDoctors:', error);
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
    const doctor = await Doctor.findById(id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Bác sĩ không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lấy thông tin bác sĩ thành công',
      data: doctor
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

// Cập nhật bác sĩ
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Bác sĩ không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật bác sĩ thành công',
      data: doctor
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
    
    const doctor = await Doctor.findByIdAndDelete(id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Bác sĩ không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa bác sĩ thành công',
      data: doctor
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

// Tạo bác sĩ mới
export const createDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialty, experience, bio, degree, hospital } = req.body;
    
    if (!name || !email || !specialty) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp tên, email và chuyên khoa'
      });
    }

    const newDoctor = new Doctor({
      name,
      email,
      phone,
      specialty,
      experience,
      bio,
      degree,
      hospital,
      status: 'active'
    });

    const savedDoctor = await newDoctor.save();

    res.status(201).json({
      success: true,
      message: 'Tạo bác sĩ thành công',
      data: savedDoctor
    });
  } catch (error) {
    console.error('Error in createDoctor:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

export default { getAllDoctors, getDoctorById, updateDoctor, deleteDoctor, createDoctor };
