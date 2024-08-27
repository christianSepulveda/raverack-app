import { Table } from "../entities/Table";
import { Error } from "../entities/Error";

export interface TableRepository {
  findAll(): Promise<Table[] | Error>;
  updateStatus(): Promise<Table | Error>;
  save(): Promise<Table | Error>;
}
