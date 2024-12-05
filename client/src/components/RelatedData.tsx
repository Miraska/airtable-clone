import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import RenderData from "./RenderData";

import columnsConfig from "../lib/tableColumnsData/index";
import titleMappings from "../lib/tableTitles";

interface RelatedDataModalProps {
  isOpen: boolean;
  relatedName: string;
  relatedKey: any;
  cellItem: any;
  setTitle: (value: string) => void;
  setSelectedCell: React.Dispatch<any>;
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
  useEffect(() => {
    setTitle(setNewTitle(relatedName) + " " + relatedKey);
  }, [relatedName, setTitle]);

  const relatedConfig = columnsConfig[relatedName as keyof typeof columnsConfig];

  if (!relatedConfig) {
    console.error(
      `Не найдена конфигурация для таблицы с именем: ${relatedName}`
    );
    return null;
  }

  const { columns, apiMethod } = relatedConfig;

  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const [newPath, setNewPath] = useState("");
  const [newData, setNewData] = useState<any>(null);
  const [newKey, setNewKey] = useState("");

  const { data, isLoading, isError, refetch } = useQuery(
    ["relatedData", relatedKey],
    () => apiMethod(relatedKey),
    {
      staleTime: 0.3 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: isOpen && !!relatedKey,
    }
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      {newModalIsOpen ? (
        <RelatedDataModal
          isOpen={true}
          relatedKey={newKey}
          relatedName={newPath}
          cellItem={newData}
          setTitle={setTitle}
          setSelectedCell={setSelectedCell} // Pass down the function
        />
      ) : (
        <div>
          {isLoading ? (
            <div>Загрузка...</div>
          ) : isError ? (
            <div>Произошла ошибка при загрузке данных</div>
          ) : (
            <div className="space-y-4">
              {data && data.data ? (
                <div className="p-4 rounded-md">
                  <RenderData
                    data={data.data}
                    columns={columns}
                    setNewModalIsOpen={setNewModalIsOpen}
                    setNewPath={setNewPath}
                    setNewData={setNewData}
                    setNewKey={setNewKey}
                    setSelectedCell={setSelectedCell} // Pass down the function
                  />
                </div>
              ) : (
                <div>{cellItem}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
