import { create } from "zustand"

interface IManagerState {
  isOpen: boolean,
  openManagerTable: () => void,
  closeManagerTable: () => void
}

const useManagerStore = create<IManagerState>((set) => ({
  isOpen: false,
  openManagerTable: () => set(() => ({isOpen: true})),
  closeManagerTable: () => set(() => ({isOpen: false}))
}))

export default useManagerStore