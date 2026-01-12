import bcrypt from 'bcrypt';
import User from '../models/User_Model.js';
import { createAccessToken,createrefreshToken,saveRefreshToken } from '../utils/jwt.js';
export const Sign_up= async(req,res)=>{
    try {
        const {email,password,name}=req.body;
        if(!email || !password || !name){
            return res.status(400).json({message:"Vui lòng điền đầy đủ thông tin"});
        }
         const duplicateUser = await User.findOne({ email });
        if (duplicateUser) {
            return res.status(409).json({ message: "Email đã được sử dụng" });
        }   
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);
        await User.create({
            email,
            hashpassword,
            name,
        });
        return res.status(201).json({message:"Đăng ký thành công"});

    } catch (error) {
        console.error("Lỗi đăng ký người dùng:", error);
        return res.status(500).json({message:"Lỗi máy chủ, vui lòng thử lại sau"});
    }

}
export const Sign_in= async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log("Sign_in request:", {email, password});
        if(!email || !password){
            return res.status(400).json({message:"Vui lòng điền đầy đủ thông tin"});
        }
        const user = await User.findOne({ email });
        console.log("User found:", user ? `${user.email} (${user.role})` : "Not found");
        if (!user) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        if (!user.hashpassword && !user.passwordHash) {
            console.log("No password hash found");
            return res.status(401).json({ message: "Tài khoản không có mật khẩu, vui lòng liên hệ quản trị viên" });
        }
        const passwordHash = user.hashpassword || user.passwordHash;
        console.log("Comparing passwords...");
        const passwordMatch = await bcrypt.compare(password, passwordHash);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        const accessToken = createAccessToken(user);
        const refreshToken = createrefreshToken();
        await saveRefreshToken(user,refreshToken,res);
        return res.status(200).json({
            message:`User ${user.name} đăng nhập thành công`,accessToken});

    } catch (error) {
        console.error("Lỗi đăng nhập người dùng:", error);
        return res.status(500).json({message:"Lỗi máy chủ, vui lòng thử lại sau"});
    }
};
export const Sign_out= async(req,res)=>{
    try {
        // Lấy refresh token từ cookie
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: "Không tìm thấy token đăng xuất" });
        }

        // Xóa refresh token khỏi cơ sở dữ liệu
        await Session.deleteOne({ refreshToken: refreshToken });
        // Xóa cookie trên trình duyệt
        res.clearCookie('refreshToken');
        return res.status(204);
    } catch (error) {
         console.error("Lỗi khi logout:", error);
        return res.status(500).json({message:"Lỗi máy chủ, vui lòng thử lại sau"});
    }
};