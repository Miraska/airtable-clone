import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { RelatedDataModal } from "./RelatedData";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import Select from "react-select";

import {
  statusOptions,
  currencyOptions,
  swiftStatus,
  booleanStatus,
} from "../lib/options";

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  column: { key: string; label: string; type: string };
  value?: any;
  onSave: (value: any) => void;
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

  const methods = useForm({
    defaultValues: { [column.key]: initialValue || data[column.key] },
  });
  const { register, handleSubmit, setValue: setFormValue, getValues } = methods;
  const [title, setTitle] = useState(column.label);

  useEffect(() => {
    setValue(initialValue || data[column.key]);
    setFormValue(column.key, initialValue || data[column.key]);
  }, [initialValue, data, column.key, setFormValue]);

  const handleSave = async () => {
    const formData = getValues();
    const updatedValue = formData[column.key];
    const updatedData = { ...data, [column.key]: updatedValue };

    try {
      onSave(updatedData);
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }

    setIsEditing(false);
    onClose();
  };

  const renderInputByType = () => {
    switch (column.type) {
      case "text":
      case "number":
        return (
          <input
            {...register(column.key)}
            type={column.type}
            defaultValue={value || ""}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-700 dark:placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
          />
        );
      case "date":
        return (
          <input
            {...register(column.key)}
            type="date"
            defaultValue={value || ""}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
          />
        );
      case "option":
        return (
          <Select
            options={statusOptions}
            value={statusOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "boolean":
        return (
          <Select
            options={booleanStatus}
            value={booleanStatus.find((opt) => opt.value === value?.toString())}
            onChange={(selectedOption) => {
              const booleanValue = selectedOption?.value === "true";
              setValue(booleanValue);
              setFormValue(column.key, booleanValue);
            }}
          />
        );
      case "currency":
        return (
          <Select
            options={currencyOptions}
            value={currencyOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "swift":
        return (
          <Select
            options={swiftStatus}
            value={swiftStatus.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "related":
        return (
          <RelatedDataModal
            isOpen={isOpen}
            relatedName={column.key}
            relatedKey={value}
            cellItem={value}
            setTitle={setTitle}
            setSelectedCell={setSelectedCell}
          />
        );
      default:
        return (
          <input
            {...register(column.key)}
            type="text"
            defaultValue={value || ""}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 placeholder:text-gray-100 dark:border-transparent focus:ring-blue-500 focus:border-blue-500"
          />
        );
    }
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
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="space-y-4">
              {isRelationShip ? (
                <div>Здесь будет изменение столбца или значений</div>
              ) : (
                <div>
                  {Array.isArray(value) ? (
                    <div>
                      Здесь будет редактирование ссылочных значений на другие
                      таблицы
                    </div>
                  ) : (
                    renderInputByType()
                  )}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="primary"
                  className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Закрыть
                </Button>
                <Button type="submit">Сохранить</Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              {isRelationShip ? (
                <RelatedDataModal
                  isOpen={isOpen}
                  relatedName={column.key}
                  relatedKey={value}
                  cellItem={value}
                  setTitle={setTitle}
                  setSelectedCell={setSelectedCell}
                />
              ) : Array.isArray(value) ? (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {value.map((tag, index) => (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {column.type === "boolean"
                    ? value === true
                      ? "Да"
                      : "Нет"
                    : value}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
