import express from 'express';
import { 
  createExamination, 
  getExaminations, 
  getExaminationById, 
  updateExamination, 
  deleteExamination 
} from '../controllers/examination_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectedRoute, createExamination);
router.get('/', protectedRoute, getExaminations);
router.get('/:id', protectedRoute, getExaminationById);
router.put('/:id', protectedRoute, updateExamination);
router.delete('/:id', protectedRoute, deleteExamination);

export default router;
