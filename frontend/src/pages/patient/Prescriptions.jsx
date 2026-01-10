import React from 'react';

const Prescriptions = () => {
  const prescriptions = [
    {
      date: '05/03/2026',
      doctor: 'BS. Nguyễn Thị Lan',
      diagnosis: 'Viêm họng cấp',
      meds: ['Paracetamol 500mg', 'Vitamin C 500mg'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-secondary-900 mb-4">
        Đơn thuốc &amp; hướng dẫn điều trị
      </h1>

      <div className="space-y-4">
        {prescriptions.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-sm space-y-3"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <p className="text-xs text-secondary-500">{p.date}</p>
                <p className="font-semibold text-secondary-900">{p.diagnosis}</p>
                <p className="text-xs text-secondary-500 mt-1">Bác sĩ kê đơn: {p.doctor}</p>
              </div>
              <button className="px-4 py-2 rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50">
                Tải đơn thuốc PDF
              </button>
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Thuốc đã kê</p>
              <ul className="list-disc list-inside text-secondary-700">
                {p.meds.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-secondary-900 mb-1">Hướng dẫn điều trị</p>
              <p className="text-secondary-600 text-xs">
                Uống nhiều nước ấm, súc miệng bằng nước muối, giữ ấm cổ họng, nghỉ ngơi đầy đủ. Tái
                khám nếu sốt cao &gt; 38.5°C hoặc khó thở.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;

