import React from "react";
import { Button } from "./Button";
import UploadFiles from "./UploadFiles";

interface Props {
  handleSave: () => Promise<void>;
  setIsEditing: (val: boolean) => void;
  column: { key: string; label: string; type: string; readonly?: boolean };
  data: any;
}

export const CellModalFileEditForm: React.FC<Props> = ({
  handleSave,
  setIsEditing,
  column,
  data,
}) => {
  return (
      <div className="space-y-4">
        <UploadFiles
          editingHandler={setIsEditing}
          typeCell={column.key}
          orderId={data?.id}
          data={data}
        />
      </div>
  );
};
