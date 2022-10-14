import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { HomeComponent } from 'app/components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { GlobalAppData } from 'app/shared/global-core/global-app-data';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from 'app/shared/layout/footer/footer.component';
import { HeaderComponent } from 'app/shared/layout/header/header.component';
import { rootReducer } from 'app/store/root-reducer';
import { CartComponent } from 'app/components/cart/cart.component';
import { ProductListItemComponent } from 'app/shared/product/product-list-item/product-list-item.component';
import { CategoryNameComponent } from 'app/shared/category/category-name/category-name.component';
import { ProductNameComponent } from 'app/shared/product/product-name/product-name.component';
import { ProductPriceComponent } from 'app/shared/product/product-price/product-price.component';
import { CartItemTotalComponent } from 'app/shared/cart/cart-item-total/cart-item-total.component';
import { CartTotalComponent } from 'app/shared/cart/cart-total/cart-total.component';
import { CategoryNameByProductComponent } from 'app/shared/category/category-name-by-product/category-name-by-product.component';
import { CartItemCountComponent } from 'app/shared/cart/cart-item-count/cart-item-count.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListItemComponent,
    CategoryNameComponent,
    CartComponent,
    ProductNameComponent,
    ProductPriceComponent,
    CartItemTotalComponent,
    CartTotalComponent,
    CategoryNameByProductComponent,
    CartItemCountComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
      enableSourceMaps: true,
    }),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    GlobalAppData.AppInjector = this.injector;
  }
}
