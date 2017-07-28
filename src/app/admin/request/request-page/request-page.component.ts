import { Router } from '@angular/router';
import { AlertService } from './../../../alert.service';
import { RequestService } from '../request.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent implements OnInit {
  requests = [];
  loading = false;
  listType = 0; // 0 = all, 1 = approved, 2 = waiting

  constructor(
    private requestService: RequestService,
    private alert: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRequest();
  }

  async getRequest() {
    try {
      this.loading = true;
      this.requests = [];
      const resp = await this.requestService.getRequest();
      if (resp.ok) {
        this.requests = resp.rows;
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error(error);
      this.alert.error(error.message);
    }
  }

  getListBy(type) {
    this.listType = type;
  }

  approve(r) {
    this.router.navigate(['admin/requests/approve', r.request_id]);
  }

}
