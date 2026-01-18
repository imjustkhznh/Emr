import jwt from 'jsonwebtoken';
import User from '../models/User_Model.js';

export const protectedRoute = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('⚠️ No authorization header');
      return res.status(401).json({ message: 'Không có token' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id).select('-hashpassword');

      if (!user) {
        return res.status(401).json({ 
          message: 'User không tồn tại.'
        });
      }
      
      req.user = user;
      console.log('✅ req.user from DB:', {
        _id: req.user._id,
        email: req.user.email,
        role: req.user.role
      });
      next();
    } catch (tokenError) {
      // Token hết hạn hoặc không hợp lệ
      console.error('Token error:', tokenError.message);
      return res.status(401).json({ 
        message: 'Token không hợp lệ hoặc hết hạn',
        code: 'TOKEN_EXPIRED'
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Lỗi xác thực' });
  }
};
