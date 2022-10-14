import { Injectable } from '@angular/core';
import { CartEffect } from 'app/store/effects/cart';
import { CategoryEffect } from 'app/store/effects/category';
import { ProductEffect } from 'app/store/effects/product';
import { CartItemEffect } from 'app/store/effects/cart-item';

@Injectable({
  providedIn: 'root'
})
export class StoreProvider {
  constructor(
    public CategoryStore: CategoryEffect,
    public ProductStore: ProductEffect,
    public CartStore: CartEffect,
    public CartItemStore: CartItemEffect,
  ) { }
}
