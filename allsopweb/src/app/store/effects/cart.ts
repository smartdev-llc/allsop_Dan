import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from 'app/entities/cart';
import { IStoreService } from 'app/interfaces/i-store-service';
import { Selectors } from 'app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class CartEffect implements IStoreService<Cart, string> {
  constructor(private context: Selectors) { }
  
  get(): Observable<Cart[]> {
    return this.context.Carts.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<Cart | undefined> {
    return this.context.Carts.pipe(map(s => s[id]));
  }
}
