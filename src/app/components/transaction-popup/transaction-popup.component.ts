import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ErrorData } from 'src/app/data/errorData';
import { TransactionType } from 'src/app/enums/transactionType.enum';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.scss']
})
export class TransactionPopupComponent implements OnInit {
  @Input() accountId: number | undefined;
  @Output() closePopupEvent =  new EventEmitter<void>();
  @Output() successMessageEvent = new EventEmitter<string>();

  transactionButtonText: string = 'Select a Transaction Option';
  transactionTypes = Object.values(TransactionType);
  dropdownOpen: boolean = false;
  loading: boolean = false;
  transactionAmount: number | undefined;
  errorMessage: string = '';

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.transactionButtonText = option;
    this.dropdownOpen = false;
  }

  disableApplyButton() {
    return this.transactionButtonText !== 'Select a Transaction Option' && this.transactionAmount;
  }

  cancel() {
    this.closePopupEvent.emit();
  }

  apply() {
    let amountToSend: number = 0;

    switch(this.transactionButtonText) {
      case TransactionType.Deposit:
        amountToSend = this.transactionAmount!!;
        break;
      case TransactionType.Withdraw:
        amountToSend = -this.transactionAmount!!
        break;
    }

    this.loading = true;
    this.accountService.makeTransaction(this.accountId!!, amountToSend).subscribe({
      next: () => {
        this.loading = false;
        this.closePopupEvent.emit();
        this.successMessageEvent.emit('Transation successfully registered!');
      },
      error: (error: ErrorData) => {
        this.errorMessage = '';
        console.log(error);
        error.messages.forEach(message => this.errorMessage += message + '.');
        this.loading = false;
      }
    });
  }
}
