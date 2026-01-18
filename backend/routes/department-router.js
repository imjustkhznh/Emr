import express from 'express';
import { 
  getAllDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment 
} from '../controllers/department_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', protectedRoute, createDepartment);
router.put('/:id', protectedRoute, updateDepartment);
router.delete('/:id', protectedRoute, deleteDepartment);

export default router;
