import express from 'express';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointment_controller.js';

const router = express.Router();

// Lấy danh sách lịch hẹn
router.get('/', getAppointments);
// Tạo mới lịch hẹn
router.post('/', createAppointment);
// Cập nhật lịch hẹn
router.put('/:id', updateAppointment);
// Xóa lịch hẹn
router.delete('/:id', deleteAppointment);

export default router;
