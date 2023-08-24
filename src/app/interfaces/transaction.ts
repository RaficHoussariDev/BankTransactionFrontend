import { TransactionType } from "../enums/transactionType.enum";
import { TransactionAccount } from "./transactionAccount";

export interface Transaction {
  value: number,
  type: TransactionType,
  account: TransactionAccount
}
