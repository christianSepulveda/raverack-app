import { Table, TableInitValues } from "../../domain/entities/Table";
import { Error } from "../../domain/entities/Error";
import { TableRepository } from "../../domain/repositories/TableRepositories";
import makeFetch from "../config/makeFetch";

export class TableController implements TableRepository {
  async save(
    initValues: TableInitValues,
    tableCapacityNumber: number
  ): Promise<Table | Error> {
    const body = {
      number: initValues.number,
      state: initValues.state,
      tableCapacityNumber,
    };

    const response = await makeFetch("table/create", "POST", body);

    const error: Error = {
      error: true,
      message: "No se pudo crear la mesa.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }
}
