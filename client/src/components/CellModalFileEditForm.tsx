import React from "react";
import { Button } from "./Button";
import UploadFiles from "./UploadFiles";

interface Props {
  handleSubmit: any;
  handleSave: () => Promise<void>;
  setIsEditing: (val: boolean) => void;
  column: { key: string; label: string; type: string; readonly?: boolean };
  data: any;
}

export const CellModalFileEditForm: React.FC<Props> = ({
  handleSubmit,
  handleSave,
  setIsEditing,
  column,
  data,
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="space-y-4">
        <UploadFiles
          editingHandler={setIsEditing}
          typeCell={column.key}
          orderId={data?.id}
          data={data}
        />

        <div className="flex justify-end gap-2">
          <Button
            variant="primary"
            className="px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition-all duration-300 text-white"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Закрыть
          </Button>
          <Button type="submit">Сохранить</Button>
        </div>
      </div>
    </form>
  );
};
