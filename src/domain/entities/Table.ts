export interface Table {
  id: string;
  number: number;
  capacity: number;
  customerId?: string;
}

export interface TableInitValues {
  number: number;
  state: string;
}

export enum TableState {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  RESERVED = "reserved",
}
