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
