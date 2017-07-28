import { AlertService } from './../../../alert.service';
import { ProductService } from './../product.service';
import { GenericService } from './../../generics/generic.service';
import { UnitService } from './../../units/unit.service';
import { SupplierService } from './../../suppliers/supplier.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.css']
})
export class ProductMainComponent implements OnInit {

  openNewLot = false;
  @ViewChild('lotModal') private lotModal: any;

  openModal = false;
  openGenericModal = false;
  openSupplierModal = false;
  openUnitModal = false;

  selectedGeneric: any = { generic_name: null, generic_id: null, generic_type_id: null };
  selectedSupplier: any = { supplier_id: null, supplier_name: null };
  selectedUnit: any = { unit_id: null, unit_name: null };
  productName: string;
  productId: any;

  isUpdate = false;
  products: any = [];
  generics: any = [];
  suppliers: any = [];
  units: any = [];
  genericId: any;

  cost = 0;
  price = 0;

  loading = false;
  loadingUnit = false;
  loadingGeneric = false;
  loadingSupplier = false;

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private genericService: GenericService,
    private unitService: UnitService,
    private alert: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  showLot(product) {
    const productId = product.product_id;
    this.lotModal.showLots(productId);
    this.openNewLot = true;
  }

  refreshLot() {
    // this.getLots(this.selectedProductAccept.product_id);
    this.openNewLot = false;
  }

  async getGenerics() {
    try {
      this.loadingGeneric = true;
      const resp: any = await this.genericService.all();
      this.loadingGeneric = false;
      if (resp.ok) {
        this.generics = resp.rows;
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.loadingGeneric = false;
      this.alert.serverError();
    }
  }

  async getUnits() {
    try {
      this.loadingGeneric = true;
      const resp: any = await this.unitService.all();
      this.loadingUnit = false;
      if (resp.ok) {
        this.units = resp.rows;
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.loadingUnit = false;
      this.alert.serverError();
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

  async getProducts() {
    try {
      this.loading = true;
      const resp: any = await this.productService.all();
      this.loading = false;
      if (resp.ok) {
        this.products = resp.rows;
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.alert.serverError();
    }
  }

  showModal() {
    this.isUpdate = false;
    this.productId = null;
    this.productName = null;
    this.selectedGeneric.generic_id = null;
    this.selectedSupplier.supplier_id = null;
    this.openModal = true;
  }

  async doSave() {
    if (this.productName && this.selectedSupplier.supplier_id && this.selectedGeneric.generic_id) {
      let resp: any;
      const genericId = this.selectedGeneric.generic_id;
      const supplierId = this.selectedSupplier.supplier_id;
      if (this.isUpdate) {
        resp = await this.productService.update(this.productId, this.productName, genericId, supplierId);
      } else {
        resp = await this.productService.save(this.productName, genericId, supplierId);
      }
      if (resp.ok) {
        this.alert.success();
        this.getProducts();
        this.openModal = false;
      } else {
        this.alert.error(resp.error);
      }
    } else {
      this.alert.error('ข้อมูลไม่ครบถ้วน')
    }
  }

  onEdit(g) {
    this.isUpdate = true;
    this.productId = g.product_id;
    this.productName = g.product_name;
    this.selectedGeneric.generic_id = g.generic_id;
    this.selectedGeneric.generic_name = g.generic_name;
    this.selectedSupplier.supplier_id = g.supplier_id;
    this.selectedSupplier.supplier_name = g.supplier_name;
    this.openModal = true;
  }

  onDelete(g) {
    this.alert.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.productService.remove(g.product_id)
          .then((resp: any) => {
            if (resp.ok) {
              this.alert.success();
              this.getProducts();
            } else {
              this.alert.error(resp.error);
            }
          })
      })
      .catch(() => { });
  }

  async searchGeneric() {
    this.getGenerics();
    this.openGenericModal = true;
  }

  async searchSuppliers() {
    this.getSuppliers();
    this.openSupplierModal = true;
  }

  async searchUnits() {
    this.getUnits();
    this.openUnitModal = true;
  }

  doSelectGeneric() {
    this.openGenericModal = false;
    console.log(this.selectedGeneric);
  }

  doSelectSupplier() {
    this.openSupplierModal = false;
    console.log(this.selectedSupplier);
  }

  doSelectUnit() {
    this.openUnitModal = false;
    console.log(this.selectedUnit);
  }
}
