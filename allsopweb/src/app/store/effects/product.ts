import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'app/entities/product';
import { IStoreService } from 'app/interfaces/i-store-service';
import { Selectors } from 'app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ProductEffect implements IStoreService<Product, string> {
  constructor(private context: Selectors) { }
  
  get(): Observable<Product[]> {
    return this.context.Products.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<Product | undefined> {
    return this.context.Products.pipe(map(s => s[id]));
  }
}
