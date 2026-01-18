import Department from '../models/Department.js';

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('headOfDepartment', 'name email')
      .populate('doctors', 'userId');
    
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách khoa phòng',
      error: error.message
    });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('headOfDepartment', 'name email')
      .populate('doctors');
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Khoa phòng không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin khoa phòng',
      error: error.message
    });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, code, description, phone, email, location } = req.body;

    const existingDept = await Department.findOne({ code });
    if (existingDept) {
      return res.status(400).json({
        success: false,
        message: 'Mã khoa phòng đã tồn tại'
      });
    }

    const department = new Department({
      name,
      code,
      description,
      phone,
      email,
      location
    });

    await department.save();

    res.status(201).json({
      success: true,
      message: 'Tạo khoa phòng thành công',
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo khoa phòng',
      error: error.message
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Khoa phòng không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật khoa phòng thành công',
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật khoa phòng',
      error: error.message
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Khoa phòng không tồn tại'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Xóa khoa phòng thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa khoa phòng',
      error: error.message
    });
  }
};
