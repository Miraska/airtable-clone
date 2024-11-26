import { create } from "zustand"
import IManagerState from "../../interface/IManagerState/IManagerState"

const useManagerStore = create<IManagerState>((set) => ({
  isOpen: false,
  openManagerTable: () => set(() => ({isOpen: true})),
  closeManagerTable: () => set(() => ({isOpen: false}))
}))

export default useManagerStore