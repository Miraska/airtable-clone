import { create } from "zustand";
import { ICols } from "../../lib/interface/interface";

interface IEditState {
  editId: number;
  editData: [];
  editHeader: ICols | {};
  handlerEditStore: (newId?: number, newData?: [], headers?: ICols) => void;
}

const useEditStore = create<IEditState>((set) => ({
  editId: 0,
  editData: [],
  editHeader: {},
  handlerEditStore: (newId?: number, newData?: [], headers?: ICols) => set(() => (
    {
      editId: newId,
      editData: newData,
      editHeader: headers
    }
  )),
}))

export default useEditStore