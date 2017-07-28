import { ChangePasswordModule } from './change-password/change-password.module';
import { StockModule } from './stock/stock.module';
import { RequestModule } from './request/request.module';
import { LayoutComponent } from './layout/layout.component';
import { HelperModule } from './../helper/helper.module';
import { AuthModule } from './../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { MainModule } from './main/main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MainModule,
    ClarityModule,
    FormsModule,
    AuthModule,
    HelperModule,
    RequestModule,
    StockModule,
    ChangePasswordModule
  ],
  declarations: [LayoutComponent]
})
export class UserModule { }
