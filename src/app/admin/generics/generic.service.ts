import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GenericService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async all() {
    const resp = await this.authHttp.get(`${this.url}/admin/generics`).toPromise();
    return resp.json();
  }

  async getGenericTypes() {
    const resp = await this.authHttp.get(`${this.url}/admin/generic-types`).toPromise();
    return resp.json();
  }

  async save(genericName: string, genericTypeId: any, unitId: any) {
    const resp = await this.authHttp.post(`${this.url}/admin/generics`, {
      genericName: genericName,
      genericTypeId: genericTypeId,
      unitId: unitId
    }).toPromise();
    return resp.json();
  }

  async update(genericId: any, genericName: string, genericTypeId: any, unitId: any) {
    const resp = await this.authHttp.put(`${this.url}/admin/generics/${genericId}`, {
      genericName: genericName,
      genericTypeId: genericTypeId,
      unitId: unitId
    }).toPromise();
    return resp.json();
  }

  async remove(genericTypeId: any) {
    const resp = await this.authHttp.delete(`${this.url}/admin/generics/${genericTypeId}`).toPromise();
    return resp.json();
  }

}
