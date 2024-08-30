import { Customer } from "./Customer";

export interface BoxNumber {
  id?: string;
  boxnumber: number;
  customer: Customer | null;
  available: boolean;
  companyid: string;
}
