import React, { useEffect, useState } from "react";
import { CustomerController } from "../../../../infraestucture/api/CustomerController";
import CustomersScreen from "../../../screens/Config/Customers/CustomersScreen";
import { getAllCustomers } from "../../../../application/use-cases/Customer/getAllCustomers";
import { Customer } from "../../../../domain/entities/Customer";
import { Error } from "../../../../domain/entities/Error";

type Props = {};

const CustomersContainer = (props: Props) => {
  const customerRepository = new CustomerController();
  const getCustomers = new getAllCustomers(customerRepository);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<Error>({ error: false, message: "" });

  const handleGetCustomers = async () => {
    const response = (await getCustomers.execute()) as Customer[] & Error;

    if (response.length > 0) {
      setFilteredCustomers(response);
      setCustomers(response);
      return;
    }

    if (response.error) {
      setError({
        error: true,
        message: response.message,
        status: response.status,
      });
    }
  };

  const filterCustomers = () => {
    const result = customers.filter((customer) => {
      const fullname = customer.fullname.toLowerCase();
      const rut = customer.rut.toLowerCase();
      const searchLower = search.toLowerCase();

      return fullname.includes(searchLower) || rut.includes(searchLower);
    });

    setFilteredCustomers(result);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredCustomers(customers);
      return;
    }

    filterCustomers();
  }, [search]);

  useEffect(() => {
    handleGetCustomers();
  }, []);

  return (
    <CustomersScreen
      customers={filteredCustomers}
      error={error}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default CustomersContainer;
