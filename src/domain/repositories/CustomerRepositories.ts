import { Customer } from "../entities/Customer";
import { Error } from "../entities/Error";

export interface CustomerRepository {
  getAllCustomers(): Promise<Customer[] | Error>;
}
