import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StdService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async getWarehouses() {
    const resp = await this.authHttp.get(`${this.url}/std/warehouses`).toPromise();
    return resp.json();
  }

  async getProductList(warehouseId: any) {
    const resp = await this.authHttp.get(`${this.url}/std/products/${warehouseId}`).toPromise();
    return resp.json();
  }

  async searchProducts(warehouseId: any, query: any) {
    const resp = await this.authHttp.post(`${this.url}/std/products/${warehouseId}`, {
      query: query
    }).toPromise();
    return resp.json();
  }

}
