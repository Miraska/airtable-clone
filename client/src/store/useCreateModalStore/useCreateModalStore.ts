import { create } from "zustand";

interface ICreateModalState {
  isOpen: boolean;
  modalHeader: string;
  handler: (state?: boolean, header?: string) => void;
}

const useCreateModalStore = create<ICreateModalState>((set) => ({
  isOpen: false,
  modalHeader: "",
  handler: (state?: boolean, header?:string) => set(() => (
    {
      isOpen: state,
      modalHeader: header,
    }
  )),
}))

export default useCreateModalStore