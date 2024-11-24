export interface AirtableRecord {
  id: string;
  [key: string]: any;
}

export interface LinkedRecord {
  id: string;
  table: string;
  value: string;
}

export interface TableField {
  name: string;
  type: string;
  options?: {
    foreignTableId?: string;
  };
}

export interface TableInfo {
  id: string;
  name: string;
}