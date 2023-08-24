import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  tableHeaders: string[] = ['Value', 'Type', 'Account Total Amount', 'Account Name', 'Customer Name'];
  loading: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.loading = true;
    this.accountService.getTransactions().subscribe((transactionData: Transaction[]) => {
      this.transactions = [ ...transactionData ];
      this.loading = false;
    });
  }

}
