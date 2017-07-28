import { RequestService } from './../request.service';
import { Router } from '@angular/router';
import { IMyOptions } from 'mydatepicker-th';
import { AlertService } from './../../../alert.service';
import { StdService } from './../../../std.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-request-new',
  templateUrl: './request-new.component.html',
  styleUrls: ['./request-new.component.css']
})
export class RequestNewComponent implements OnInit {
  isRequest = false;
  isSaving = false;
  warehouses = [];
  warehouseId: any;

  public mask = [/\d/, /\d/, /\d/];

  allProducts = [];
  products = [];
  query: string;
  loading = false;

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  requestDate: any;

  constructor(
    private stdServie: StdService,
    private alert: AlertService,
    private ref: ChangeDetectorRef,
    private requestService: RequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getWarehouses();

    const date = new Date();
    this.requestDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  async getAllProducts(warehouseId: any) {
    try {
      this.loading = true;
      const resp: any = await this.stdServie.getProductList(warehouseId);
      if (resp.ok) {
        this.allProducts = resp.rows;
        this.allProducts.forEach((v, i) => {
          const idx = _.findIndex(this.products, { generic_id: v.generic_id });
          if (idx > -1) {
            this.allProducts[i].is_selected = 'Y';
          }
        });
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.alert.error(error.message);
    }
  }

  async getWarehouses() {
    try {
      const resp: any = await this.stdServie.getWarehouses();
      if (resp.ok) {
        this.warehouses = resp.rows;
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      console.error(error);
      this.alert.error(error.message);
    }
  }

  showProducts() {
    this.isRequest = true;
    this.getAllProducts(this.warehouseId);
  }

  changeWarehouse() {
    this.isRequest = false;
    this.allProducts = [];
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
    const idx = _.findIndex(this.allProducts, { generic_id: product.generic_id });
    if (idx > -1) {
      this.allProducts[idx].is_selected = 'Y';
    }
  }

  setQty(product, qty) {
    const idx = _.findIndex(this.products, { generic_id: product.generic_id });
    if (idx > -1) {
      this.products[idx].qty = +qty.value;
    }
  }

  removeSelected(g) {
    const idx = _.findIndex(this.products, { generic_id: g.generic_id });
    if (idx > -1) {
      this.products.splice(idx, 1);
    }

    const idxAll = _.findIndex(this.allProducts, { generic_id: g.generic_id });
    if (idx > -1) {
      this.allProducts[idxAll].is_selected = 'N';
    }
  }

  doSearch() {
    let timer;
    const that = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (this.query.length > 1) {
        that.searchProducts();
      }

      if (!this.query) {
        that.getAllProducts(that.warehouseId);
      }

    }, 300);
  }

  async searchProducts() {

    try {
      this.loading = true;
      this.allProducts = [];

      const resp = await this.stdServie.searchProducts(this.warehouseId, this.query);
      if (resp.ok) {
        this.allProducts = resp.rows;
        this.allProducts.forEach((v, i) => {
          const idx = _.findIndex(this.products, { generic_id: v.generic_id });
          if (idx > -1) {
            this.allProducts[i].is_selected = 'Y';
          }
        })
        this.ref.detectChanges();
      } else {
        console.log(resp.error);
        // this.alert.error(resp.error);
      }
      this.loading = false;
    } catch (error) {
      console.error(error);
      // this.alert.error(error.message);
    }
  }

  async saveRequest() {
    try {
      const requestDate = `${this.requestDate.date.year}-${this.requestDate.date.month}-${this.requestDate.date.day}`;
      const warehouseId = this.warehouseId;
      if (requestDate && warehouseId && this.products.length) {
        this.isSaving = true;
        const resp: any = await this.requestService.saveRequest(requestDate, warehouseId, this.products);
        if (resp.ok) {
          this.alert.success();
          this.router.navigateByUrl('/users/request');
        } else {
          this.alert.error(resp.error);
        }
        this.isSaving = false;
      } else {
        this.alert.error('ข้อมูลไม่ครบถ้วน')
      }

    } catch (error) {
      console.error(error);
      this.isSaving = false;
      this.alert.error(error.message);
    }
  }

}
