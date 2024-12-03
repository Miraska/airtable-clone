import React from "react";
import { useQuery } from "react-query";
import { api } from "../api";
import { Button } from "./Button";

interface RelatedDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  relatedName: string;
  relatedKey: any;
  cellItem: any;
}

// Рекурсивный компонент для отображения данных
const RenderData = ({ data }: { data: any }) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <ol className="list-disc ml-4">
          {data.map((item, index) => (
            <li key={index}>
              <RenderData data={item} />
            </li>
          ))}
        </ol>
      );
    } else {
      return (
        <div className="space-y-2">
          {Object.keys(data).map((key) => (
            <div>
              {key}: <RenderData data={data[key]} />
            </div>
          ))}
        </div>
      );
    }
  } else {
    return <span>{String(data)}</span>;
  }
};

export const RelatedDataModal: React.FC<RelatedDataModalProps> = ({
  isOpen,
  onClose,
  relatedName,
  relatedKey,
  cellItem
}) => {
  const { data, isLoading, isError } = useQuery(
    ["relatedData", relatedKey],
    () => {
      if(relatedName == "subagents")
        return api.subagents.getById(relatedKey);

      else if(relatedName == "payers")
        return api.subagentPayers.getById(relatedKey);

      else if(relatedName == "managers")
        return api.managers.getById(relatedKey);

      else if(relatedName == "orders")
        return api.orders.getById(relatedKey);

      else if(relatedName == "clients")
        return api.clients.getById(relatedKey);
    }
  );

  const showData = () => {
    console.log(data);
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
                <RenderData data={data.data} />
              </div>
            ) : (
              <div>{cellItem}</div>
            )}
          </div>
        )}
      </div>
  );
};
