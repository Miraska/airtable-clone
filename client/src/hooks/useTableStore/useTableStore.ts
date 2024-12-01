import { create } from "zustand";

export type TableType = "agent" | "client" | "contragent" | "country" | "manager" | "order" | "subagent" | "subagent_payer"

interface TableStore {
  dataTable: object[];
  bufferTable: object[];
  headerTable: [],
  setDataBuffer: (newData: object[]) => void;
  currentTable: TableType;
  setCurrentTable: (tableName: TableType) => void
}

export const useTableStore = create<TableStore>((set) => ({
  dataTable: [],
  bufferTable: [],
  headerTable: [],
  setDataBuffer: (newData: object[]) => set({ dataTable: newData }),
  currentTable: "subagent",
  setCurrentTable: (tableName) => set({ currentTable: tableName })
}));