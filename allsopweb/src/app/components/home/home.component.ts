import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'app/shared/global-core/base.component';
import { Product } from 'app/entities/product';
import { ProductsHttpService } from 'app/services/products.http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsHttp: ProductsHttpService) {
    super();
  }

  ngOnInit() {
    this.productsHttp.get().pipe(takeUntil(this.UnSub)).subscribe();
    this.Store?.ProductStore.get().pipe(takeUntil(this.UnSub)).subscribe(products => {
      this.products = products;
    });
  }
}
