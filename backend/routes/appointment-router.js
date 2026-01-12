import express from 'express';
import { getAppointments, createAppointment } from '../controllers/appointment_controller.js';

const router = express.Router();

// Lấy danh sách lịch hẹn
router.get('/', getAppointments);
// Tạo mới lịch hẹn
router.post('/', createAppointment);

export default router;
