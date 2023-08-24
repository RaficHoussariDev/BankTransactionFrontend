import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactionsComponent } from "../components/transactions/transactions.component";
import { AccountsComponent } from "../components/accounts/accounts.component";

const routes: Routes = [
    {
      path: 'accounts',
      component: AccountsComponent
    },
    {
      path: 'transactions',
      component: TransactionsComponent
    },
    {
      path: '**',
      redirectTo: 'accounts'
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
