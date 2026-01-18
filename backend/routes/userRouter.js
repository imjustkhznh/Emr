import express from 'express';
import{ getUserProfile, updateUserProfile, getAllUsers, updateUser, deleteUser } from '../controllers/user_controller.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
const router_user = express.Router();
router_user.get("/", getAllUsers); // Lấy danh sách tất cả users
router_user.get("/profile",protectedRoute,getUserProfile);
router_user.put("/profile",protectedRoute,updateUserProfile);
router_user.put("/:id", protectedRoute, updateUser);
router_user.delete("/:id", protectedRoute, deleteUser);
export default router_user;