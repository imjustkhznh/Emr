import expess from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config.js';
import router_auth from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = expess();
const PORT = process.env.PORT;
app.use(expess.json());
app.use(cookieParser());
//public route
app.use('/api/auth', router_auth);
//private route




connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server đang chạy trên cổng  ${PORT}`); 

})});
