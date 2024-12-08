import React from 'react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'отменено клиентом':
        return 'bg-red-100 text-red-800 border-red-200';
      case '1. не создан чат':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'заявка закрыта':
        return 'bg-green-100 text-green-800 border-green-200';
      case '15. возврат':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case '17. деньги у получателя':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cогласован получатель (только для экспорта)':
        return 'bg-lime-100 text-lime-800 border-lime-200';
      case "1'. cоздан чат":
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case "4. подписан агент. договор":
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case "ждем рубли":
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case "5. выставлен инвойс на плательщика":
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case "3. согласование плательщика":
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case "ждём валюту (только для экспорта)":
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case "9. передано на оплату":
        return 'bg-violet-100 text-violet-800 border-violet-200';
      case "7. подписано поручение":
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case "10. получен свифт":
        return 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200';
      case "17`. ждём поступление валюты получателю":
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case "получили рубли":
        return 'bg-green-100 text-green-800 border-green-200';
      case "11. запрошен свифт 103":
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case "6. зафиксирован курс":
        return 'bg-sky-100 text-sky-800 border-sky-200';
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