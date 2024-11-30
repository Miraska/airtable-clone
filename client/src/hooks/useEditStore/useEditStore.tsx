import { create } from "zustand";

interface IEditState {
  editId: number;
  editData: [];
  editHeader: [];
  handlerEditStore: (newId?: number, newData?: [], headers?: []) => void;
}

const useEditStore = create<IEditState>((set) => ({
  editId: 0,
  editData: [],
  editHeader: [],
  handlerEditStore: (newId?: number, newData?: [], headers?: []) => set(() => (
    {
      editId: newId,
      editData: newData,
      editHeader: headers
    }
  )),
}))

export default useEditStore