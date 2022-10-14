import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from 'app/entities/cart-item';
import { Selectors } from 'app/store/selectors';
import { IStoreService } from 'app/interfaces/i-store-service';

@Injectable({
  providedIn: 'root'
})
export class CartItemEffect implements IStoreService<CartItem, string> {
  constructor(private context: Selectors) { }
  
  get(): Observable<CartItem[]> {
    return this.context.CartItems.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<CartItem | undefined> {
    return this.context.CartItems.pipe(map(s => s[id]));
  }
  getByCartId(cartId: string): Observable<CartItem[]> {
    return this.get().pipe(map(items => items.filter(item => item.cartId === cartId)));
  }
}
