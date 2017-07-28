import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-receive-add-product',
  templateUrl: './receive-add-product.component.html',
  styleUrls: ['./receive-add-product.component.css']
})
export class ReceiveAddProductComponent implements OnInit {
  loading = false;
  @Input() productId: any;
  constructor() { }

  ngOnInit() {
  }

}
