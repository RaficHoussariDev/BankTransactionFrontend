import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/interfaces/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  loading: boolean = false;
  showTransactionPopup: boolean = false;
  showAlertComponent: boolean = false;
  accountIdInput: number | undefined;
  transactionSuccessMessage: string | undefined;
  accounts: Account[] = [];
  tableHeaders: string[] = ['Rank', 'Account Name', 'Amount', 'Customer Name', ''];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.loading = true;
    this.accountService.getAccounts().subscribe((accounts: Account[]) => {
      this.accounts = [ ...accounts ];
      this.loading = false;
    });
  }

  displayTransactionPopup(accountId: number) {
    this.accountIdInput = accountId;
    this.showTransactionPopup = true;
  }

  onCancelEventHandler() {
    this.showTransactionPopup = false;
  }

  onSuccessMessageEventHandler(event: string) {
    this.transactionSuccessMessage = event;
    this.showAlertComponent = true;
    this.getAccounts();

    setTimeout(() => {
      this.showAlertComponent = false;
    }, 2000);
  }
}
