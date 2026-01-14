import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

  if (!token) {
    // Nếu không có token, điều hướng đến trang login
    return <Navigate to="/auth/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    // Kiểm tra nếu role của user nằm trong allowedRoles
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Nếu không được phép, điều hướng đến trang không được phép
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl text-red-500 mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Truy Cập Bị Từ Chối</h1>
              <p className="text-gray-600 mb-6">
                Trang này chỉ dành cho: <strong>{allowedRoles.join(', ')}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Role của bạn: <strong>{userRole}</strong>
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Quay Lại
              </button>
            </div>
          </div>
        </div>
      );
    }

    return element;
  } catch (error) {
    console.error('Token không hợp lệ:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    return <Navigate to="/auth/login" replace />;
  }
};

export default ProtectedRoute;
