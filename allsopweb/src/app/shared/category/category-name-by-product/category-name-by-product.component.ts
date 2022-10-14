import { Component, Input, OnInit } from '@angular/core';
import { of, switchMap, takeUntil } from 'rxjs';
import { Category } from 'app/entities/category';
import { BaseComponent } from 'app/shared/global-core/base.component';

@Component({
  selector: 'app-category-name-by-product',
  templateUrl: './category-name-by-product.component.html',
  styleUrls: ['./category-name-by-product.component.scss']
})
export class CategoryNameByProductComponent extends BaseComponent implements OnInit {
  @Input() productId?: string;
  category?: Category;
  constructor() {
    super();
  }

  ngOnInit() {
    this.Store.ProductStore.getById(this.productId!).pipe(
      switchMap(p => p ? this.Store.CategoryStore.getById(p?.categoryId!) : of(undefined)),
      takeUntil(this.UnSub)
    ).subscribe(c => this.category = c);
  }

}
