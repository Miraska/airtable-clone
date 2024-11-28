import { create } from "zustand";

type TableType = "agent" | "client" | "contragent" | "country" | "manager" | "order" | "subagent" | "subagent_payer"

interface TableStore {
  data: object[];
  setData: (newData: object[]) => void;
  currentTable: TableType;
  setCurrentTable: (tableName: TableType) => void
}

export const useTableStore = create<TableStore>((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  currentTable: "order",
  setCurrentTable: (tableName) => set({ currentTable: tableName })
}));