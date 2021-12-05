import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../_models/response';
import { CustomerMaster } from '../_models/customer-master';

@Injectable({
  providedIn: 'root'
})
export class CustomerMasterService {
  endPoint = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  GetAllCustomers() {
    return this.httpClient.get<APIResponse>(this.endPoint + 'Customer/all')
      .pipe(
        map((data: APIResponse) => {
          return data;
        })
      );
  }
  GetCustomersById(userId) {
    return this.httpClient.get<APIResponse>(this.endPoint + 'Customer/getcustomerbyid/'+userId)
      .pipe(
        map((data: APIResponse) => {
          return data;
        })
      );
  }

  AddCustomer(_customerMaster: CustomerMaster) {
    return this.httpClient.post(this.endPoint +'Customer/add', _customerMaster)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  EditCustomer(_customerMaster: CustomerMaster) {
    return this.httpClient.post(this.endPoint +'Customer/update', _customerMaster)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  DeleteCustomer(UserId) {
    return this.httpClient.delete(this.endPoint +'Customer/delete/' + UserId)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
