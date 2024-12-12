import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "./Button";
import { queryClient } from "../lib/queryClient";
import { IClient, ISubagent } from "../types";
import { api } from "../api";
import Select from 'react-select';
import { CellModalInputRenderer } from "./CellModalInputRenderer";
import { CellModalFileView } from "./CellModalFileView";
import { CellModalFileEditForm } from "./CellModalFileEditForm";
import { RelatedDataModal } from "./RelatedData";
import { reverseTransformDate } from "../lib/dateFormateer";

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
  const { register, handleSubmit, setValue: setFormValue, getValues, watch } = methods;
  const [title, setTitle] = useState(column.label);
  const watchSubagent = watch("subagents");

  useEffect(() => {
    async function fetchData() {
      try {
        if (column.key === "subagentPayers" ) {
          const cashedSubagent = await queryClient.fetchQuery(['subagents'], api.subagents.getAll)
          const selectedSubagent = cashedSubagent.data.filter((subagent: ISubagent) => data.subagents?.includes(subagent.id))
          const selectedPayers = selectedSubagent.map((subagent: ISubagent) => subagent.subagentPayers);
          const uniquePayersID = Array.from(new Set(selectedPayers.flat()));
          setSelectedPayersID(uniquePayersID);
        } else if (column.key === "subagents") {
            const cashedSubagent = await queryClient.fetchQuery(['subagents'], api.subagents.getAll)
             const selectedSubagent = cashedSubagent.data.filter((subagent: ISubagent) => watchSubagent?.includes(subagent.id))
             const selectedPayers = selectedSubagent.map((subagent: ISubagent) => subagent.subagentPayers);
             const canSelectPayersID = Array.from(new Set(selectedPayers.flat()));
             const uniquePayers = canSelectPayersID.filter((id: number) => data.subagents.includes(id));
            setSelectedPayersID(uniquePayers);
            } else {
          setValue(initialValue || data[column.key]);
          setFormValue(column.key, initialValue || reverseTransformDate(data[column.key]));
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    }
    fetchData()
  }, [initialValue, data, column.key, setFormValue, watchSubagent]);

  const handleDeleteFileById = async (fileId: string | number) => {
    try {
      const res = await api.files.deleteById(String(fileId));
      if (res.status === 200) {
        // обновляем локальный стейт файлов при необходимости
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
      updatedData = { ...data, [column.key]: updatedValue }
    } else if (column.key === "subagents") {
        updatedData = { ...data, [column.key]: updatedValue, "subagentPayers": selectedPayersID }
    } else {
        console.log(selectedPayersID)
        updatedData = { ...data, [column.key]: updatedValue }
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
              <ReviewOrdersSelect/>
            </FormProvider>
          </div>
        );
      case "payers":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <PayersSelect canSelect={selectedPayersID}/>
            </FormProvider>
          </div>
        );
      case "reviewers":
        return (
          <div className="space-y-4">
            <FormProvider {...methods}>
              <ReviewManagersSelect/>
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
            <CellModalFileEditForm
              handleSave={handleSave}
              setIsEditing={setIsEditing}
              column={column}
              data={data}
            />
          ) : (
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="space-y-4">
                {isRelationShip ? (
                  <div>Здесь будет изменение столбца или значений</div>
                ) : (
                  <CellModalInputRenderer
                    column={column}
                    value={value}
                    setValue={setValue}
                    setFormValue={setFormValue}
                    register={register}
                    methods={methods}
                    selectedPayersID={selectedPayersID}
                    selectedOrdersID={selectedOrdersID}
                    selectedManagersID={selectedManagersID}
                  />
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
                <CellModalFileView
                  data={data}
                  column={column}
                  handleDeleteFileById={handleDeleteFileById}
                  handleSave={handleSave}
                />
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
