import { HelperModule } from './../../helper/helper.module';
import { DirectivesModule } from './../../directives/directives.module';
import { GridDetailModule } from './../../grid-detail/grid-detail.module';
import { ReceiveService } from './receive.service';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerTHModule } from 'mydatepicker-th';

import { ReceiveMainComponent } from './receive-main/receive-main.component';
import { ReceiveNewComponent } from './receive-new/receive-new.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    MyDatePickerTHModule,
    GridDetailModule,
    DirectivesModule,
    TextMaskModule,
    HelperModule
  ],
  providers: [ReceiveService],
  declarations: [ReceiveMainComponent, ReceiveNewComponent]
})
export class ReceivesModule { }
