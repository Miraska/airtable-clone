import { create } from "zustand";

interface IModalState {
  isOpen: boolean,
  modalHeader: string,
  modalData: object[],
  handlerModal: (state?: boolean, header?:string) => void,
  setDataModal: (data: []) => void
}

const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  modalHeader: "",
  modalData: [],
  handlerModal: (state?:boolean, header?:string) => set(() => (
    {
      isOpen: state,
      modalHeader: header
    }
  )),
  setDataModal: (data: []) => set(() => ({modalData: data}))
}))

export default useModalStore