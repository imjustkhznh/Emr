import jwt from 'jsonwebtoken';

export const protectedRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Không có token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
};
