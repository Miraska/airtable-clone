export interface ITable {
  id: number;
  name?: string;
}

export interface ICols {
  key: string;
  label: string;
}

export interface ISubagent extends ITable {
  subagent_payer?: Set<ISubagentPayer>;
  order: string;
}

export interface ISubagentPayer extends ITable {
  subagent: Set<ISubagent>;
  order: string;
}

export interface IStore {
  name: string;
  cols: object[];
  data: object[];
}

export interface ISubagentStore extends IStore {
  cols: ITableCol[];
  data: ISubagent[];
  addSubagentPayer: (newSubagentPayer: ISubagentPayer) => void;
}

export interface ITableCol {
  key: string;
  label: string;
}