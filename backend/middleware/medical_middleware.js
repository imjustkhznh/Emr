export const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if(!req.user){
                return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
            }
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Bạn không thể thục hiện thao tác trên' });
            }
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' ,error: error.message});
            
        }
    }
}
export const isDoctorRole = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
        }
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Bác sĩ mới được thực hiện thao tác này ' });
        }
        next();
    } catch (error) {
         return res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' ,error: error.message});
            
    }
}
export const isPatientRole = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
        }
        if (req.user.role !== 'patient') {
            return res.status(403).json({ message: 'Bệnh nhân mới được thực hiện thao tác này ' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' ,error: error.message});
    }
}
export const isAdminRole = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
        }
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Quản trị viên mới được thực hiện thao tác này ' });
        }
        next();

    } catch (error) {
        return res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' ,error: error.message});
    }
}