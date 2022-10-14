import { Injectable } from '@angular/core';
import { CartActionService } from 'app/store/actions/cart';
import { CartItemActionService } from 'app/store/actions/cart-item';
import { CategoryActionService } from 'app/store/actions/category';
import { ProductActionService } from 'app/store/actions/product';

@Injectable({
  providedIn: 'root'
})
export class ActionProvider {
  constructor(
    public CategoryActions: CategoryActionService,
    public ProductActions: ProductActionService,
    public CartActions: CartActionService,
    public CartItemActions: CartItemActionService,
  ) { }
}
