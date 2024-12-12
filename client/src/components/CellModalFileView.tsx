import React from "react";
import { Trash2 } from "lucide-react";

interface FileData {
  _id?: string;
  id?: number;
  name?: string;
  fileUrl?: string;
  type: string;
  orderId?: string | number;
}

interface Props {
  data: any;
  column: { key: string; label: string; type: string; readonly?: boolean };
  handleDeleteFileById: (fileId: string | number) => void;
  handleSave: () => Promise<void>;
}

export const CellModalFileView: React.FC<Props> = ({
  data,
  column,
  handleDeleteFileById,
  handleSave,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        {data?.files && data.files.length > 0 ? (
          <ul className="space-y-2">
            {data?.files
              .filter((file: FileData) => file.type === column.key)
              .map((file: FileData) => (
                <li
                  key={file._id || file.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-200 dark:bg-gray-800 p-2 rounded"
                >
                  <span className="truncate flex-1">
                    {file.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      onClick={() => {
                        handleDeleteFileById(file.id || file.id!);
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
  );
};
