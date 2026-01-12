import Appointment from '../models/Appointment.js';

// Lấy danh sách tất cả lịch hẹn
export const getAppointments = async (req, res) => {
  try {
    // Populate patientInfo with age for each appointment
    const appointments = await Appointment.find().sort({ appointmentDate: 1, appointmentTime: 1 });
    const populatedAppointments = await Promise.all(
      appointments.map(async (appt) => {
        let patientInfo = appt.patientInfo || {};
        // If patientInfo is missing age, fetch from User
        if (!patientInfo.age) {
          const User = (await import('../models/User_Model.js')).default;
          const user = await User.findById(appt.patientId);
          if (user && user.dateOfBirth) {
            // Calculate age
            const dob = new Date(user.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
              age--;
            }
            patientInfo.age = age;
            patientInfo.dateOfBirth = user.dateOfBirth;
          }
        }
        return { ...appt.toObject(), patientInfo };
      })
    );
    res.status(200).json({ message: 'Lấy danh sách lịch hẹn thành công', data: populatedAppointments });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Tạo mới lịch hẹn
export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorProfileId, appointmentDate, appointmentTime, reason } = req.body;
    
    console.log('Creating appointment with data:', { patientId, doctorProfileId, appointmentDate, appointmentTime, reason });
    
    // Validation
    if (!patientId) return res.status(400).json({ message: 'patientId là bắt buộc' });
    if (!doctorProfileId) return res.status(400).json({ message: 'doctorProfileId là bắt buộc' });
    if (!appointmentDate) return res.status(400).json({ message: 'appointmentDate là bắt buộc' });
    if (!appointmentTime) return res.status(400).json({ message: 'appointmentTime là bắt buộc' });
    if (!reason) return res.status(400).json({ message: 'reason là bắt buộc' });
    
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: 'Tạo lịch hẹn thành công', data: appointment });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(400).json({ message: 'Tạo lịch hẹn thất bại', error: err.message });
  }
};

// Cập nhật lịch hẹn
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorProfileId, appointmentDate, appointmentTime, reason, status } = req.body;
    
    // Validation
    if (!patientId) return res.status(400).json({ message: 'patientId là bắt buộc' });
    if (!appointmentDate) return res.status(400).json({ message: 'appointmentDate là bắt buộc' });
    if (!appointmentTime) return res.status(400).json({ message: 'appointmentTime là bắt buộc' });
    if (!reason) return res.status(400).json({ message: 'reason là bắt buộc' });
    
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
    }
    
    res.status(200).json({ message: 'Cập nhật lịch hẹn thành công', data: appointment });
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(400).json({ message: 'Cập nhật lịch hẹn thất bại', error: err.message });
  }
};

// Xóa lịch hẹn
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const appointment = await Appointment.findByIdAndDelete(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Không tìm thấy lịch hẹn' });
    }
    
    res.status(200).json({ message: 'Xóa lịch hẹn thành công', data: appointment });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(400).json({ message: 'Xóa lịch hẹn thất bại', error: err.message });
  }
};
