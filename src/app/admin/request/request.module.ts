import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { HelperModule } from './../../helper/helper.module';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPageComponent } from './request-page/request-page.component';
import { RequestService } from './request.service';
import { RequestApproveComponent } from './request-approve/request-approve.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    HelperModule,
    MyDatePickerTHModule,
    TextMaskModule
  ],
  providers: [RequestService],
  declarations: [RequestPageComponent, RequestApproveComponent]
})
export class RequestModule { }
