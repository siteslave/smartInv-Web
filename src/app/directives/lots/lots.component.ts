import { DateService } from './../../date.service';
import { LotService } from './../../admin/lot.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.css']
})
export class LotsComponent implements OnInit {

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  products = [];
  productLots = [];
  lotId: any;

  lotNo: string;
  receiveDate: any;
  cost = 0;
  price = 0;

  openNew = false;
  loading = false;
  loadingLots = false;
  @Input('openLots') openLots = false;
  // @Input('productId') productId: any;
  @Output('onSuccess') onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSaving = false;
  isUpdate = false;
  productName: any;
  productId: any;

  constructor(
    private lotService: LotService,
    private alertService: AlertService,
    private dateService: DateService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.getLots(this.productId);
  }

  getLots(productId) {
    this.loadingLots = true;
    this.productId = productId;
    this.productLots = [];
    this.lotService.getLots(productId)
      .then((result: any) => {
        if (result.ok) {
          this.productLots = result.rows;
          this.ref.detectChanges();
        } else {
          this.alertService.error(JSON.stringify(result.error));
        }
        this.loadingLots = false;
      })
      .catch(error => {
        this.loadingLots = false;
        this.alertService.error(error.messag);
      });
  }

  showLots(productId) {
    this.productId = productId;
    this.getLots(productId);
  }

  closeModal() {
    this.onSuccess.emit(true);
  }

  edit(lot) {
    console.log(lot);
    this.isUpdate = true;
    this.lotNo = lot.lot_no;
    this.cost = lot.cost;
    this.price = lot.price;
    this.lotId = lot.lot_id;
    this.openNew = true;
  }

  addLot() {
    this.lotNo = null;
    this.lotId = null;
    this.cost = null;
    this.price = null;
    this.isUpdate = false;
    this.openNew = true;
  }

  doSaveNewLot() {
    this.isSaving = true;
    if (this.lotNo && this.cost) {
      let promise;
      if (this.isUpdate) {
        promise = this.lotService.updateLots(this.lotId, this.lotNo, this.cost, this.price);
      } else {
        promise = this.lotService.saveLots(this.productId, this.lotNo, this.cost, this.price);
      }

      promise.then((result: any) => {
        if (result.ok) {
          this.alertService.success();
          this.openNew = false;
          this.productLots = [];
          this.getLots(this.productId);
        } else {
          this.alertService.error(JSON.stringify(result.error));
        }

        this.isSaving = false;
      })
        .catch(error => {
          this.isSaving = false;
          this.alertService.serverError();
        });
    } else {
      this.isSaving = false;
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
    }
  }
}
