import { Customer } from "../../domain/entities/Customer";
import { Error } from "../../domain/entities/Error";
import { CustomerRepository } from "../../domain/repositories/CustomerRepositories";
import makeFetch from "../config/makeFetch";

export class CustomerController implements CustomerRepository {
  async getAllCustomers(): Promise<Customer[] | Error> {
    const response = await makeFetch("customer/all", "GET");

    const error: Error = {
      error: true,
      message: "No se pudieron obtener los clientes.",
      status: response.status,
    };

    if (response.status !== 200) return error;
    return response.data;
  }
}
