import React, { DragEvent, ChangeEvent, useState } from "react";

interface Props {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const FileDragAndDropArea: React.FC<Props> = ({
  handleFileChange,
  inputRef,
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (inputRef.current) {
      inputRef.current.files = new DataTransfer().files;
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[150px] bg-gray-100 dark:bg-transparent px-4">
      <div
        className={`w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-all ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600 text-lg mb-4 dark:text-gray-400">
          Перетащите файлы сюда или выберите ниже:
        </p>
        <input
          type="file"
          id="file_input"
          className="hidden"
          multiple
          onChange={handleFileChange}
          ref={inputRef}
        />
        <label
          htmlFor="file_input"
          className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
        >
          Выбрать файлы
        </label>
      </div>
    </div>
  );
};
