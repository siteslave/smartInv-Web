import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SupplierService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async all() {
    const resp = await this.authHttp.get(`${this.url}/admin/suppliers`).toPromise();
    return resp.json();
  }

  async save(supplierName: string, address: any, telephone: any, fax: any, contactName: any, contactTelephone: any) {
    const resp = await this.authHttp.post(`${this.url}/admin/suppliers`, {
      supplierName: supplierName,
      address: address,
      telephone: telephone,
      fax: fax,
      contactName: contactName,
      contactTelephone: contactTelephone
    }).toPromise();
    return resp.json();
  }

  async update(supplierId: any, supplierName: string, address: any, telephone: any, fax: any, contactName: any, contactTelephone: any) {
    const resp = await this.authHttp.put(`${this.url}/admin/suppliers/${supplierId}`, {
      supplierName: supplierName,
      address: address,
      telephone: telephone,
      fax: fax,
      contactName: contactName,
      contactTelephone: contactTelephone
    }).toPromise();
    return resp.json();
  }

  async remove(supplierId: any) {
    const resp = await this.authHttp.delete(`${this.url}/admin/suppliers/${supplierId}`).toPromise();
    return resp.json();
  }

}
