import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'app/entities/cart';
import { map, switchMap, takeUntil } from 'rxjs';
import { BaseComponent } from 'app/shared/global-core/base.component';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss']
})
export class CartTotalComponent extends BaseComponent implements OnInit {

  @Input() cartId?: string;
  cart?: Cart;
  reducedAmount?: number;
  total: number = 0;
  constructor() {
    super();
  }

  ngOnInit() {
    this.Store.CartStore.getById(this.cartId!).pipe(
      takeUntil(this.UnSub)
    ).subscribe(cart => {
      this.cart = cart;
      if (cart) {
        this.reducedAmount = this.cart?.promotions?.map(p => p.reducedTotal).reduce((accumulator, curr) => accumulator! + curr!);
      }
    });
    this.Store.CartItemStore.getByCartId(this.cartId!).pipe(
      map(items => items.map(i => ({ productId: i.productId, quantity: i.quantity }))),
      switchMap(items => this.Store.ProductStore.get().pipe(
        map(ps => ps.filter(p => items.some(i => i.productId === p.id))),
        map(products => ({products, items}))
      )),
      takeUntil(this.UnSub),
    ).subscribe(data => {
      this.total = 0;
      data.items.forEach(i => {
        const product = data.products.find(p => p.id === i.productId);
        if (product) {
          this.total += product.price! * i.quantity!;
        }
      });
    });
  }

}
