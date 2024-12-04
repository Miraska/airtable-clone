import React, { useEffect, useState, useMemo } from "react";
import columnsConfig from "../lib/tableColumnsData/index";

interface RenderDataProps {
  data: any;
  columns: { key: string; label: string }[];
  setNewModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewPath: React.Dispatch<React.SetStateAction<string>>;
  setNewData: React.Dispatch<React.SetStateAction<any>>;
  setNewKey: React.Dispatch<React.SetStateAction<string>>;
  parentPath?: string;
  parentKey?: string;
}

const RenderData: React.FC<RenderDataProps> = ({
  data,
  columns,
  parentPath = "",
  parentKey = "",
  setNewModalIsOpen,
  setNewPath,
  setNewData,
  setNewKey,
}) => {
  const [namesCache, setNamesCache] = useState<Record<string, string>>({});
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

  const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
  };

  const getNamesOfId = async (parentKey: string, id: any) => {
    if (namesCache[id]) {
      return namesCache[id];
    }

    const relatedConfig = columnsConfig[parentKey as keyof typeof columnsConfig];
    if (!relatedConfig) {
      console.error(`Не найдена конфигурация для таблицы с именем: ${parentKey}`);
      return;
    }

    const { apiMethod } = relatedConfig;
    try {
      const result = (await apiMethod(id)).data;
      if (result && result.id === id) {
        const name = result.name || result.id;
        setNamesCache((prevCache) => ({ ...prevCache, [id]: name }));
        return name;
      }
      return "Неизвестно";
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Ошибка";
    }
  };

  const [resolvedNames, setResolvedNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchNames = async () => {
      if (Array.isArray(data)) {
        const uniqueIds = Array.from(new Set(data));
        const namesPromises = uniqueIds.map((id) => getNamesOfId(parentKey, id));
        const names = await Promise.all(namesPromises);
        const namesMap: Record<string, string> = {};
        uniqueIds.forEach((id, index) => {
          namesMap[id] = names[index] || id;
        });
        setResolvedNames(namesMap);
      }
    };
    fetchNames();
  }, [data, parentKey]);

  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      if (isEmpty(data)) {
        return null;
      }
      return (
        <ol className="list-none space-y-4 ml-0">
          {data.map((item, index) => (
            <li key={index}>
              <button
                className="text-blue-600 font-semibold hover:text-blue-800 focus:outline-none bg-white shadow-sm rounded-lg p-2 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition duration-200 ease-in-out"
                onClick={async () => {
                  const relatedConfig =
                    columnsConfig[parentKey as keyof typeof columnsConfig];

                  if (!relatedConfig) {
                    console.error(
                      `Не найдена конфигурация для таблицы с именем: ${parentKey}`
                    );
                    return;
                  }

                  const { apiMethod } = relatedConfig;

                  try {
                    const result = await apiMethod(item);
                    setNewModalIsOpen(true);
                    setNewPath(parentKey);
                    setNewData(result.data);
                    setNewKey(result.data.id);
                  } catch (error) {
                    console.error("Error fetching data:", error);
                  }
                }}
              >
                {resolvedNames[item] || "Загрузка..."}
              </button>
            </li>
          ))}
        </ol>
      );
    } else {
      return (
        <div className="space-y-2">
          {Object.keys(data).map((key) => {
            const value = data[key];

            if (isEmpty(value)) {
              return null;
            }

            const label = columns.find((col) => col.key === key)?.label || key;
            const currentPath = parentPath ? `${parentPath}.${key}` : key;

            return (
              <div key={key}>
                <strong>{label}:</strong>{" "}
                <span>
                  {typeof value === "boolean" ? (
                    value ? (
                      "✅"
                    ) : (
                      "❌"
                    )
                  ) : typeof value === "object" ? (
                    <RenderData
                      data={value}
                      columns={columns}
                      parentPath={currentPath}
                      parentKey={key}
                      setNewModalIsOpen={setNewModalIsOpen}
                      setNewPath={setNewPath}
                      setNewData={setNewData}
                      setNewKey={setNewKey}
                    />
                  ) : urlRegex.test(value) ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
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
    if (isEmpty(data)) {
      return null;
    }

    if (typeof data === "boolean") {
      return <span>{data ? "✅" : "❌"}</span>;
    }

    if (typeof data === "string" && urlRegex.test(data)) {
      return (
        <a
          href={data}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {data}
        </a>
      );
    }

    return <span>{String(data)}</span>;
  }
};

export default RenderData;
