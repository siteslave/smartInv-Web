import { AlertService } from './../../../alert.service';
import { GenericService } from './../generic.service';
import { UnitService } from './../../units/unit.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-generic-main',
  templateUrl: './generic-main.component.html',
  styleUrls: ['./generic-main.component.css']
})
export class GenericMainComponent implements OnInit {
  openModal = false;
  genericName: string;
  genericTypeId: any;
  genericId: any;

  genericTypes: any = [];
  units: any = [];
  unitId: any;
  isUpdate = false;
  generics: any = [];
  loading = false;

  constructor(
    private genericService: GenericService,
    private alert: AlertService,
    private unitService: UnitService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getGenerics();
    this.getGenericTypes();
    this.getUnits();
  }

  async getUnits() {
    try {
      const resp: any = await this.unitService.all();
      if (resp.ok) {
        this.units = resp.rows;
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.alert.serverError();
    }
  }


  async getGenerics() {
    try {
      this.loading = true;
      const resp: any = await this.genericService.all();
      this.loading = false;
      if (resp.ok) {
        this.generics = resp.rows;
        this.ref.detectChanges();
      } else {
        this.alert.error(resp.error);
      }
    } catch (error) {
      this.alert.serverError();
    }
  }

  async getGenericTypes() {
    try {
      this.loading = true;
      const resp: any = await this.genericService.getGenericTypes();
      this.loading = false;
      if (resp.ok) {
        this.genericTypes = resp.rows;
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
    this.genericId = null;
    this.genericTypeId = null;
    this.genericName = null;
    this.openModal = true;
  }

  async doSave() {
    if (this.genericName && this.genericTypeId) {
      let resp: any;
      if (this.isUpdate) {
        resp = await this.genericService.update(this.genericId, this.genericName, this.genericTypeId, this.unitId);
      } else {
        resp = await this.genericService.save(this.genericName, this.genericTypeId, this.unitId);
      }
      if (resp.ok) {
        this.alert.success();
        this.getGenerics();
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
    this.genericId = g.generic_id;
    this.unitId = g.unit_id;
    this.genericName = g.generic_name;
    this.genericTypeId = g.generic_type_id;
    this.openModal = true;
  }

  onDelete(g) {
    this.alert.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.genericService.remove(g.generic_id)
          .then((resp: any) => {
            if (resp.ok) {
              this.alert.success();
              this.getGenerics();
            } else {
              this.alert.error(resp.error);
            }
          })
      })
      .catch(() => { });
  }

}
