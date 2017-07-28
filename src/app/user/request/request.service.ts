import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async saveRequest(requestDate: any, warehouseId: any, products: any[]) {
    const resp = await this.authHttp.post(`${this.url}/users/request`, {
      requestDate: requestDate,
      warehouseId: warehouseId,
      products: products
    }).toPromise();
    return resp.json();
  }

  async getRequest() {
    const resp = await this.authHttp.get(`${this.url}/users/request`).toPromise();
    return resp.json();
  }

  async removeRequest(requestId: any) {
    const resp = await this.authHttp.delete(`${this.url}/users/request/${requestId}`).toPromise();
    return resp.json();
  }

}
