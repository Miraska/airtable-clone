import React, { useState, useEffect, ChangeEvent, DragEvent, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "./Button";

interface Props {
  editingHandler: (state: boolean) => void;
  typeCell: string;
  orderId: number;
}

interface FileData {
  _id: string;          // id файла в базе
  originalname: string; // оригинальное имя файла
  filename: string;     // имя файла на сервере
  type: string;         // тип файла
  orderId: string;      // orderId, к которому относится файл
}

const UploadFiles: React.FC<Props> = ({ editingHandler, typeCell, orderId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [serverFiles, setServerFiles] = useState<FileData[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      if (!orderId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/files/order/${orderId}`, {
          headers: {
            'ngrok-skip-browser-warning': '1',
          },
        });

        if (res.status === 200) {
          if (res.data.message && res.data.message === "No files found for this orderId") {
            setServerFiles([]);
          } else {
            setServerFiles(res.data);
          }
        }
      } catch (error: any) {
        // Если ответ от сервера 404, это значит, что просто нет файлов. Тогда не выводим никакие ошибки.
        if (error.response && error.response.status === 404) {
          setServerFiles([]);
        } else {
          console.error("Ошибка при получении списка файлов:", error);
          toast.error("Ошибка при получении списка файлов.");
        }
      }
    };
    fetchFiles();
  }, [orderId]);

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

  const handleRemoveLocalFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Выберите файлы перед отправкой.");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("orderId", orderId.toString());
    formData.append("type", typeCell);

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/api/files/upload-multiple", formData, {
        headers: {
          'Content-Type': "multipart/form-data",
          'ngrok-skip-browser-warning': '1',
        },
      });
      if (res.status === 200) {
        toast.success("Файлы успешно отправлены!");
        // Обновляем список файлов с сервера
        if (orderId) {
          try {
            const updatedFilesRes = await axios.get(`http://localhost:5000/api/files/order/${orderId}`, {
              headers: {
                'ngrok-skip-browser-warning': '1',
              },
            });
            if (updatedFilesRes.status === 200) {
              if (updatedFilesRes.data.message && updatedFilesRes.data.message === "No files found for this orderId") {
                setServerFiles([]);
              } else {
                setServerFiles(updatedFilesRes.data);
              }
            }
          } catch (error: any) {
            if (error.response && error.response.status === 404) {
              setServerFiles([]);
            } else {
              console.error("Ошибка при обновлении списка файлов:", error);
              toast.error("Ошибка при обновлении списка файлов.");
            }
          }
        }
        setFiles([]); // Очищаем локальный список файлов
      } else {
        console.log("Ошибка", res);
        throw new Error();
      }
    } catch (error) {
      console.error("Ошибка при отправке файлов:", error);
      toast.error("Ошибка при отправке файлов.");
    } finally {
      setIsLoading(false);
      editingHandler(false);
    }
  };

  const handleDeleteFileById = async (fileId: string) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/files/id/${fileId}`, {
        headers: {
          'ngrok-skip-browser-warning': '1',
        },
      });
      if (res.status === 200) {
        // Если сервер вернул сообщение о том, что файл не найден
        if (res.data.message && res.data.message === "File not found") {
          // Не выводим сообщение, просто ничего не делаем.
        } else {
          toast.success("Файл успешно удалён!");
          setServerFiles((prev) => prev.filter((file) => file._id !== fileId));
        }
      }
    } catch (error) {
      console.error("Ошибка при удалении файла:", error);
      toast.error("Ошибка при удалении файла.");
    }
  };

  const startEditingFile = (file: FileData) => {
    setEditingFileId(file._id);
    setEditingFileName(file.originalname);
  };

  const handleUpdateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFileId) return;
    
    // Проверяем, существует ли файл, который мы собираемся обновить, в списке serverFiles
    const fileToUpdate = serverFiles.find((f) => f._id === editingFileId);
    if (!fileToUpdate) {
      setEditingFileId(null);
      setEditingFileName("");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/files/${editingFileId}`, {
        originalname: editingFileName
      },{
        headers: {
          'ngrok-skip-browser-warning': '1',
        },
      });

      if (res.status === 200) {
        if (res.data.message && res.data.message === "File not found") {
          setEditingFileId(null);
          setEditingFileName("");
        } else {
          toast.success("Файл успешно обновлён!");
          setServerFiles((prev) =>
            prev.map((file) =>
              file._id === editingFileId ? { ...file, originalname: editingFileName } : file
            )
          );
          setEditingFileId(null);
          setEditingFileName("");
        }
      } else {
        console.log("Ошибка при обновлении файла:", res);
        toast.error("Ошибка при обновлении файла.");
      }
    } catch (error) {
      console.error("Ошибка при обновлении файла:", error);
      toast.error("Ошибка при обновлении файла.");
    }
  };

  const cancelEditing = () => {
    setEditingFileId(null);
    setEditingFileName("");
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
                      type="button"
                      onClick={() => handleRemoveLocalFile(index)}
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

        {serverFiles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Загруженные файлы</h2>
            <ul className="space-y-2">
              {serverFiles.map((file) => (
                <li
                  key={file._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-200 dark:bg-gray-800 p-2 rounded"
                >
                  {editingFileId === file._id ? (
                    <form className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full" onSubmit={handleUpdateFile}>
                      <input
                        className="flex-grow p-1 border border-gray-400 rounded"
                        value={editingFileName}
                        onChange={(e) => setEditingFileName(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">Сохранить</Button>
                        <Button type="button" onClick={cancelEditing} className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded">Отмена</Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <span className="truncate flex-1">{file.originalname}</span>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => startEditingFile(file)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Редактировать
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleDeleteFileById(file._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Удалить
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="primary"
            className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
            onClick={() => editingHandler(false)}
          >
            Закрыть
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UploadFiles;
