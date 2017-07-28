import { SupplierService } from './supplier.service';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersMainComponent } from './suppliers-main/suppliers-main.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  providers: [SupplierService],
  declarations: [SuppliersMainComponent]
})
export class SuppliersModule { }
