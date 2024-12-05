import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { RelatedDataModal } from "./RelatedData";
import { Button } from "./Button";

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  column: { key: string; label: string };
  value?: any;
  onSave: (value: any) => Promise<void>;
  isRelationShip?: boolean;
  setSelectedCell: React.Dispatch<any>;
}

export const CellModal: React.FC<CellModalProps> = ({
  isOpen,
  onClose,
  data,
  column,
  value: initialValue,
  onSave,
  isRelationShip,
  setSelectedCell,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || data[column.key]);
  const [title, setTitle] = useState(column.label);

  useEffect(() => {
    setValue(initialValue || data[column.key]);
  }, [initialValue, data, column.key]);

  const handleSave = async () => {
    await onSave(value);
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    >
      <div className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            {isRelationShip ? (
              <div>Редактирование связанных данных будет здесь. {value}</div>
            ) : Array.isArray(value) ? (
              <div>Редактирование связей {value}</div>
            ) : (
              <div>
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-300 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setIsEditing(false)}
              >
                Закрыть
              </Button>
              <Button
                variant="primary"
                className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSave}
              >
                Сохранить
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              {isRelationShip ? (
                <div>
                  <RelatedDataModal
                    isOpen={isOpen}
                    relatedName={column.key}
                    relatedKey={value}
                    cellItem={value}
                    setTitle={setTitle}
                    setSelectedCell={setSelectedCell}
                  />
                </div>
              ) : Array.isArray(value) ? (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {value.map((tag, index) => (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(tag);
                        }}
                        className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>{value}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
