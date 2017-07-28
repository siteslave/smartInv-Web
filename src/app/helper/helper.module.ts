import { NumberOnlyDirective } from './number-only.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToThaiDatePipe } from './to-thai-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToThaiDatePipe, NumberOnlyDirective],
  exports: [ToThaiDatePipe, NumberOnlyDirective]
})
export class HelperModule { }
