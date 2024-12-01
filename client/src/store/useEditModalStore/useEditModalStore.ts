import { create } from "zustand";

interface IEditModalState {
  openEdit: boolean;
  handlerEdit: (state?: boolean) => void;
}

const useEditModalStore = create<IEditModalState>((set) => ({
  openEdit: false,
  handlerEdit: (state?: boolean) => set(() => (
    {
      openEdit: state
    }
  )),
}))

export default useEditModalStore