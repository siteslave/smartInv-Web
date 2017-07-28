import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserGuard implements CanActivate {
  public token: string;
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');
    if (token) {
      // console.log(this.jwtHelper.isTokenExpired(token));
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        const decoded = this.jwtHelper.decodeToken(token);
        // console.log(decoded.is_admin);
        if (decoded.is_admin === 0) {
          return true;
        } else {
          this.router.navigate(['access-denied']);
          return false;
        }
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
