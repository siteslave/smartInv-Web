import { FormsModule } from '@angular/forms';
import { GenericService } from './generic.service';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericMainComponent } from './generic-main/generic-main.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  providers: [GenericService],
  declarations: [GenericMainComponent]
})
export class GenericsModule { }
