import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'app/shared/global-core/base.component';

@Component({
  selector: 'app-cart-item-total',
  templateUrl: './cart-item-total.component.html',
  styleUrls: ['./cart-item-total.component.scss']
})
export class CartItemTotalComponent extends BaseComponent implements OnInit {
  @Input() id?: string;
  total?: number;
  constructor() {
    super();
  }

  ngOnInit() {
    this.Store.CartItemStore.getById(this.id!).pipe(
      takeUntil(this.UnSub)
    ).subscribe(item => this.total = item?.total);
  }
}
