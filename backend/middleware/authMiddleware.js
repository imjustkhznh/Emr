import jwt from 'jsonwebtoken';
import User from '../models/User_Model.js';
export const protectedRoute = async (req, res, next) => {
    try {
        // Lấy token từ header Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
        }

        //xam định định token hợp lệ
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.error("Lỗi xác thực token:", err);
                return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
            }
      
        //tìm user tương ứng với token
        const user = await User.findById(decoded.userId).select('-hashpassword');//lấy thông tin user trừ mật khẩu
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        //trả user trong res
        req.user = user;
        next(); //cho phép tiếp tục đến route tiếp theo
          }) ;
    } catch (error) {
       console.error("Lỗi xác thực người dùng trong middleware:", error);
       return res.status(500).json({message:"Lỗi máy chủ, vui lòng thử lại sau"}); 
    }

}