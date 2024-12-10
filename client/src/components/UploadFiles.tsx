import React, { useState, ChangeEvent, DragEvent } from "react";

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemoveFile = (e, indexToRemove: number) => {
    e.preventDefault();
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = () => {
    if (files.length > 0) {
      alert(`Файлы загружены: ${files.map((file) => file.name).join(", ")}`);
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 px-4 py-4">
      <div
        className={`w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-all ${
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600 text-lg mb-4">
          Перетащите файлы сюда или выберите ниже:
        </p>
        <input
          type="file"
          id="file_input"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <label
          htmlFor="file_input"
          className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
        >
          Выбрать файлы
        </label>
        {files.length > 0 && (
          <ul className="mt-4 space-y-2 text-gray-700">
            {files.map((file, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded shadow-sm text-sm flex justify-between items-center truncate"
              >
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-all text-xs"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {files.length > 0 && (
        <span className="p-2 my-4 bg-gray-200 rounded shadow-sm text-sm flex justify-between items-center truncate">Теперь вы можете загрузить файлы.</span>
      )}
    </div>
  );
};

export default FileUpload;
