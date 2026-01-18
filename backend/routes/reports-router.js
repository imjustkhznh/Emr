import express from 'express';
import { getDoctorReports, getReportsFromDB, getAllReports, getReportById } from '../controllers/reports_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lấy dữ liệu báo cáo cho bác sĩ (tính toán từ appointments)
router.get('/doctor', protectedRoute, getDoctorReports);

// Lấy báo cáo từ database
router.get('/db', protectedRoute, getReportsFromDB);

// Lấy tất cả báo cáo (lịch sử)
router.get('/all', protectedRoute, getAllReports);

// Lấy chi tiết báo cáo theo ID
router.get('/:reportId', protectedRoute, getReportById);

export default router;
