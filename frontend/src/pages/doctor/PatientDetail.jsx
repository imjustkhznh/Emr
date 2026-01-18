import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI, medicalAPI } from '../../services/apiService';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Get patient info
        const patientRes = await userAPI.getById(id);
        setPatient(patientRes.data?.data || patientRes.data);
        
        // Get patient medical records
        try {
          const recordsRes = await medicalAPI.getAll();
          const patientRecords = recordsRes.data?.data?.filter(r => r.patientId === id) || [];
          setRecords(patientRecords);
        } catch (e) {
          console.log('No records found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Không tìm thấy thông tin bệnh nhân.');
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id, navigate]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!patient) return null;

  return (
    <div className="p-6 bg-gray-100 mt-20">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Thông tin bệnh nhân</h2>
        <div className="mb-2"><b>ID:</b> {patient._id}</div>
        <div className="mb-2"><b>Tên:</b> {patient.name}</div>
        <div className="mb-2"><b>Tuổi:</b> {patient.age}</div>
        <div className="mb-2"><b>Giới tính:</b> {patient.gender}</div>
        <div className="mb-2"><b>Số điện thoại:</b> {patient.phone}</div>
        <div className="mb-2"><b>Trạng thái:</b> {patient.status}</div>
        {/* Thêm các trường khác nếu cần */}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

export default PatientDetail;
