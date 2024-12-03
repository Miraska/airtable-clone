import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { RelatedDataModal } from "./RelatedData";

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  column: { key: string; label: string };
  value?: any;
  onSave: (value: any) => Promise<void>;
  isRelationShip?: boolean;
}

const statusOptions = [
  { value: "Новый", label: "Новый" },
  { value: "В процессе", label: "В процессе" },
  { value: "Завершен", label: "Завершен" },
  { value: "Закрыт", label: "Закрыт" },
];

export const CellModal: React.FC<CellModalProps> = ({
  isOpen,
  onClose,
  data,
  column,
  value: initialValue,
  onSave,
  isRelationShip,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || data[column.key]);

  useEffect(() => {
    // Обновляем значение, если initialValue изменилось
    setValue(initialValue || data[column.key]);
  }, [initialValue, data, column.key]);

  const handleSave = async () => {
    await onSave(value);
    setIsEditing(false);
  };

  const renderCell = () => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "-";

      return (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                alert(`column: ${column.key}, tag: ${tag}`);
              }}
              className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    }
    return value;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={column.label}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    >
      <div className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            {isRelationShip ? (
              <div>Здесь будет изменение столбца или значений</div>
            ) : (
              <div>
                {Array.isArray(value) ? (
                  <div>
                    Здесь будет редактирование ссылочных значений на другие таблицы
                  </div>
                ) : (
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="primary"
                className='px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white'
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Закрыть
              </Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              {isRelationShip ? (
                <div>
                  <RelatedDataModal
                    isOpen={true}
                    relatedName={column.key}
                    relatedKey={value}
                    cellItem={value}
                  />
                </div>
              ) : (
                <div>{renderCell()}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
 