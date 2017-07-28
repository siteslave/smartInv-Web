import { RequestModule } from './request/request.module';
import { HelperModule } from './../helper/helper.module';
import { LotService } from './lot.service';
import { ReceivesModule } from './receives/receives.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentMainComponent } from './departments/department-main/department-main.component';
import { UnitsModule } from './units/units.module';
import { GenericsModule } from './generics/generics.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthModule } from '../auth/auth.module';

import { AlertService } from '../alert.service';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HelperModule,
    FormsModule,
    ClarityModule,
    AuthModule,
    GenericsModule,
    UnitsModule,
    DepartmentsModule,
    SuppliersModule,
    ProductsModule,
    ReceivesModule,
    RequestModule
  ],
  declarations: [MainPageComponent, LayoutComponent],
  providers: [
    AlertService,
    LotService
  ]
})
export class AdminModule { }
