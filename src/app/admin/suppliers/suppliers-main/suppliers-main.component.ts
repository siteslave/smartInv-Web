import { AlertService } from './../../../alert.service';
import { SupplierService } from './../supplier.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-suppliers-main',
  templateUrl: './suppliers-main.component.html',
  styleUrls: ['./suppliers-main.component.css']
})
export class SuppliersMainComponent implements OnInit {
  openModal = false;
  supplierName: string;
  supplierId: any;
  address: any;
  telephone: any;
  fax: any;
  contactName: any;
  contactTelephone: any;

  isUpdate = false;
  suppliers: any = [];
  loading = false;

  constructor(
    private supplierService: SupplierService,
    private alert: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUnits();
  }

  async getUnits() {
    try {
      this.loading = true;
      const resp: any = await this.supplierService.all();
      this.loading = false;
      if (resp.ok) {
        this.suppliers = resp.rows;
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
    this.supplierId = null;
    this.supplierName = null;
    this.contactName = null;
    this.contactTelephone = null;
    this.address = null;
    this.telephone = null;
    this.fax = null;
    this.openModal = true;
  }

  async doSave() {
    if (this.supplierName && this.address && this.contactName) {
      let resp: any;
      if (this.isUpdate) {
        resp = await this.supplierService.update(this.supplierId, this.supplierName,
          this.address, this.telephone, this.fax, this.contactName, this.contactTelephone);
      } else {
        resp = await this.supplierService.save(this.supplierName,
          this.address, this.telephone, this.fax, this.contactName, this.contactTelephone);
      }
      if (resp.ok) {
        this.alert.success();
        this.getUnits();
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
    this.supplierId = g.supplier_id;
    this.supplierName = g.supplier_name;
    this.address = g.address;
    this.telephone = g.telephone;
    this.fax = g.fax;
    this.contactName = g.contact_name;
    this.contactTelephone = g.contact_telephone;
    this.openModal = true;
  }

  onDelete(g) {
    this.alert.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.supplierService.remove(g.supplier_id)
          .then((resp: any) => {
            if (resp.ok) {
              this.alert.success();
              this.getUnits();
            } else {
              this.alert.error(resp.error);
            }
          })
      })
      .catch(() => { });
  }
}
