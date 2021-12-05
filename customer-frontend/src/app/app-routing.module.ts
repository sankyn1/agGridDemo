import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCustomerComponent } from './components/add-edit-customer/add-edit-customer.component';
import { CustomerMasterComponent } from './components/customer-master/customer-master.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/customer-master'
  },
  {
    path: 'customer-master',
    component: CustomerMasterComponent
  },
  {
    path: 'add-edit-customer',
    component: AddEditCustomerComponent
  },
  {
    path: 'add-edit-customer/:id',
    component: AddEditCustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
