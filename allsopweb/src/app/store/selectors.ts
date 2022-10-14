import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'app/interfaces/i-app-state';

@Injectable({
  providedIn: 'root'
})
export class Selectors {
  constructor(private store: Store<IAppState>) { }

  get Categories(): Observable<any> {
    return this.store.select((state: IAppState) => state.categories.list);
  }
  get Products(): Observable<any> {
    return this.store.select((state: IAppState) => state.products.list);
  }
  get Carts(): Observable<any> {
    return this.store.select((state: IAppState) => state.carts.list);
  }
  get CartItems(): Observable<any> {
    return this.store.select((state: IAppState) => state.cartItems.list);
  }
}
