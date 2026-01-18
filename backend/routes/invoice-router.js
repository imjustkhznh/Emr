import express from 'express';
import { 
  getAllInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoiceStatus,
  getInvoiceStats,
  deleteInvoice
} from '../controllers/invoice_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectedRoute, getAllInvoices);
router.get('/stats', protectedRoute, getInvoiceStats);
router.get('/:id', protectedRoute, getInvoiceById);
router.post('/', protectedRoute, createInvoice);
router.put('/:id', protectedRoute, updateInvoiceStatus);
router.put('/:id/status', protectedRoute, updateInvoiceStatus);
router.delete('/:id', protectedRoute, deleteInvoice);

export default router;
