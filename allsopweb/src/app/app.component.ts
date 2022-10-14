import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/shared/global-core/base.component';
import { takeUntil } from 'rxjs';
import { COMMON_STRING } from './configs/common';
import { CartHttpService } from './services/cart-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = COMMON_STRING.webTitle;

  constructor(private cartHttp: CartHttpService) {
    super();
  }
  
  ngOnInit() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.cartHttp.get(cartId).pipe(takeUntil(this.UnSub)).subscribe({
        error: error => {
          if (error.status === 404) {
            this.cartHttp.post().pipe(takeUntil(this.UnSub)).subscribe(cart => {
              localStorage.setItem('cartId', cart.id!);
              this.AppEvent.AppEventBus.onChanged({
                type: COMMON_STRING.cartReadyEvent,
              });
            });
          }
        },
        next: cart => {
          if (!cart) {
            this.cartHttp.post().pipe(takeUntil(this.UnSub)).subscribe(cart => {
              localStorage.setItem('cartId', cart.id!);
              this.AppEvent.AppEventBus.onChanged({
                type: COMMON_STRING.cartReadyEvent,
              });
            });
          } else {
            this.AppEvent.AppEventBus.onChanged({
              type: COMMON_STRING.cartReadyEvent,
            });
          }
        },
      });
    } else {
      this.cartHttp.post().pipe(takeUntil(this.UnSub)).subscribe(cart => {
        localStorage.setItem('cartId', cart.id!);
        this.AppEvent.AppEventBus.onChanged({
          type: COMMON_STRING.cartReadyEvent,
        });
      });
    }
  }
}
