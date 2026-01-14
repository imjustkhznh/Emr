import expess from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import router_auth from './routes/authRouter.js';
import router_user from './routes/userRouter.js';
import router_medical from './routes/medical-router.js';
import router_appointment from './routes/appointment-router.js';
import router_examination from './routes/examination-router.js';
import router_reports from './routes/reports-router.js';
import router_doctors from './routes/doctor-router.js';
import router_doctor_list from './routes/doctor_list_router.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = expess();
const PORT = process.env.PORT;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(expess.json());
app.use(cookieParser());
//public route
app.use('/api/auth', router_auth);
app.use('/api/user', router_user);

//private route
app.use('/api/medical', router_medical);
app.use('/api/appointments', router_appointment);
app.use('/api/examinations', router_examination);
app.use('/api/reports', router_reports);
app.use('/api/doctors', router_doctors);
app.use('/api/doctor-list', router_doctor_list);



connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server đang chạy trên cổng  ${PORT}`); 

})});
