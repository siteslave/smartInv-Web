import { HelperModule } from './../helper/helper.module';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiveAddProductComponent } from './receive-add-product/receive-add-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    HelperModule
  ],
  declarations: [ReceiveAddProductComponent],
  exports: [ReceiveAddProductComponent]
})
export class GridDetailModule { }
