import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'app/entities/cart';
import { Product } from 'app/entities/product';
import { BaseComponent } from 'app/shared/global-core/base.component';
import { filter, switchMap, takeUntil } from "rxjs";
import { AppEvent } from 'app/interfaces/app-event';
import { CartHttpService } from 'app/services/cart-http.service';
import { COMMON_STRING } from 'app/configs/common';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent extends BaseComponent implements OnInit {
  @Input() product?: Product;
  cart?: Cart;
  
  constructor(private cartHttp: CartHttpService) {
    super();
  }

  ngOnInit() {
    this.AppEvent.AppEventBus.observable.pipe(
      filter((e?: AppEvent) => e?.type === COMMON_STRING.cartReadyEvent),
      switchMap(() => {
        const cartId = localStorage.getItem('cartId');
        return this.Store.CartStore.getById(cartId?.toString()!);
      }),
      takeUntil(this.UnSub)
    ).subscribe((cart: any) => this.cart = cart);
  }

  addProductToCart(cart: Cart) {
    if (cart && this.product?.availableQuantity) {
      this.cartHttp.addProductToCart({
        cartId: cart.id!,
        productId: this.product.id!,
      }).pipe(takeUntil(this.UnSub)).subscribe();
    }
  }

}
