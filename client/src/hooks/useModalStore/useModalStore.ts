import { create } from "zustand";

interface IModalState {
  isOpen: boolean;
  modalHeader: string;
  handlerModal: (header?: string) => void;
}

const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  modalHeader: "",
  handlerModal: (header?:string) => set((store) => (
    {
      isOpen: !store.isOpen,
      modalHeader: header,
    }
  )),
}))

export default useModalStore