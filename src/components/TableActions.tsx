import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1 text-gray-500 hover:text-yellow-600 transition-colors"
          title="Edit"
        >
          <Edit size={18} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1 text-gray-500 hover:text-red-600 transition-colors"
          title="Удалить"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
};