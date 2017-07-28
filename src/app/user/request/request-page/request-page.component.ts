import { AlertService } from './../../../alert.service';
import { RequestService } from './../request.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private requestService: RequestService,
    private alert: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getRequest();
  }

  newRequest() {
    this.router.navigateByUrl('/users/request/new');
  }

  async getRequest() {
    try {
      this.requests = [];
      this.loading = true;
      const resp: any = await this.requestService.getRequest();
      if (resp.ok) {
        this.requests = resp.rows;
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
      this.loading = false;
    } catch (error) {
      console.error(error.message);
      this.loading = false;
      this.alert.error(error.message);
    }
  }

  removeRequest(r) {
    this.alert.confirm('คุณต้องการยกเลิกการเบิกรายการนี้ ใช่หรือไม่')
      .then(() => {
        this.requestService.removeRequest(r.request_id)
          .then((resp: any) => {
            if (resp.ok) {
              this.alert.success();
              this.getRequest();
            } else {
              this.alert.error(resp.error);
            }
          })
          .catch((error: any) => {
            this.alert.error(error.message)
          })
      })
      .catch(() => { });
  }

  showRequest(r) {

  }

  getListBy(type) {
    this.listType = type;
  }
}
