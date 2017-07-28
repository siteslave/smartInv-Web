import { UnitService } from './unit.service';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsMainComponent } from './units-main/units-main.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  providers: [UnitService],
  declarations: [UnitsMainComponent]
})
export class UnitsModule { }
