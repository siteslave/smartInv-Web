import { LotService } from './../../admin/lot.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-lots',
  templateUrl: './select-lots.component.html',
  styleUrls: ['./select-lots.component.css']
})
export class SelectLotsComponent implements OnInit {
  @Input() productId: any;
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();

  lots = [];
  lotId = null;

  constructor(
    private lotService: LotService
  ) { }

  ngOnInit() {
    this.getLots();
  }

  setSelect() {
    const idx = _.findIndex(this.lots, { lot_id: +this.lotId });
    if (idx > -1) {
      this.onSelect.emit(this.lots[idx]);
    }
  }

  async getLots() {
    try {
      const resp = await this.lotService.getLots(this.productId);
      if (resp.ok) {
        this.lots = resp.rows
      } else {
        console.error(resp.error);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

}
