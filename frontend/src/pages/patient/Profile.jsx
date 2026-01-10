import React from 'react';

const Profile = () => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  })();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-secondary-900 mb-4">Thông tin cá nhân</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xl">
            {(user?.name || 'BN')
              .split(' ')
              .filter(Boolean)
              .map((p) => p[0]?.toUpperCase())
              .join('')
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-lg font-semibold text-secondary-900">{user?.name || 'Bệnh nhân'}</p>
            <p className="text-sm text-secondary-500">{user?.email || 'Chưa có email'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-secondary-500">Họ và tên</p>
            <p className="font-medium text-secondary-900">{user?.name || 'Chưa cập nhật'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-secondary-500">Email</p>
            <p className="font-medium text-secondary-900">{user?.email || 'Chưa cập nhật'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-secondary-500">Số điện thoại</p>
            <p className="font-medium text-secondary-900">{user?.phone || 'Chưa cập nhật'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-secondary-500">Mã bệnh nhân</p>
            <p className="font-medium text-secondary-900">PAT-00123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

