import { AlertService } from './../../../alert.service';
import { ReceiveService } from './../receive.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-receive-main',
  templateUrl: './receive-main.component.html',
  styleUrls: ['./receive-main.component.css']
})
export class ReceiveMainComponent implements OnInit {
  query: any;
  loading = false;
  receives = [];
  constructor(
    private router: Router,
    private receiveService: ReceiveService,
    private alert: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getReceivesList();
  }

  async getReceivesList() {
    try {
      this.loading = true;
      this.receives = [];
      const resp = await this.receiveService.getReceiveList();
      if (resp.ok) {
        this.receives = resp.rows;
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
      this.loading = false;
    } catch (error) {
      this.alert.error(error.message);
      console.error(error);
    }
  }

  newReceive() {
    this.router.navigateByUrl('/admin/receives/new');
  }

  openReceive(r) {

  }
  
  doSearch() {

  }

}
