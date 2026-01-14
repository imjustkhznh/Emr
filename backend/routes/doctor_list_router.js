import express from 'express';
import { getAllDoctors, getDoctorById, updateDoctor, deleteDoctor, createDoctor } from '../controllers/doctor_list_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (có thể xóa protectedRoute nếu không cần auth)
router.get('/', protectedRoute, getAllDoctors);
router.get('/:id', protectedRoute, getDoctorById);
router.post('/', protectedRoute, createDoctor);
router.put('/:id', protectedRoute, updateDoctor);
router.delete('/:id', protectedRoute, deleteDoctor);

export default router;
