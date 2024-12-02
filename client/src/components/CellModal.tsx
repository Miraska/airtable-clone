import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  column: { key: string; label: string };
  onEdit: () => void;
  onSave: (value: any) => Promise<void>;
}

export const CellModal: React.FC<CellModalProps> = ({
  isOpen,
  onClose,
  data,
  column,
  onEdit,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data[column.key]);

  const handleSave = async () => {
    await onSave(value);
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={column.label}
    >
      <div className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Закрыть
              </Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">{column.label}</p>
              <p className="mt-1 text-lg">{data[column.key] || '-'}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};