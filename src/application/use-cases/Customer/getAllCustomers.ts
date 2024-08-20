import { Customer } from "../../../domain/entities/Customer";
import { Error } from "../../../domain/entities/Error";
import { CustomerRepository } from "../../../domain/repositories/CustomerRepositories";

export class getAllCustomers {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<Customer[] | Error> {
    const customers = await this.customerRepository.getAllCustomers();
    return customers;
  }
}
