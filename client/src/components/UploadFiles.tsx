import React, {
  useState,
  useEffect,
  ChangeEvent,
  DragEvent,
  useRef,
} from "react";
import { toast } from "react-toastify";
import { api } from "../api/index";
import { Trash2 } from "lucide-react";

interface Props {
  editingHandler: (state: boolean) => void;
  data: FileData;
  typeCell: string;
  orderId: number;
}

interface FileData {
  id: string;
  originalname: string;
  filename: string;
  type: string;
  orderId: string;
}

const UploadFiles: React.FC<Props> = ({
  editingHandler,
  typeCell,
  orderId,
  data
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [serverFiles, setServerFiles] = useState<FileData[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      if (!orderId) return;
      try {
        const res = await api.files.getByOrderId(orderId);
        if (res.status === 200) {
          if (
            res.data.message &&
            res.data.message === "No files found for this orderId"
          ) {
            setServerFiles([]);
          } else {
            setServerFiles(res.data);
          }
        }
      } catch (error: any) {
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
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const updateServerFilesList = async () => {
    if (orderId) {
      try {
        const updatedFilesRes = await api.files.getByOrderId(orderId);
        if (updatedFilesRes.status === 200) {
          if (
            updatedFilesRes.data.message &&
            updatedFilesRes.data.message === "No files found for this orderId"
          ) {
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
      const res = await api.files.uploadMultiple(formData);
      if (res.status === 200) {
        toast.success("Файлы успешно отправлены!");
        await updateServerFilesList();
        setFiles([]);
      } else {
        console.log("Ошибка", res);
        throw new Error();
      }
    } catch (error) {
      console.error("Ошибка при отправке файлов:", error);
      toast.error("Ошибка при отправке файлов.");
    } finally {
      editingHandler(false);
    }
  };

  const handleDeleteFileById = async (fileId: string) => {
    try {
      const res = await api.files.deleteById(fileId);
      if (res.status === 200) {
        if (res.data.message && res.data.message === "File not found") {
          // Не делаем ничего
        } else {
          toast.success("Файл успешно удалён!");
          setServerFiles((prev) => prev.filter((file) => file.id !== fileId));
        }
      }
    } catch (error) {
      console.error("Ошибка при удалении файла:", error);
      toast.error("Ошибка при удалении файла.");
    }
  };

  const startEditingFile = (file: FileData) => {
    setEditingFileId(file.id);
    setEditingFileName(file.originalname);
  };

  const handleUpdateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFileId) return;

    const fileToUpdate = serverFiles.find((f) => f.id === editingFileId);
    if (!fileToUpdate) {
      setEditingFileId(null);
      setEditingFileName("");
      return;
    }

    try {
      const res = await api.files.updateById(editingFileId, {
        originalname: editingFileName,
      });
      if (res.status === 200) {
        if (res.data.message && res.data.message === "File not found") {
          setEditingFileId(null);
          setEditingFileName("");
        } else {
          toast.success("Файл успешно обновлён!");
          setServerFiles((prev) =>
            prev.map((file) =>
              file.id === editingFileId
                ? { ...file, originalname: editingFileName }
                : file
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
    <div className="space-y-4">
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
          {files.length > 0 && (
            <form onSubmit={() => console.log(data)}>
              <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded shadow-sm text-sm flex justify-between items-center truncate"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="submit"
                      onClick={() => handleRemoveLocalFile(index)}
                      className="p-1 text-gray-500 dark:text-gray-300 hover:text-red-600 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </form>
          )}
        </div>
        {files.length > 0 && (
          <span className="p-2 my-4 bg-green-500 rounded shadow-sm text-sm flex justify-between items-center truncate">
            Теперь вы можете загрузить файлы.
          </span>
        )}
      </div>
    </div>
  );
};

export default UploadFiles;
