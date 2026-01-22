import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

const PatientLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return;
    try {
      const user = JSON.parse(userRaw);
      if (user.role && user.role !== 'patients') {
        navigate('/doctor/dashboard');
      }
    } catch {
      // ignore parse error
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <PatientNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;

