import { DirectivesModule } from './../../directives/directives.module';
import { ProductService } from './product.service';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMainComponent } from './product-main/product-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    DirectivesModule
  ],
  providers: [ProductService],
  declarations: [ProductMainComponent]
})
export class ProductsModule { }
