import { AlertService } from './../../../alert.service';
import { UnitService } from './../unit.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-units-main',
  templateUrl: './units-main.component.html',
  styleUrls: ['./units-main.component.css']
})
export class UnitsMainComponent implements OnInit {
  openModal = false;
  unitName: string;
  genericTypeId: any;
  unitId: any;

  genericTypes: any = [];
  isUpdate = false;
  units: any = [];
  loading = false;

  constructor(
    private unitService: UnitService,
    private alert: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUnits();
  }

  async getUnits() {
    try {
      this.loading = true;
      const resp: any = await this.unitService.all();
      this.loading = false;
      if (resp.ok) {
        this.units = resp.rows;
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
    this.unitId = null;
    this.unitName = null;
    this.openModal = true;
  }

  async doSave() {
    if (this.unitName) {
      let resp: any;
      if (this.isUpdate) {
        resp = await this.unitService.update(this.unitId, this.unitName);
      } else {
        resp = await this.unitService.save(this.unitName);
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
    this.unitId = g.unit_id;
    this.unitName = g.unit_name;
    this.openModal = true;
  }

  onDelete(g) {
    this.alert.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.unitService.remove(g.unit_id)
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
