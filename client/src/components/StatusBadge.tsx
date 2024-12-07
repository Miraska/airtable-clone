import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'новый':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'в процессе':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'завершен':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'закрыт':
        return 'bg-red-100 text-gray-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusColor(status)
      )}
    >
      {status}
    </span>
  );
};