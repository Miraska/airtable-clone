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
  order: number[] | null | string;
}

export interface IClient {
  id?: number;
  name: string | null;
  inn: number | null | string;
  order: number[] | null | string;
}

export interface IContragent {
  id?: number;
  name: string | null;
  order: number[] | null | string;
}

export interface ICountry {
  id?: number;
  name: string | null;
  code: number | null | string;
  full_name: string | null;
  order: number[] | null | string;
}

export interface IManager {
  id?: number;
  name: string | null;
  tel: string | null;
  date: string | null;
  order: string[] | null;
  review_table: number[] | null | string;
}

export interface ISubagentPayer {
  id?: number;
  name: string | null;
  subagent: string[] | null | string;
  order: number[] | null | string;
}

export interface ISubagent {
  id?: number;
  name: string | null;
  subagent_payer: string[] | null | string;
  order: number[] | null | string;
}