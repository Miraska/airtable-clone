import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import RenderData from "./RenderData";
import columnsConfig from "../lib/tableColumnsData/index";
import titleMappings from "../lib/tableTitles";

interface RelatedDataModalProps {
  isOpen: boolean;
  relatedName?: string;
  relatedKey: any;
  cellItem: any;
  setTitle: (value: string) => void;
  setSelectedCell?: React.Dispatch<any>;
}

const setNewTitle = (relatedName: string) => {
  const mapping = titleMappings[relatedName as keyof typeof titleMappings];
  return mapping ? mapping.label : "Нет Заголовка";
};

export const RelatedDataModal: React.FC<RelatedDataModalProps> = ({
  isOpen,
  relatedName,
  relatedKey,
  cellItem,
  setTitle,
  setSelectedCell,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState<any>(null);
  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const [newPath, setNewPath] = useState("");
  const [newData, setNewData] = useState<any>(null);
  const [newKey, setNewKey] = useState("");

  // Устанавливаем заголовок модального окна
  useEffect(() => {
    if (isOpen && relatedName && relatedKey) {
      setTitle(setNewTitle(relatedName) + " " + relatedKey);
    }
  }, [relatedName, relatedKey, isOpen, setTitle]);

  // Получаем конфигурацию таблицы
  const relatedConfig = columnsConfig[relatedName as keyof typeof columnsConfig];
  if (!relatedConfig) {
    console.error(`Не найдена конфигурация для таблицы с именем: ${relatedName}`);
    return null;
  }
  const { columns, apiMethod } = relatedConfig;

  // Загружаем данные для модального окна
  const { refetch } = useQuery(
    ["relatedData", relatedKey],
    async () => {
      setIsLoading(true);
      const result = await apiMethod(relatedKey);
      setModalData(result.data);
      setIsLoading(false);
    },
    {
      enabled: isOpen && !!relatedKey,
      onError: (error) => {
        console.error("Ошибка загрузки данных:", error);
        setIsLoading(false);
      },
    }
  );

  useEffect(() => {
    if (isOpen && relatedKey) {
      refetch();
    }
  }, [isOpen, relatedKey, refetch]);

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      {newModalIsOpen ? (
        <RelatedDataModal
          key={`${newPath}-${newKey}`}
          isOpen={true}
          relatedKey={newKey}
          relatedName={newPath}
          cellItem={newData}
          setTitle={setTitle}
          setSelectedCell={setSelectedCell}
        />
      ) : (
        <div>
          {isLoading ? (
            <div>Загрузка...</div>
          ) : modalData ? (
            <div className="p-4 rounded-md">
              <RenderData
                data={modalData}
                columns={columns}
                setNewModalIsOpen={setNewModalIsOpen}
                setNewPath={setNewPath}
                setNewData={setNewData}
                setNewKey={setNewKey}
                setSelectedCell={setSelectedCell}
              />
            </div>
          ) : (
            <div>{cellItem || "Нет данных для отображения"}</div>
          )}
        </div>
      )}
    </div>
  );
};
