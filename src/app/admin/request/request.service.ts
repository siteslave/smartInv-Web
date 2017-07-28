import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  async getRequest() {
    const resp = await this.authHttp.get(`${this.url}/admin/request`).toPromise();
    return resp.json();
  }

}
