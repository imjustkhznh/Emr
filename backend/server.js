import expess from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';
import router_auth from './routes/authRouter.js';
import router_user from './routes/userRouter.js';
import router_medical from './routes/medical-router.js';
import router_appointment from './routes/appointment-router.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = expess();
const PORT = process.env.PORT;
app.use(expess.json());
app.use(cookieParser());
//public route
app.use('/api/auth', router_auth);
app.use('/api/user', router_user);

//private route
app.use('/api/medical', router_medical);
app.use('/api/appointments', router_appointment);



connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server đang chạy trên cổng  ${PORT}`); 

})});
