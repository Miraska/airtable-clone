import React, { useState, ChangeEvent, DragEvent, useRef } from "react";
import { Button } from "./Button";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  editingHandler: (state: boolean) => void
  typeCell: string
}

const FileUpload: React.FC<Props> = ({ editingHandler, typeCell }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
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

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Выберите файлы перед отправкой.");
      return
    }
    const formData = new FormData()
    files.forEach((file) => formData.append("files", file));
    formData.append("orderId", "1")
    formData.append("type", typeCell)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value); // Выведет имя каждого файла
    }
    console.log(formData)
    
    try {
      setIsLoading(true)
      const res = await axios.post("https://b6a8-91-107-100-96.ngrok-free.app/api/upload-multiple", formData, {
        headers: {
          'Content-Type': "multipart/form-data",
          'ngrok-skip-browser-warning': '1'
        },
      });
      if (res.status === 200) {
        toast.success("Файлы успешно отправлены!")
        console.log("Файлы успешно отправлены!")
        setIsLoading(false)
        setFiles([]); // Очищаем список файлов после успешной отправки
      } else {
        setIsLoading(false)
        console.log("Ошибка", res)
        throw new Error
      }
      editingHandler(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Ошибка при отправке файлов:", error);
      toast.error(`Ошибка при отправке файлов.`)
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center min-h-[150px] bg-gray-100 dark:bg-transparent px-4">
          <div
            className={`w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-all ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
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
            {files.length > 0 && (
              <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-sm flex justify-between items-center truncate"
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
            <span className="p-2 my-4 bg-green-500 rounded shadow-sm text-sm flex justify-between items-center truncate">Теперь вы можете загрузить файлы.</span>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="primary"
            className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
            onClick={() => editingHandler(false)}
          >
            Закрыть
          </Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Сохранение...' : 'Сохранить'}</Button>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
