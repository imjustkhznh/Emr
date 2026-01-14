import express from 'express';
import { getDoctorReports } from '../controllers/reports_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lấy dữ liệu báo cáo cho bác sĩ
router.get('/doctor', protectedRoute, getDoctorReports);

export default router;
