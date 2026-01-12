import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Kiểm tra quyền truy cập
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('profile'));
    } catch (e) {}
    // Lấy role từ nhiều cấu trúc khác nhau
    const role = (user?.role || user?.data?.role || user?.user?.role || '').toLowerCase();
    if (!role || !['doctor', 'admin'].includes(role)) {
      setError(`Bạn không có quyền xem thông tin bệnh nhân này. (role: ${role || 'không xác định'})`);
      setLoading(false);
      setTimeout(() => navigate('/doctor/patients'), 2000);
      return;
    }
    // Lấy thông tin bệnh nhân
    api.get(`/medical/records/${id}`)
      .then(res => {
        setPatient(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không tìm thấy thông tin bệnh nhân.');
        setLoading(false);
      });
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
