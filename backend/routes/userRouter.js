import express from 'express';
import{ getUserProfile, updateUserProfile, getAllUsers } from '../controllers/user_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
const router_user = express.Router();
router_user.get("/", getAllUsers); // Lấy danh sách tất cả users
router_user.get("/profile",protectedRoute,getUserProfile);
router_user.put("/profile",protectedRoute,updateUserProfile);
export default router_user;