import { Component, OnInit } from '@angular/core';
import { AppEvent } from 'app/interfaces/app-event';
import { filter, switchMap, takeUntil } from 'rxjs';
import { BaseComponent } from 'app/shared/global-core/base.component';
import { COMMON_STRING } from 'app/configs/common';

@Component({
  selector: 'app-cart-item-count',
  templateUrl: './cart-item-count.component.html',
  styleUrls: ['./cart-item-count.component.scss']
})
export class CartItemCountComponent extends BaseComponent implements OnInit {

  itemCount?: number;
  constructor() {
    super();
  }

  ngOnInit() {
    this.AppEvent.AppEventBus.observable.pipe(
      filter((e?: AppEvent) => e?.type === COMMON_STRING.cartReadyEvent),
      switchMap(() => {
        const cartId = localStorage.getItem('cartId');
        return this.Store.CartItemStore.getByCartId(cartId?.toString()!);
      }),
      takeUntil(this.UnSub)
    ).subscribe((cartItems: any) => this.itemCount = cartItems ? cartItems.length : 0);
  }

}
