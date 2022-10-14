import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, takeUntil } from 'rxjs';
import { Product } from 'app/entities/product';
import { BaseComponent } from 'app/shared/global-core/base.component';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent extends BaseComponent implements OnInit {
  @Input() id?: string;
  product$: Observable<Product | undefined> = of(undefined);
  product?: Product;
  constructor() {
    super();
  }

  ngOnInit() {
    this.Store?.ProductStore.getById(this.id!).pipe(takeUntil(this.UnSub)).subscribe(p => this.product = p);
  }
}
