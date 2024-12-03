export interface IOrder {
  id: number | null;
  autonumber: number | null;
  status: string;
  order_number: number ;
  manager: string[];
  reviewer: string[] | null;
  date: string;
  date_hired: string | null;
  contragent: string;
  agent: string[];
  client: string[];
  client_inn: string | null;
  name_agency: string;
  swift_code: string | null;
  country: string;
  calc_condition: string | null;
  type_transaction: string | null;
  number_receiving: number | null;
  date_instruction: string | null;
  currency: string | null;
  sum_order: number | null;
}

export interface IAgent {
  id?: number;
  name: string | null;
  orders: number[] | null | string;
}

export interface IClient {
  id?: number;
  name: string;
  inn: number | null | string;
  orders: number[] | null | string;
}

export interface IContragent {
  id?: number;
  name: string | null;
  orders: number[] | null | string;
}

export interface ICountry {
  id?: number;
  name: string | null;
  code: number | null | string;
  full_name: string | null;
  orders: number[] | null | string;
}

export interface IManager {
  id?: number;
  name: string | null;
  tel: string | null;
  date: string | null;
  orders: string[] | null;
  review_table: number[] | null | string;
}

export interface ISubagentPayer {
  id?: number;
  name: string | null;
  subagents: string[] | null | string;
  orders: number[] | null | string;
}

export interface ISubagent {
  id?: number;
  name: string | null;
  payers: string[] | null | string;
  orders: number[] | null | string;
}