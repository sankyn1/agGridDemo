import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMaster } from 'src/app/_models/customer-master';
import { APIResponse } from 'src/app/_models/response';
import { CustomerMasterService } from 'src/app/_services/customer-master.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

  myDateValue: Date;
  Mode: string = 'Add';
  constructor(private customerService: CustomerMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  UserForm: FormGroup;
  isSubmit: boolean;

  ngOnInit(): void {
    this.InitilizeUserForm();
    this.activatedRoute.paramMap.subscribe(param => {
      const userID = +param.get('id');
      if (userID) {
        this.Mode = "Edit";
        this.UserForm.controls['UserID'].setValue(userID);
        this.getCustomerById(userID);
      }
    })
  }
  private InitilizeUserForm() {
    this.UserForm = new FormGroup({
      UserID: new FormControl(0),
      UserNames: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),

      EmailId: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      Gender: new FormControl('Male'),
      Address: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      MobileNo: new FormControl('', [
        Validators.required
      ]),
      Pincode: new FormControl('', [
        Validators.required
      ]),

    });

  }
  get f() { return this.UserForm.controls; }

  onSubmit(): boolean {
    this.isSubmit = true;
    console.log(this.UserForm.value);
    if (this.UserForm.invalid) {
      return false;
    } else {
      if (this.Mode === 'Add') {
        this.AddUser();
      }
      else {
        this.UpdateUser();
      }
    }
  }

  private AddUser() {
    this.customerService
      .AddCustomer(this.UserForm.value)
      .subscribe((userData: APIResponse) => {
        if (userData.StatusCode == 200) {
          this.router.navigate(['/']);
        }
      });
  }

  private UpdateUser() {
    this.customerService
      .EditCustomer(this.UserForm.value)
      .subscribe((userData: APIResponse) => {
        if (userData.StatusCode == 200) {
          this.router.navigate(['/customer-master']);
        }
      });
  }





  private getCustomerById(UserID) {
    this.customerService
      .GetCustomersById(UserID)
      .subscribe((customerData: APIResponse) => {
        if (customerData.StatusCode == 200) {
          this.EditUser(customerData.Result);
        }
      });
  }

  private EditUser(customerData: CustomerMaster) {
    ;
    this.UserForm.patchValue({
      UserID: customerData.UserId,
      UserNames: customerData.UserNames,
      EmailId: customerData.EmailId,
      Gender: customerData.Gender,
      Address: customerData.Address,
      MobileNo: customerData.MobileNo,
      Pincode: customerData.Pincode
    })
  }
}
