import Appointment from '../models/Appointment.js';

// Helper function để map status
const mapStatus = (status) => {
  const statusMap = {
    'pending': 'Chờ xác nhận',
    'confirmed': 'Đã xác nhận',
    'completed': 'Hoàn thành',
    'cancelled': 'Hủy',
    'no_show': 'Không đến',
    'in_progress': 'Đang khám'
  };
  return statusMap[status] || status;
};

// Lấy danh sách tất cả lịch hẹn
export const getAppointments = async (req, res) => {
  try {
    console.log('📋 getAppointments called!');
    console.log('🔐 req.user:', req.user);
    let query = {};
    
    // ALWAYS filter theo doctor nếu user là doctor
    if (req.user?.role && req.user.role.toLowerCase() === 'doctor') {
      try {
        const DoctorProfile = (await import('../models/DoctorProfile.js')).default;
        const doctorProfile = await DoctorProfile.findOne({ userId: req.user._id });
        
        if (doctorProfile) {
          query.doctorProfileId = doctorProfile._id;
          console.log('✅ FILTERED for doctor - doctorProfileId:', doctorProfile._id);
        } else {
          console.log('⚠️ No doctor profile found for userId:', req.user._id);
        }
      } catch (error) {
        console.error('❌ Error finding doctor profile:', error.message);
      }
    } else {
      console.log('ℹ️ Not a doctor, returning all appointments');
    }
    
    console.log('🔍 Query filter:', JSON.stringify(query));
    
    // Populate doctorProfileId để lấy tên bác sĩ thực tế
    const appointments = await Appointment.find(query)
      .populate({
        path: 'doctorProfileId',
        select: 'name email phone specialty'
      })
      .sort({ appointmentDate: -1, appointmentTime: -1 });
    
    console.log('✅ Found appointments:', appointments.length);
    if (appointments.length > 0) {
      console.log('🔍 First appointment:', {
        id: appointments[0]._id,
        doctorProfileId: appointments[0].doctorProfileId?._id || appointments[0].doctorProfileId,
        patientInfo: appointments[0].patientInfo?.name
      });
    }
    
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
        
        // Ghi đè doctorInfo bằng tên từ DoctorProfile nếu có
        const result = appt.toObject();
        if (appt.doctorProfileId && appt.doctorProfileId.name) {
          result.doctorInfo = {
            name: appt.doctorProfileId.name,
            email: appt.doctorProfileId.email,
            phone: appt.doctorProfileId.phone,
            specialty: appt.doctorProfileId.specialty
          };
        }
        result.patientInfo = patientInfo;
        result.statusDisplay = mapStatus(result.status); // Thêm status display
        
        return result;
      })
    );
    
    res.status(200).json({ message: 'Lấy danh sách lịch hẹn thành công', data: populatedAppointments });
  } catch (err) {
    console.error('❌ Error in getAppointments:', err);
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
