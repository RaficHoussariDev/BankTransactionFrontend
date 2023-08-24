import { TransactionType } from "../enums/transactionType.enum";
import { AccountData } from "./accountData";

export interface TransactionData {
  amount: number,
  type: TransactionType,
  account: AccountData
}
