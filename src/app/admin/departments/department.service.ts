import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepartmentService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async all() {
    const resp = await this.authHttp.get(`${this.url}/admin/departments`).toPromise();
    return resp.json();
  }

  async save(departmentName: string) {
    const resp = await this.authHttp.post(`${this.url}/admin/departments`, {
      departmentName: departmentName
    }).toPromise();
    return resp.json();
  }

  async update(departmentId: any, departmentName: string) {
    const resp = await this.authHttp.put(`${this.url}/admin/departments/${departmentId}`, {
      departmentName: departmentName
    }).toPromise();
    return resp.json();
  }

  async remove(departmentId: any) {
    const resp = await this.authHttp.delete(`${this.url}/admin/departments/${departmentId}`).toPromise();
    return resp.json();
  }

}
