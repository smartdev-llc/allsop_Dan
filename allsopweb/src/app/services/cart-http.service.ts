import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cart } from 'app/entities/cart';
import { CartItem } from 'app/entities/cart-item';
import { normalizeCart, normalizeCartItems } from 'app/entities/schema';
import { ActionProvider } from 'app/store/provider/action';
import { RemoveCartItemVM } from 'app/interfaces/vm/remove-cart-item-vm';
import { UpdateCartItemVM } from 'app/interfaces/vm/update-cart-item-vm';
import { ApplyPromotionCodeVM } from 'app/interfaces/vm/apply-promotion-code-vm';
import { AddProductToCartVM } from 'app/interfaces/vm/add-product-to-cart-vm';
import { CART_URLS } from 'app/configs/api-url';

@Injectable({
  providedIn: 'root'
})
export class CartHttpService {
  constructor(private http: HttpClient, private actions: ActionProvider) { }

  get(id: string): Observable<Cart> {
    return this.http.get(`${CART_URLS.get}/${id}`).pipe(tap(cart => {
      if (cart) {
        const data = normalizeCart(cart);
        this.actions.CartActions.addOrUpdate(data.entities.carts);
        this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
        this.actions.ProductActions.addOrUpdate(data.entities.products);
        this.actions.CategoryActions.addOrUpdate(data.entities.categories);
      }
    }));
  }

  post(): Observable<Cart> {
    return this.http.post<Cart>(CART_URLS.create, null).pipe(tap(cart => {
      const data = normalizeCart(cart);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
    }));
  }

  addProductToCart(vm: AddProductToCartVM): Observable<Cart> {
    return this.http.post<Cart>(CART_URLS.addProduct, vm).pipe(tap(cart => {
      const data = normalizeCart(cart);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories)
    }));
  }

  removeCartItem(vm: RemoveCartItemVM): Observable<Cart> {
    return this.http.post<Cart>(CART_URLS.removeCartItem, vm).pipe(tap(cart => {
      const data = normalizeCart(cart);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories);

      const removingItems: CartItem[] = [
        {
          id: vm.cartItemId,
          cartId: vm.cartId,
        }
      ];
      const removingData = normalizeCartItems(removingItems);

      this.actions.CartItemActions.remove(removingData.entities.cartItems);
    }));
  }

  updateCartItem(vm: UpdateCartItemVM): Observable<Cart> {
    return this.http.post<Cart>(CART_URLS.updateCartItem, vm).pipe(tap(cart => {
      const data = normalizeCart(cart);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories)
    }));
  }

  applyPromotionCode(vm: ApplyPromotionCodeVM): Observable<Cart> {
    return this.http.post<Cart>(CART_URLS.applyPromotionCode, vm).pipe(tap(cart => {
      const data = normalizeCart(cart);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories)
    }));
  }
}
