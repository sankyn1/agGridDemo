import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustomerMasterComponent } from './components/customer-master/customer-master.component';
import { AddEditCustomerComponent } from './components/add-edit-customer/add-edit-customer.component';
import { CustomerMasterService } from './_services/customer-master.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonRendererComponent } from './components/grid-components/button-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerMasterComponent,
    AddEditCustomerComponent,
    ButtonRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CustomerMasterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
