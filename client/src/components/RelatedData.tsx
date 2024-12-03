import React from "react";
import { useQuery } from "react-query";

// Импортируем объект с колонками
import columnsConfig from "../lib/tableColumnsDara/index";

interface RelatedDataModalProps {
  isOpen: boolean;
  relatedName: string;
  relatedKey: any;
  cellItem: any;
}


// Рекурсивный компонент для отображения данных
const RenderData = ({ data, columns }: { data: any, columns: { key: string; label: string }[] }) => {
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

  const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true; // null или undefined
    if (typeof value === "string" && value.trim() === "") return true; // Пустая строка или строка из пробелов
    if (Array.isArray(value) && value.length === 0) return true; // Пустой массив
    if (typeof value === "object" && value !== null && Object.keys(value).length === 0) return true; // Пустой объект
    return false;
  };

  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      if (isEmpty(data)) {
        return null; // Пропускаем пустые массивы
      }
      return (
        <ol className="list-disc ml-4">
          {data.map((item, index) => (
            <li key={index}>
              <RenderData data={item} columns={columns} />
            </li>
          ))}
        </ol>
      );
    } else {
      return (
        <div className="space-y-2">
          {Object.keys(data).map((key) => {
            const value = data[key];

            // Пропускаем ключи с пустыми значениями
            if (isEmpty(value)) {
              return null;
            }

            const label = columns.find((col) => col.key === key)?.label || key;

            return (
              <div key={key}>
                <strong>{label}:</strong>{" "}
                <span>
                  {typeof value === "boolean" ? (
                    value ? "✅" : "❌"
                  ) : typeof value === "object" ? (
                    <RenderData data={value} columns={columns} />
                  ) : urlRegex.test(value) ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
  } else {
    // Пропускаем пустые строки
    if (isEmpty(data)) {
      return null;
    }

    // Проверка булевого значения
    if (typeof data === "boolean") {
      return <span>{data ? "✅" : "❌"}</span>;
    }

    // Проверяем на ссылку
    if (typeof data === "string" && urlRegex.test(data)) {
      return (
        <a href={data} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {data}
        </a>
      );
    }

    return <span>{String(data)}</span>;
  }
};





export const RelatedDataModal: React.FC<RelatedDataModalProps> = ({
  isOpen,
  relatedName,
  relatedKey,
  cellItem,
}) => {
  // Получаем конфигурацию для указанного relatedName
  const relatedConfig = columnsConfig[relatedName as keyof typeof columnsConfig];


  // Проверяем наличие нужной конфигурации
  if (!relatedConfig) {
    console.error(`Не найдена конфигурация для таблицы с именем: ${relatedName}`);
    return null;
  }

  const { columns, apiMethod } = relatedConfig;

  const { data, isLoading, isError, refetch } = useQuery(
    ["relatedData", relatedKey],
    () => apiMethod(relatedKey),
    {
      staleTime: 0.05 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: isOpen && !!relatedKey,
    }
  );

  const handleRefetch = (newRelatedKey: any) => {
    refetch();
  };

  if (!isOpen) {
    return null;
  }
  

  return (
    <div className="modal-container">
      {isLoading ? (
        <div>Загрузка...</div>
      ) : isError ? (
        <div>Произошла ошибка при загрузке данных</div>
      ) : (
        <div className="space-y-4">
          {data && data.data ? (
            <div className="p-4 rounded-md">
              <RenderData data={data.data} columns={columns} />
            </div>
          ) : (
            <div>{cellItem}</div>
          )}
        </div>
      )}
    </div>
  );
};