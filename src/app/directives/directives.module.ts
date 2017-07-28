import { DateService } from './../date.service';
import { HelperModule } from './../helper/helper.module';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotsComponent } from './lots/lots.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SelectLotsComponent } from './select-lots/select-lots.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    TextMaskModule,
    HelperModule
  ],
  exports: [LotsComponent, SelectLotsComponent],
  declarations: [LotsComponent, SelectLotsComponent],
  providers: [DateService]
})
export class DirectivesModule { }
