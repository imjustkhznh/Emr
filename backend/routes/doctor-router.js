import express from 'express';
import { getDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../controllers/doctor_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lấy danh sách bác sĩ
router.get('/', protectedRoute, getDoctors);

// Lấy chi tiết bác sĩ
router.get('/:id', protectedRoute, getDoctorById);

// Cập nhật bác sĩ
router.put('/:id', protectedRoute, updateDoctor);

// Xóa bác sĩ
router.delete('/:id', protectedRoute, deleteDoctor);

export default router;
