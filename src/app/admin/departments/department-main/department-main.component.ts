import { AlertService } from './../../../alert.service';
import { DepartmentService } from './../department.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-department-main',
  templateUrl: './department-main.component.html',
  styleUrls: ['./department-main.component.css']
})
export class DepartmentMainComponent implements OnInit {
  openModal = false;
  departmentName: string;
  departmentId: any;

  isUpdate = false;
  departments: any = [];
  loading = false;

  constructor(
    private departmentService: DepartmentService,
    private alert: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getDepartments();
  }

  async getDepartments() {
    try {
      this.loading = true;
      const resp: any = await this.departmentService.all();
      this.loading = false;
      if (resp.ok) {
        this.departments = resp.rows;
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
    this.departmentId = null;
    this.departmentName = null;
    this.openModal = true;
  }

  async doSave() {
    if (this.departmentName) {
      let resp: any;
      if (this.isUpdate) {
        resp = await this.departmentService.update(this.departmentId, this.departmentName);
      } else {
        resp = await this.departmentService.save(this.departmentName);
      }
      if (resp.ok) {
        this.alert.success();
        this.getDepartments();
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
    this.departmentId = g.department_id;
    this.departmentName = g.department_name;
    this.openModal = true;
  }

  onDelete(g) {
    this.alert.confirm('ต้องการลบรายการนี้ ใช่หรือไม่?')
      .then(() => {
        this.departmentService.remove(g.department_id)
          .then((resp: any) => {
            if (resp.ok) {
              this.alert.success();
              this.getDepartments();
            } else {
              this.alert.error(resp.error);
            }
          })
      })
      .catch(() => { });
  }
}
