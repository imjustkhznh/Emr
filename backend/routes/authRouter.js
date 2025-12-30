import express from 'express';
import { Sign_up,Sign_in } from '../controllers/auth_controller.js';

const router_auth = express.Router();
router_auth.post("/Sign_up",Sign_up);
router_auth.post("/Sign_in",Sign_in);
router_auth.post("/Sign_out",Sign_in);

export default router_auth; 