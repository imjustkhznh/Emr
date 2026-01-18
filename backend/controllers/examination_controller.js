import Examination from '../models/Examination.js';
import User from '../models/User_Model.js';

export const createExamination = async (req, res) => {
  try {
    const { patientId, diagnosis, symptoms, findings, treatment, notes, status } = req.body;
    const doctorId = req.user?.userId || req.user?.id;

    if (!patientId) return res.status(400).json({ message: 'patientId là bắt buộc' });
    if (!diagnosis) return res.status(400).json({ message: 'diagnosis là bắt buộc' });

    // Lấy thông tin bệnh nhân
    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);

    const examination = new Examination({
      patientId,
      doctorId,
      diagnosis,
      symptoms: symptoms || [],
      findings: findings || '',
      treatment: treatment || '',
      notes: notes || '',
      status: status || 'completed',
      patientInfo: {
        name: patient?.name,
        phone: patient?.phone,
        dateOfBirth: patient?.dateOfBirth,
        gender: patient?.gender
      },
      doctorInfo: {
        name: doctor?.name,
        specialty: 'General',
        phone: doctor?.phone
      }
    });

    await examination.save();
    return res.status(201).json({
      message: 'Tạo phiếu khám thành công',
      data: examination
    });
  } catch (error) {
    console.error('Lỗi tạo phiếu khám:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

export const getExaminations = async (req, res) => {
  try {
    let query = {};
    
    console.log('🔍 User role:', req.user?.role);
    // Admin xem tất cả, Doctor chỉ xem phiếu khám của mình
    if (req.user?.role !== 'Admin' && req.user?.role !== 'admin') {
      query.doctorId = req.user?._id;
      console.log('👨‍⚕️ Doctor filter - doctorId:', req.user?._id);
    } else {
      console.log('👨‍💼 Admin - xem tất cả');
    }
    
    console.log('📋 Query:', query);
    const examinations = await Examination.find(query).sort({ examinationDate: -1 });
    console.log('📊 Found examinations:', examinations.length);
    
    return res.status(200).json({
      message: 'Lấy danh sách phiếu khám thành công',
      data: examinations
    });
  } catch (error) {
    console.error('Lỗi lấy phiếu khám:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

export const getExaminationById = async (req, res) => {
  try {
    const examination = await Examination.findById(req.params.id);
    if (!examination) {
      return res.status(404).json({ message: 'Phiếu khám không tồn tại' });
    }
    return res.status(200).json({
      message: 'Lấy phiếu khám thành công',
      data: examination
    });
  } catch (error) {
    console.error('Lỗi lấy phiếu khám:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

export const updateExamination = async (req, res) => {
  try {
    const { diagnosis, symptoms, findings, treatment, notes, status } = req.body;

    const examination = await Examination.findByIdAndUpdate(
      req.params.id,
      {
        diagnosis,
        symptoms,
        findings,
        treatment,
        notes,
        status
      },
      { new: true, runValidators: true }
    );

    if (!examination) {
      return res.status(404).json({ message: 'Phiếu khám không tồn tại' });
    }

    return res.status(200).json({
      message: 'Cập nhật phiếu khám thành công',
      data: examination
    });
  } catch (error) {
    console.error('Lỗi cập nhật phiếu khám:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

export const deleteExamination = async (req, res) => {
  try {
    const examination = await Examination.findByIdAndDelete(req.params.id);
    if (!examination) {
      return res.status(404).json({ message: 'Phiếu khám không tồn tại' });
    }
    return res.status(200).json({
      message: 'Xóa phiếu khám thành công'
    });
  } catch (error) {
    console.error('Lỗi xóa phiếu khám:', error);
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};
