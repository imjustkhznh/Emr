import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DoctorLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto focus:outline-none">
        <Header doctorName="Bác sĩ" />
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
