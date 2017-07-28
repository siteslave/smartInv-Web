
import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReceiveService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async getWarehouses() {
    const resp = await this.authHttp.get(`${this.url}/admin/receives/warehouses`).toPromise();
    return resp.json();
  }

  async getProductList() {
    const resp = await this.authHttp.get(`${this.url}/admin/receives/product-list`).toPromise();
    return resp.json();
  }

  async searchProducts(query: any) {
    const resp = await this.authHttp.post(`${this.url}/admin/products/search`, {
      query: query
    }).toPromise();
    return resp.json();
  }

  async saveReceive(summary: any, products: any) {
    const resp = await this.authHttp.post(`${this.url}/admin/receives`, {
      summary: summary,
      products: products
    }).toPromise();
    return resp.json();
  }

  async getReceiveList() {
    const resp = await this.authHttp.get(`${this.url}/admin/receives`).toPromise();
    return resp.json();
  }

}
