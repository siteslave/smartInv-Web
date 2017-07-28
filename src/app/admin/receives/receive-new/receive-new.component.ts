import { Router } from '@angular/router';
import { SupplierService } from './../../suppliers/supplier.service';
import { ProductService } from './../../products/product.service';
import { JwtHelper } from 'angular2-jwt';
import { AlertService } from './../../../alert.service';
import { ReceiveService } from './../receive.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IMyOptions, IMyDayLabels } from 'mydatepicker-th';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-receive-new',
  templateUrl: './receive-new.component.html',
  styleUrls: ['./receive-new.component.css']
})
export class ReceiveNewComponent implements OnInit {
  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  openNewLot = false;
  @ViewChild('lotModal') private lotModal: any;

  public mask = [/\d/, /\d/, /\d/];

  jwtHelper: JwtHelper = new JwtHelper();
  warehouseId: any;
  receiveDate: any;
  receiveCode: any;
  products = [];
  allProducts = [];
  loading = false;
  isSaving = false;
  warehouses: any = [];

  loadingSupplier = false;
  openSupplierModal = false;
  suppliers = [];
  query = null;

  selectedSupplier: any = { supplier_id: null, supplier_name: null };


  constructor(
    private receiveService: ReceiveService,
    private alert: AlertService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {

    const token = sessionStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    this.warehouseId = decodedToken.warehouse_id;
  }

  ngOnInit() {
    const date = new Date();
    this.receiveDate = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
    this.getWarehouses();
    this.getProducts();
  }

  async getWarehouses() {
    try {
      const resp = await this.receiveService.getWarehouses();
      if (resp.ok) {
        this.warehouses = resp.rows;
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.alert.error(error.message);
    }
  }

  async getProducts() {
    try {
      this.loading = true;
      const resp = await this.receiveService.getProductList();
      if (resp.ok) {
        this.allProducts = resp.rows;
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
      this.loading = false;
    } catch (error) {
      this.alert.error(error.message);
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
        that.getProducts();
      }

    }, 300);
  }

  async searchProducts() {

    try {
      this.loading = true;
      this.allProducts = [];

      const resp = await this.receiveService.searchProducts(this.query);
      if (resp.ok) {
        this.allProducts = resp.rows;
        this.allProducts.forEach((v, i) => {
          const idx = _.findIndex(this.products, { product_id: v.product_id });
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

  addProduct(product) {
    this.products.push(product);
    const idx = _.findIndex(this.allProducts, { product_id: product.product_id });
    if (idx > -1) {
      this.allProducts[idx].is_selected = 'Y';
    }
  }

  setLotSelect(event) {
    console.log(event);
    const idx = _.findIndex(this.products, { product_id: event.product_id });
    if (idx > -1) {
      this.products[idx].cost = event.cost;
      this.products[idx].lot_id = event.lot_id;
    }
  }

  removeSelected(g) {
    const idx = _.findIndex(this.products, { product_id: g.product_id });
    if (idx > -1) {
      this.products.splice(idx, 1);
    }

    const idxAll = _.findIndex(this.allProducts, { product_id: g.product_id });
    if (idx > -1) {
      this.allProducts[idxAll].is_selected = 'N';
    }
  }

  showLots(product) {
    const productId = product.product_id;
    this.lotModal.showLots(productId);
    this.openNewLot = true;
  }

  refreshLot() {
    // this.getLots(this.selectedProductAccept.product_id);
    this.openNewLot = false;
  }


  setQty(product, qty) {
    const idx = _.findIndex(this.products, { product_id: product.product_id });
    if (idx > -1) {
      this.products[idx].qty = +qty.value;
    }
  }

  async saveReceive() {
    // alert(JSON.stringify(this.products))
    try {
      // console.log(this.receiveDate);
      this.isSaving = true;
      const summary = {
        receiveDate: `${this.receiveDate.date.year}-${this.receiveDate.date.month}-${this.receiveDate.date.day}`,
        receiveCode: this.receiveCode,
        supplierId: this.selectedSupplier.supplier_id,
      }

      const resp: any = await this.receiveService.saveReceive(summary, this.products);
      if (resp.ok) {
        this.alert.success();
        this.router.navigateByUrl('/admin/receives');
      } else {
        this.alert.error(resp.error);
      }
      this.isSaving = false;
    } catch (error) {
      console.error(error);
      this.isSaving = false;
      this.alert.error(error.message);
    }
  }

  async getSuppliers() {
    try {
      this.loadingSupplier = true;
      const resp: any = await this.supplierService.all();
      this.loadingSupplier = false;
      if (resp.ok) {
        this.suppliers = resp.rows;
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.loadingSupplier = false;
      this.alert.serverError();
    }
  }

  async searchSuppliers() {
    this.getSuppliers();
    this.openSupplierModal = true;
  }

  doSelectSupplier() {
    this.openSupplierModal = false;
    console.log(this.selectedSupplier);
  }

}
