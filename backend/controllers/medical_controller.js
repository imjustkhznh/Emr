import MedicalRecord from "../models/medical_record.js";
import DoctorProfile from "../models/DoctorProfile.js";

export const getMyPatientsRecords = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Find doctor profile by userId
        const doctorProfile = await DoctorProfile.findOne({ userId });
        
        if (!doctorProfile) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy hồ sơ bác sĩ'
            });
        }
        
        // Get all medical records for this doctor's patients
        const medicalRecords = await MedicalRecord.find({})
            .populate('patientId', 'name firstName lastName email phone')
            .populate('doctorId', 'name specialty')
            .sort({ visitDate: -1 });
        
        res.status(200).json({
            success: true,
            data: medicalRecords
        });
    } catch (error) {
        console.error('Lỗi lấy hồ sơ bệnh nhân:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy hồ sơ bệnh nhân',
            error: error.message
        });
    }
};

export const createMedicalRecord = async (req, res) => {

    try {
        const doctorId = req.user._id;
        console.log('5. doctorId extracted:', doctorId);
        const {
            patientId,
            visitDate,
            chiefComplaint,
            symptoms,
            vitalSigns,
            diagnosis,
            icdCode,
            medicalHistory,
            allergies,
            prescription,
            notes,
            labResults,
            attachments,
            followUpDate,
            status
        } = req.body;


        // Validate required fields
        if (!patientId || !visitDate || !chiefComplaint || !diagnosis) {
            return res.status(400).json({
                message: "Thiếu thông tin bắt buộc",
                required: ["patientId", "visitDate", "chiefComplaint", "diagnosis"]
            });
        }


        const newRecord = await MedicalRecord.create({
            patientId,
            doctorId,
            visitDate,
            chiefComplaint,
            symptoms,
            vitalSigns,
            diagnosis,
            icdCode,
            medicalHistory,
            allergies,
            prescription,
            notes,
            labResults,
            attachments,
            followUpDate,
            status
        });

        return res.status(201).json({
            message: "Tạo hồ sơ y tế thành công",
            data: newRecord
        });
    } catch (error) {
        console.error("Lỗi tạo hồ sơ y tế:", error);

        // ✅ Trả về lỗi chi tiết hơn
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Dữ liệu không hợp lệ",
                errors: Object.values(error.errors).map(e => e.message)
            });
        }

        return res.status(500).json({
            message: "Lỗi máy chủ, vui lòng thử lại sau"
        });
    }
};

export const getMedicalRecords = async (req, res) => {
    try {
        // ✅ Sử dụng filter query từ middleware (đã được set dựa trên role)
        const query = req.filterQuery || {};

        // Thử lấy từ full schema model trước, nếu không có thì lấy từ simple schema
        let medicalRecords = await MedicalRecord.find(query)
            .sort({ visitDate: -1, createdAt: -1 });

        // Nếu không có kết quả, kiểm tra collection medicalrecords đơn giản
        if (medicalRecords.length === 0) {
            const db = MedicalRecord.collection.conn.db;
            const simpleCollection = db.collection('medicalrecords');
            medicalRecords = await simpleCollection.find(query).sort({ createdAt: -1 }).toArray();
        }

        return res.status(200).json({
            message: "Lấy danh sách hồ sơ thành công",
            count: medicalRecords.length,
            data: medicalRecords
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách hồ sơ y tế:", error);
        return res.status(500).json({
            message: "Lỗi máy chủ, vui lòng thử lại sau"
        });
    }
};

export const getMedicalRecordById = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id);
        if (!medicalRecord) {
            return res.status(404).json({ message: "Hồ sơ y tế không tồn tại" });
        }
        return res.status(200).json(medicalRecord);
    } catch (error) {
        console.error("Lỗi lấy hồ sơ y tế:", error);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
    }
};

export const updateMedicalRecord = async (req, res) => {
    try {
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRecord) {
            return res.status(404).json({ message: "Hồ sơ y tế không tồn tại" });
        }
        return res.status(200).json({
            message: "Cập nhật hồ sơ y tế thành công",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Lỗi cập nhật hồ sơ y tế:", error);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
    }
};

export const deleteMedicalRecord = async (req, res) => {
    try {
        const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ message: "Hồ sơ y tế không tồn tại" });
        }
        return res.status(200).json({ message: "Xóa hồ sơ y tế thành công" });
    } catch (error) {
        console.error("Lỗi xóa hồ sơ y tế:", error);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
    }
};