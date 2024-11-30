import { create } from "zustand";

interface IModalState {
  isOpen: boolean;
  modalHeader: string;
  handlerModal: (state?: boolean, header?: string) => void;
}

const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  modalHeader: "",
  handlerModal: (state?: boolean, header?:string) => set(() => (
    {
      isOpen: state,
      modalHeader: header,
    }
  )),
}))

export default useModalStore