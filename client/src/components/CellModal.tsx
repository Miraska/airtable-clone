import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { RelatedDataModal } from './RelatedData';

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  column: { key: string; label: string };
  value?: any;
  onSave: (value: any) => Promise<void>;
}

export const CellModal: React.FC<CellModalProps> = ({
  isOpen,
  onClose,
  data,
  column,
  value: initialValue,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || data[column.key]);

  const handleSave = async () => {
    await onSave(value);
    setIsEditing(false);
  };

  // useEffect(() => {
  //   api.orders.getOne(value).then((res) => {
  //     console.log(res.data)
  //     setValue(res.data.status)
  //   })
  // })

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
            <input
              type="text"
              value={value || ''}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  console.log(data);
                }}
              >
                Закрыть
              </Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <RelatedDataModal isOpen={true} onClose={() => null} relatedName={column.key} relatedKey={value} cellItem={value}/>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
