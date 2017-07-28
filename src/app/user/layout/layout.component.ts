import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  fullname: string;

  constructor(private router: Router) {
    this.fullname = sessionStorage.getItem('fullname');
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('fullname');

    this.router.navigate(['login']);
  }
  ngOnInit() {
  }

}
