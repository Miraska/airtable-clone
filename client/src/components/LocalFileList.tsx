import React from "react";
import { Trash2 } from "lucide-react";

interface Props {
  files: File[];
  handleRemoveLocalFile: (indexToRemove: number) => void;
}

export const LocalFileList: React.FC<Props> = ({ files, handleRemoveLocalFile }) => {
  return (
    <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
      {files.map((file, index) => (
        <li
          key={index}
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-sm flex justify-between items-center truncate"
        >
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => handleRemoveLocalFile(index)}
            className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-colors"
            title="Удалить"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};
