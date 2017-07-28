import { AuthHttp } from 'angular2-jwt';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(
    @Inject('API_URL') private url: string,
    private http: Http
  ) { }

  async adminLogin(username: string, password: string) {
    const resp = await this.http.post(`${this.url}/login/admin`, {
      username: username,
      password: password
    }).toPromise();
    return resp.json();
  }

  async userLogin(username: string, password: string) {
    const resp = await this.http.post(`${this.url}/login/user`, {
      username: username,
      password: password
    }).toPromise();
    return resp.json();
  }

  testLogin(username: string, password: string) {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0OTIxNTIxNTAsImV4cCI6MTUyMzY4ODE1MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImZpcnN0bmFtZSI6IkpvaG5ueSIsImxhc3RuYW1lIjoiUm9ja2V0IiwiRW1haWwiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.PHIh0fVzpbTqi8h74stfts_CqgEmku-j0NV5G1iS0BI'
        resolve(token);
      } else {
        reject('Invalid username/password');
      }
    });
  }
}
