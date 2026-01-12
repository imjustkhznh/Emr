import Appointment from '../models/Appointment.js';

// Lấy danh sách tất cả lịch hẹn
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1, appointmentTime: 1 });
    res.status(200).json({ message: 'Lấy danh sách lịch hẹn thành công', data: appointments });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Tạo mới lịch hẹn
export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorProfileId, appointmentDate, appointmentTime, reason } = req.body;
    
    // Validation
    if (!patientId) return res.status(400).json({ error: 'patientId là bắt buộc' });
    if (!doctorProfileId) return res.status(400).json({ error: 'doctorProfileId là bắt buộc' });
    if (!appointmentDate) return res.status(400).json({ error: 'appointmentDate là bắt buộc' });
    if (!appointmentTime) return res.status(400).json({ error: 'appointmentTime là bắt buộc' });
    if (!reason) return res.status(400).json({ error: 'reason là bắt buộc' });
    
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: 'Tạo lịch hẹn thành công', data: appointment });
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(400).json({ message: 'Tạo lịch hẹn thất bại', error: err.message });
  }
};
