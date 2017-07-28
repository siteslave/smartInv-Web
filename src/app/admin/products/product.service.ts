import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async all() {
    const resp = await this.authHttp.get(`${this.url}/admin/products`).toPromise();
    return resp.json();
  }

  async save(productName: any, genericId: any, supplierId: any) {
    const resp = await this.authHttp.post(`${this.url}/admin/products`, {
      productName: productName,
      genericId: genericId,
      supplierId: supplierId
    }).toPromise();
    return resp.json();
  }

  async update(productId: any, productName: any, genericId: any, supplierId: any) {
    const resp = await this.authHttp.put(`${this.url}/admin/products/${productId}`, {
      productName: productName,
      genericId: genericId,
      supplierId: supplierId
    }).toPromise();
    return resp.json();
  }

  async remove(productId: any) {
    const resp = await this.authHttp.delete(`${this.url}/admin/products/${productId}`).toPromise();
    return resp.json();
  }

}
