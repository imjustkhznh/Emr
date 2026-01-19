import express from 'express';
import { 
  getMySchedules,
  getSchedulesByDoctor,
  getAllSchedules, 
  createSchedule, 
  updateSchedule, 
  deleteSchedule 
} from '../controllers/schedule_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-schedules', protectedRoute, getMySchedules);
router.get('/', getAllSchedules);
router.get('/doctor/:doctorId', getSchedulesByDoctor);
router.post('/', protectedRoute, createSchedule);
router.put('/:id', protectedRoute, updateSchedule);
router.delete('/:id', protectedRoute, deleteSchedule);

export default router;
