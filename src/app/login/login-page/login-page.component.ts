import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { LoginService } from '../login.service';
import { AlertService } from '../../alert.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  jwtHelper: JwtHelper = new JwtHelper();
  isLogging = false;
  userType: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  enterLogin(event) {
    // enter login
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  async doLogin() {

    try {
      this.isLogging = true;
      let token: any = null;
      // adming login
      if (this.userType === '1') {
        const resp: any = await this.loginService.adminLogin(this.username, this.password);
        console.log(resp)
        if (resp.ok) {
          token = resp.token;
          const decodedToken = this.jwtHelper.decodeToken(token);
          const fullname = `${decodedToken.fullname}`;

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('fullname', fullname);
          // hide spinner
          this.isLogging = false;
          // redirect to admin module
          this.router.navigate(['admin']);
        } else {
          this.isLogging = false;
          this.alert.error(resp.error);
        }
      } else {
        // normal user
        const resp: any = await this.loginService.userLogin(this.username, this.password);
        console.log(resp)
        if (resp.ok) {
          token = resp.token;
          const decodedToken = this.jwtHelper.decodeToken(token);
          console.log(decodedToken);
          const fullname = `${decodedToken.fullname}`;

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('fullname', fullname);
          // hide spinner
          this.isLogging = false;
          // redirect to admin module
          this.router.navigate(['users']);
        } else {
          this.isLogging = false;
          this.alert.error(resp.error);
        }
      }
    } catch (error) {
      this.isLogging = false;
      this.alert.serverError();
    }
  }
}
