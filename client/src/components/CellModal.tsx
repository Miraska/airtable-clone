import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { RelatedDataModal } from "./RelatedData";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "./Button";
import Select from "react-select";

import {
  statusOptions,
  currencyOptions,
  swiftStatus,
  booleanStatus,
  conditionOptions,
  transactionOptions,
  stageProblemOptions,
  nameMistakeOptions,
} from "../lib/options";
import { RelationshipSelect } from "./RelationshipSelect";
import UploadFiles from "./UploadFiles";
import { queryClient } from "../lib/queryClient";
import { IClient, ISubagent } from "../types";
import PayersSelect from "./PayersSelect";
import ReviewOrdersSelect from "./ReviewOrdersSelect";
import ReviewManagersSelect from "./ReviewManagersSelect";
import { api } from "../api";
import { Trash2 } from "lucide-react";

interface CellModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  column: {
    key: string;
    label: string;
    type: string;
    readonly?: boolean;
  };
  value?: any;
  onSave: (value: any) => void;
  isRelationShip?: boolean;
  setSelectedCell: React.Dispatch<any>;
}

interface FileData {
  _id?: string;
  id?: number;
  originalname?: string;
  filename?: string;
  fileName?: string;
  fileUrl?: string;
  type: string;
  orderId?: string | number;
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
  const [selectedPayersID, setSelectedPayersID] = useState<number[]>([]);
  const [selectedOrdersID, setSelectedOrdersID] = useState<number[]>([]);
  const [selectedManagersID, setSelectedManagersID] = useState<number[]>([]);

  const methods = useForm({
    defaultValues: { [column.key]: initialValue || data[column.key] },
  });
  const { register, handleSubmit, setValue: setFormValue, getValues } = methods;
  const [title, setTitle] = useState(column.label);

  useEffect(() => {
    async function fetchData() {
      try {
        if (column.key === "subagentPayers" || column.key === "subagents") {
          const cashedSubagent = await queryClient.fetchQuery(
            ["subagents"],
            api.subagents.getAll
          );
          const selectedSubagent = cashedSubagent.data.filter(
            (subagent: ISubagent) => data.subagents?.includes(subagent.id)
          );
          const selectedPayers = selectedSubagent.map(
            (subagent: ISubagent) => subagent.subagentPayers
          );
          const uniquePayersID = Array.from(new Set(selectedPayers.flat()));
          setSelectedPayersID(uniquePayersID);
        } else {
          setValue(initialValue || data[column.key]);
          setFormValue(column.key, initialValue || data[column.key]);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    }
    fetchData();
  }, [initialValue, data, column.key, setFormValue]);

  const [serverFiles, setServerFiles] = useState<FileData[]>([]);

  useEffect(() => {
    if (!isEditing && column.type === "file") {
      const fetchFiles = async () => {
        try {
          const res = await api.files.getByOrderId(data.id);
          if (res.status === 200 && res.data.length > 0) {
            let files = res.data;
            setServerFiles(files);
          }
        } catch {
          console.log("Файлов еще нет");
        }
      };
      fetchFiles();
    }
  }, [column.type, data?.id, isOpen, isEditing]);

  const handleDeleteFileById = async (fileId: string | number) => {
    try {
      const res = await api.files.deleteById(String(fileId));

      if (res.status === 200) {
        setServerFiles((prev) =>
          prev.filter((file) => file._id !== fileId && file.id !== fileId)
        );
      }
    } catch (error) {
      console.error("Ошибка при удалении файла:", error);
    }
  };

  const handleSave = async () => {
    const formData = getValues();
    const updatedValue = formData[column.key];
    let updatedData;

    if (column.key === "clients") {
      const cashedClient = await queryClient.fetchQuery(
        ["clients"],
        api.clients.getAll
      );
      const selectedClient = cashedClient.data.filter((client: IClient) =>
        updatedValue?.includes(client.id)
      );
      const selectedINN = selectedClient
        .map((client: IClient) => client.inn)
        .join(", ");
      updatedData = {
        ...data,
        [column.key]: updatedValue,
        client_inn: selectedINN,
      };
    } else if (column.key === "subagentPayers") {
      updatedData = { ...data, [column.key]: selectedPayersID };
    } else {
      updatedData = {
        ...data,
        [column.key]: updatedValue,
        subagentPayers: selectedPayersID,
      };
    }
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
            readOnly={column.readonly}
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
            readOnly={column.readonly}
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
      case "problem-stage":
        return (
          <Select
            options={stageProblemOptions}
            value={stageProblemOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "condition":
        return (
          <Select
            options={conditionOptions}
            value={conditionOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "name-mistake":
        return (
          <Select
            options={nameMistakeOptions}
            value={nameMistakeOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "transaction":
        return (
          <Select
            options={transactionOptions}
            value={transactionOptions.find((opt) => opt.value === value)}
            onChange={(selectedOption) => {
              setValue(selectedOption?.value || "");
              setFormValue(column.key, selectedOption?.value || "");
            }}
          />
        );
      case "related":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <Controller
                name={column.key}
                control={methods.control}
                render={({ field }) => (
                  <RelationshipSelect
                    type={column.key}
                    value={field.value || []}
                    onChange={(newValue) => {
                      setValue(newValue);
                      setFormValue(column.key, newValue);
                    }}
                    placeholder="Выберите связь"
                  />
                )}
              />
            </FormProvider>
          </div>
        );
      case "review":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <ReviewOrdersSelect cantSelect={selectedOrdersID} />
            </FormProvider>
          </div>
        );
      case "payers":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <PayersSelect canSelect={selectedPayersID} />
            </FormProvider>
          </div>
        );
      case "reviewers":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <ReviewManagersSelect cantSelect={selectedManagersID} />
            </FormProvider>
          </div>
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
          column.type === "file" ? (
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="space-y-4">
                <UploadFiles
                  editingHandler={() => setIsEditing(false)}
                  typeCell={column.key}
                  orderId={data?.id}
                  data={data}
                />

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
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="space-y-4">
                {isRelationShip ? (
                  <div>Здесь будет изменение столбца или значений</div>
                ) : (
                  renderInputByType()
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
          )
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
              ) : column.type === "file" ? (
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className="space-y-4">
                    {data?.files && data.files.length > 0 ? (
                      <ul className="space-y-2">
                        {data?.files
                          .filter((file) => file.type === column.key)
                          .map((file) => (
                            <li
                              key={file._id || file.id}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-200 dark:bg-gray-800 p-2 rounded"
                            >
                              <span className="truncate flex-1">
                                {file.originalname || file.name}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  onClick={() => {
                                    handleDeleteFileById(file.id || file.id!);
                                    setIsEditing(false);
                                    handleSave();
                                  }}
                                  className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-colors"
                                  title="Удалить"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p>Нет загруженных файлов</p>
                    )}
                  </div>
                </form>
              ) : Array.isArray(value) ? (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {value.map((tag: any, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
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
