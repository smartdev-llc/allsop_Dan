import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'app/entities/product';
import { BaseComponent } from 'app/shared/global-core/base.component';

@Component({
  selector: 'app-product-name',
  templateUrl: './product-name.component.html',
  styleUrls: ['./product-name.component.scss']
})
export class ProductNameComponent extends BaseComponent implements OnInit {

  @Input() id?: string;
  product$: Observable<Product | undefined> = of(undefined);
  constructor() {
    super();
  }

  ngOnInit() {
    this.product$ = this.Store?.ProductStore.getById(this.id!)!;
  }

}
