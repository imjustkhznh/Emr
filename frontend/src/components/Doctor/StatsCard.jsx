import React from 'react';
import { Users, Calendar, UserPlus, DollarSign } from 'lucide-react';

const iconMap = {
  patients: <Users className="h-6 w-6 text-white" />,
  appointments: <Calendar className="h-6 w-6 text-white" />,
  newPatients: <UserPlus className="h-6 w-6 text-white" />,
  revenue: <DollarSign className="h-6 w-6 text-white" />
};

const StatsCard = ({ title, value, change, icon, trend = 'up' }) => {
  const bgColors = {
    patients: 'bg-blue-500',
    appointments: 'bg-green-500',
    newPatients: 'bg-purple-500',
    revenue: 'bg-yellow-500'
  };

  const iconBgColors = {
    patients: 'bg-blue-600',
    appointments: 'bg-green-600',
    newPatients: 'bg-purple-600',
    revenue: 'bg-yellow-600'
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${bgColors[icon]}`}>
            {iconMap[icon]}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change !== undefined && (
        <div className={`px-5 py-3 ${iconBgColors[icon]} bg-opacity-10`}>
          <div className="text-sm">
            <span className={`font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change}%
            </span>
            <span className="text-gray-500 ml-1">
              {trend === 'up' ? 'Tăng' : 'Giảm'} so với tháng trước
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
