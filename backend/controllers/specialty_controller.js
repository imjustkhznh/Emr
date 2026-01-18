import Specialty from '../models/Specialty.js';

// Get all specialties
export const getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.json({ success: true, data: specialties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get specialty by ID
export const getSpecialtyById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ success: false, message: 'Chuyên khoa không tìm thấy' });
    }
    res.json({ success: true, data: specialty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create specialty
export const createSpecialty = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    
    const newSpecialty = new Specialty({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description,
      icon
    });
    
    await newSpecialty.save();
    res.status(201).json({ success: true, data: newSpecialty, message: 'Chuyên khoa được tạo thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update specialty
export const updateSpecialty = async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;
    
    const specialty = await Specialty.findByIdAndUpdate(
      req.params.id,
      { name, description, icon, isActive },
      { new: true }
    );
    
    if (!specialty) {
      return res.status(404).json({ success: false, message: 'Chuyên khoa không tìm thấy' });
    }
    
    res.json({ success: true, data: specialty, message: 'Chuyên khoa được cập nhật thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete specialty
export const deleteSpecialty = async (req, res) => {
  try {
    const specialty = await Specialty.findByIdAndDelete(req.params.id);
    
    if (!specialty) {
      return res.status(404).json({ success: false, message: 'Chuyên khoa không tìm thấy' });
    }
    
    res.json({ success: true, message: 'Chuyên khoa được xóa thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
