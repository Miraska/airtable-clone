import { create } from "zustand";

interface IModalState {
  isOpen: boolean,
  handlerModal: (state: boolean) => void,
}

const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  handlerModal: (state?:boolean) => set(() => ({isOpen: state})),
}))

export default useModalStore