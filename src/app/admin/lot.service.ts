import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LotService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async getLots(productId: any) {
    const resp = await this.authHttp.get(`${this.url}/admin/lots/product-lots/${productId}`).toPromise();
    return resp.json();
  }

  async saveLots(productId: any, lotNo: any, cost: any, price: any) {
    const resp = await this.authHttp.post(`${this.url}/admin/lots/product-lots/${productId}`, {
      lotNo: lotNo,
      cost: cost,
      price: price
    }).toPromise();
    return resp.json();
  }

  async updateLots(lotId: any, lotNo: any, cost: any, price: any) {
    const resp = await this.authHttp.put(`${this.url}/admin/lots/${lotId}`, {
      lotNo: lotNo,
      cost: cost,
      price: price
    }).toPromise();
    return resp.json();
  }

}
