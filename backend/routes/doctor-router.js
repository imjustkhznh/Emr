import express from 'express';
import { getDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../controllers/doctor_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
import User from '../models/User_Model.js';
import DoctorProfile from '../models/DoctorProfile.js';

const router = express.Router();

// Lấy profile của doctor hiện tại - PHẢI TRƯỚC :id route
router.get('/profile', protectedRoute, async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    console.log('👨‍⚕️ Getting doctor profile for userId:', userId);
    
    const doctor = await User.findById(userId).select('-hashpassword');
    const profile = await DoctorProfile.findOne({ userId: userId });
    
    console.log('✅ Doctor found:', doctor?.email);
    console.log('✅ Profile found:', profile ? 'yes' : 'no');
    
    res.status(200).json({
      success: true,
      data: {
        ...doctor.toObject(),
        profile: profile || {}
      }
    });
  } catch (error) {
    console.error('❌ Error in /profile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Lấy danh sách bác sĩ
router.get('/', protectedRoute, getDoctors);

// Lấy chi tiết bác sĩ theo ID
router.get('/:id', protectedRoute, getDoctorById);

// Cập nhật bác sĩ
router.put('/:id', protectedRoute, updateDoctor);

// Xóa bác sĩ
router.delete('/:id', protectedRoute, deleteDoctor);

export default router;
