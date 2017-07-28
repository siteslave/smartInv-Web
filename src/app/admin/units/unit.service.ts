import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UnitService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async all() {
    const resp = await this.authHttp.get(`${this.url}/admin/units`).toPromise();
    return resp.json();
  }

  async save(unitName: string) {
    const resp = await this.authHttp.post(`${this.url}/admin/units`, {
      unitName: unitName
    }).toPromise();
    return resp.json();
  }

  async update(unitId: any, unitName: string,) {
    const resp = await this.authHttp.put(`${this.url}/admin/units/${unitId}`, {
      unitName: unitName
    }).toPromise();
    return resp.json();
  }

  async remove(unitId: any) {
    const resp = await this.authHttp.delete(`${this.url}/admin/units/${unitId}`).toPromise();
    return resp.json();
  }

}
