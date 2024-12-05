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
  setSelectedCell?: React.Dispatch<any>;
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
  setSelectedCell,
}) => {
  const [namesCache, setNamesCache] = useState<Record<string, string>>({});
  const urlRegex = useMemo(() => /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i, []);

  const isEmpty = (value: any): boolean =>
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0);

  const getNamesOfId = async (parentKey: string, id: any) => {
    if (namesCache[id]) return namesCache[id];

    const relatedConfig = columnsConfig[parentKey as keyof typeof columnsConfig];
    if (!relatedConfig) {
      console.error(`No configuration found for table: ${parentKey}`);
      return "Unknown";
    }

    try {
      const result = (await relatedConfig.apiMethod(id)).data;
      const name = result?.name || result?.id || "Unknown";
      setNamesCache((prevCache) => ({ ...prevCache, [id]: name }));
      return name;
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Error";
    }
  };

  useEffect(() => {
    const fetchNames = async () => {
      if (!Array.isArray(data)) return;

      const uniqueIds = Array.from(new Set(data));
      const namesMap: Record<string, string> = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          namesMap[id] = await getNamesOfId(parentKey, id);
        })
      );

      setNamesCache((prev) => ({ ...prev, ...namesMap }));
    };

    fetchNames();
  }, [data, parentKey]);

  const renderValue = (value: any, key: string) => {
    if (isEmpty(value)) return null;

    if (typeof value === "boolean") return <span>{value ? "✅" : "❌"}</span>;

    if (typeof value === "string" && urlRegex.test(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {value}
        </a>
      );
    }

    if (typeof value === "object") {
      return (
        <RenderData
          data={value}
          columns={columns}
          parentPath={parentPath}
          parentKey={key}
          setNewModalIsOpen={setNewModalIsOpen}
          setNewPath={setNewPath}
          setNewData={setNewData}
          setNewKey={setNewKey}
          setSelectedCell={setSelectedCell}
        />
      );
    }

    return <span>{String(value)}</span>;
  };

  if (Array.isArray(data)) {
    const filteredData = data.filter((item) => !isEmpty(item));
    if (isEmpty(filteredData)) return null;

    return (
      <ol className="list-none space-y-4">
        {filteredData.map((item, index) => (
          <li key={index}>
            <button
              className="inline-flex items-center px-8 py-1 rounded-xl text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer hover:text-black-600 hover:bg-gray-300"
              onClick={async () => {
                const relatedConfig =
                  columnsConfig[parentKey as keyof typeof columnsConfig];

                if (!relatedConfig) {
                  console.error(`No configuration found for table: ${parentKey}`);
                  return;
                }

                try {
                  const result = await relatedConfig.apiMethod(item);
                  setNewModalIsOpen(true);
                  setNewPath(parentKey);
                  setNewData(result.data);
                  setNewKey(result.data.id);

                  // Update the selected cell
                  if (setSelectedCell) {
                    setSelectedCell({
                      data: result.data,
                      column: { key: parentKey, label: relatedConfig.label },
                      value: result.data.id,
                    });

                    // console.log('RenderData: Result.data, parentKey, relatedConfig.columns, result.data.id');
                    // console.log(result.data);
                    // console.log(parentKey);
                    // console.log(relatedConfig.label);
                    // console.log(result.data.id);
                  }
                } catch (error) {
                  console.error("Error fetching data:", error);
                }
              }}
            >
              {namesCache[item] || "Loading..."}
            </button>
          </li>
        ))}
      </ol>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <div className="space-y-2">
        {Object.entries(data)
          .filter(([, value]) => !isEmpty(value))
          .map(([key, value]) => {
            const label = columns.find((col) => col.key === key)?.label;
            return (
              <div key={key}>
                <strong>{label}:</strong> {renderValue(value, key)}
              </div>
            );
          })}
      </div>
    );
  }

  return renderValue(data, "");
};

export default RenderData;
