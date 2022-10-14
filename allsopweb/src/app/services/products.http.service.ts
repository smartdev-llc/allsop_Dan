import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'app/entities/product';
import { normalizeProducts } from 'app/entities/schema';
import { ActionProvider } from 'app/store/provider/action';
import { PRODUCT_URLS } from 'app/configs/api-url';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {
  constructor(private http: HttpClient, private actions: ActionProvider) { }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_URLS.get).pipe(tap(products => {
      const data = normalizeProducts(products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
    }));
  }
}
