import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'app/shared/global-core/base.component';
import { Cart } from 'app/entities/cart';
import { CartItem } from 'app/entities/cart-item';
import { Promotion } from 'app/entities/promotion';
import { CartHttpService } from 'app/services/cart-http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit {
  items: CartItem[] = [];
  cartId?: string;
  cart?: Cart;
  promotions?: Promotion[] = [];
  promotionCodeControl = new FormControl('');

  constructor(private cartHttp: CartHttpService) {
    super();
  }

  ngOnInit() {
    this.cartId = localStorage.getItem('cartId')?.toString();
    this.Store?.CartItemStore.getByCartId(this.cartId!)
      .pipe(takeUntil(this.UnSub)).subscribe((items: any) => this.items = items);
    this.Store.CartStore.getById(this.cartId!).pipe(
      takeUntil(this.UnSub)
    ).subscribe((cart: any) => {
      this.cart = cart;
      this.promotions = cart?.promotions?.filter((p: any) => p.reducedTotal! > 0)
    });
  }

  removeCartItemClickedHandler = (item: CartItem) => {
    this.Logger.log(`item = `);
    this.Logger.log(item);
    this.cartHttp.removeCartItem({
      cartId: item.cartId!,
      cartItemId: item.id!
    }).pipe(takeUntil(this.UnSub)).subscribe();
  };

  saveCartItemClickedHandler = (item: CartItem, quantity: string) => {
    this.cartHttp.updateCartItem({
      cartId: item.cartId!,
      cartItemId: item.id!,
      quantity: +quantity,
    }).pipe(takeUntil(this.UnSub)).subscribe();
  };

  applyPromotionCodeClickedHandler = () => {
    const promotionCode = this.promotionCodeControl.value;
    this.Logger.debug(`Promotion code = ${this.promotionCodeControl.value}`);
    this.cartHttp.applyPromotionCode({
      cartId: this.cartId!,
      promotionCode: promotionCode!,
    }).pipe(
      takeUntil(this.UnSub)
    ).subscribe({
      next: () => {
        this.Logger.debug(`Apply successfully promotion code`);
      },
      error: e => {
        this.Logger.error(`Failed to apply promotion code`, e);
        if (e.status === 400) {
          alert(e.error);
        }
      },
    });
  };
}
