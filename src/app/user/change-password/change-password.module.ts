import { HelperModule } from './../../helper/helper.module';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    HelperModule
  ],
  declarations: [ChangePasswordPageComponent]
})
export class ChangePasswordModule { }
