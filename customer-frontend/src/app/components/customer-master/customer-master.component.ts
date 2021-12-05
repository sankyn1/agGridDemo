import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { APIResponse } from 'src/app/_models/response';
import { CustomerMasterService } from 'src/app/_services/customer-master.service';
import { ButtonRendererComponent } from '../grid-components/button-renderer.component';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {

  frameworkComponents: any;
  columnDefs: ColDef[] = [
    { field: 'UserId',sortable: true },
    { field: 'UserNames',sortable: true,filter: true },
    { field: 'EmailId',sortable: true,filter: true },
    { field: 'Gender',sortable: true,filter: true },
    { field: 'Address',filter: true },
    { field: 'MobileNo',filter: true },
    { field: 'Pincode',filter: true },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onEditButtonClick.bind(this),
        icon: 'bi bi-pencil-square',
        class: ''
      },
      pinned: 'right',
      width: 50
    },
    {
      headerName: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteButtonClick.bind(this),
        icon: 'bi bi-trash',
        class: 'text-danger'
      },
      pinned: 'right',
      width: 50
    },
  ];
  rowData: any[];


  constructor(private customerService: CustomerMasterService, private router: Router) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit(): void {
    this.GetAllCustomers();
  }


  private GetAllCustomers() {
    this.customerService
      .GetAllCustomers()
      .subscribe((customerData: APIResponse) => {
        console.log(customerData);
        if (customerData.StatusCode == 200) {
          this.rowData = customerData.Result;
        }
      });
  }
  private onEditButtonClick(params): void {
    console.log(params.data.UserId);
    this.router.navigate(['/add-edit-customer/', params.data.UserId]);
  }
  private onDeleteButtonClick(params): void {
    const userId = params.data.UserId;
    this.customerService.DeleteCustomer(userId).subscribe((response: APIResponse) => {
      if (response.StatusCode == 200) {
        this.GetAllCustomers();
      }
    })
  }
}
