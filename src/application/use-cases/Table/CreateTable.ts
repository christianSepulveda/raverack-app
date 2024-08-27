import { Table, TableState } from "../../../domain/entities/Table";
import { Error } from "../../../domain/entities/Error";
import { TableRepository } from "../../../domain/repositories/TableRepositories";

export class createTable {
  private tableRepository: TableRepository;

  constructor(tableRepository: TableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute(
    tableNumber: number,
    tableCapacity: number
  ): Promise<Table | Error> {
    const tables = await this.tableRepository.save(
      { number: tableNumber, state: TableState.AVAILABLE },
      tableCapacity
    );
    return tables;
  }
}
