import React from "react";
import { Edit, Trash2, SquareGantt } from "lucide-react";

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="flex items-center gap-2">
      {onDelete && (
        <button
          onClick={onDelete}
          className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-colors"
          title="Удалить"
        >
          <Trash2 size={18} />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1 text-gray-500 dark:text-gray-300 hover:text-yellow-600 transition-colors"
          title="Редактировать"
        >
          <Edit size={18} />
        </button>
      )}
      {onView && (
        <button
          onClick={onView}
          className="p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 transition-colors"
          title="Посмотреть в модальном окне"
        >
          <SquareGantt size={18} />
        </button>
      )}
    </div>
  );
};
