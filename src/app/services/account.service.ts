import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Account } from '../interfaces/account';
import { environment } from 'src/environments/environment';
import { AccountData } from '../data/accountData';
import { ErrorData } from '../data/errorData';
import { TransactionData } from '../data/transactionData';
import { Transaction } from '../interfaces/transaction';
import { TransactionAccount } from '../interfaces/transactionAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.httpClient.get<AccountData[]>(
      environment.baseUrl + '/accounts'
    )
    .pipe(
      map((accountData: AccountData[]) => {
        return accountData
          .sort((a1, a2) => a2.amount - a1.amount)
          .map((account, index) => this.mapAccount(account, index))
      })
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<TransactionData[]>(
      environment.baseUrl + '/accounts/transactions'
    )
    .pipe(
      map((transactionData: TransactionData[]) => {
        return transactionData
          .map((transaction, index) => this.mapTransaction(transaction))
      })
    );
  }

  makeTransaction(accountId: number, amount: number): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseUrl + '/accounts/transaction/' + accountId,
      {},
      {
        params: new HttpParams().set('amount', amount)
      }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorResponse: ErrorData = error.error;
        return throwError(() => errorResponse);
      })
    );
  }

  mapAccount(accountData: AccountData, index: number): Account {
    let account: Account = {
      id: accountData.id,
      rank: index + 1,
      amount: accountData.amount,
      accountName: accountData.accountName,
      customerName: accountData.customer.name
    };

    return account;
  }

  mapTransaction(transactionData: TransactionData): Transaction {
    let transactionAccount: TransactionAccount = {
      amount: transactionData.account.amount,
      accountName: transactionData.account.accountName,
      customerName: transactionData.account.customer.name
    };

    let transaction: Transaction = {
      value: transactionData.amount,
      type: transactionData.type,
      account: transactionAccount
    };

    return transaction;
  }
}
