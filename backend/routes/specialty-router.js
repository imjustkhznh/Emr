import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import {
  getAllSpecialties,
  getSpecialtyById,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty
} from '../controllers/specialty_controller.js';

const router = express.Router();

router.get('/', getAllSpecialties);
router.get('/:id', getSpecialtyById);
router.post('/', protectedRoute, createSpecialty);
router.put('/:id', protectedRoute, updateSpecialty);
router.delete('/:id', protectedRoute, deleteSpecialty);

export default router;
