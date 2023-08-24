import { CustomerData } from "./customerData";

export interface AccountData {
  id: number,
  amount: number,
  accountName: string,
  customer: CustomerData
}
