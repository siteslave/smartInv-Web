import { DepartmentService } from './department.service';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentMainComponent } from './department-main/department-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule
  ],
  providers: [DepartmentService],
  declarations: [DepartmentMainComponent]
})
export class DepartmentsModule { }
