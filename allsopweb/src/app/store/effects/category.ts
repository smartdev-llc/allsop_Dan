import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'app/entities/category';
import { IStoreService } from 'app/interfaces/i-store-service';
import { Selectors } from 'app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class CategoryEffect implements IStoreService<Category, string> {
  constructor(private context: Selectors) { }
  
  get(): Observable<Category[]> {
    return this.context.Categories.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<Category | undefined> {
    return this.context.Categories.pipe(map(s => s[id]));
  }
}
