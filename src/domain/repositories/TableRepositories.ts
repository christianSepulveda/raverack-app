import { Table, TableInitValues } from "../entities/Table";
import { Error } from "../entities/Error";

export interface TableRepository {
  /* findAll(): Promise<Table[]>;
  updateStatus(
    tableId: string,
    customerId?: string,
    tableCapacityNumber?: number
  ): Promise<Table | Error>; */
  save(
    initValues: TableInitValues,
    tableCapacityNumber: number
  ): Promise<Table | Error>;
}
