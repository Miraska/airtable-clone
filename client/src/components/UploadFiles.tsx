import React, { useState, useEffect, ChangeEvent, DragEvent, useRef } from "react";
import { toast } from "react-toastify";
import { api } from "../api/index";
import { FileDragAndDropArea } from "./FileDragAndDropArea";
import { LocalFileList } from "./LocalFileList";
import { ServerFileList } from "./ServerFileList";

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
      <form onSubmit={handleUpload}>
        <FileDragAndDropArea
          handleFileChange={handleFileChange}
          inputRef={inputRef}
        />
        {files.length > 0 && (
          <>
            <LocalFileList files={files} handleRemoveLocalFile={handleRemoveLocalFile} />
          </>
        )}
      </form>

      <ServerFileList
        serverFiles={serverFiles}
        handleDeleteFileById={handleDeleteFileById}
        editingFileId={editingFileId}
        editingFileName={editingFileName}
        startEditingFile={startEditingFile}
        setEditingFileName={setEditingFileName}
        handleUpdateFile={handleUpdateFile}
        cancelEditing={cancelEditing}
      />
    </div>
  );
};

export default UploadFiles;
