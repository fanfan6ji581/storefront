import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './products/product/product.component';
import { CategoryComponent } from './products/category/category.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductCardComponent } from './products/product/product-card/product-card.component';

import { ApiService } from './shared/services';
import { ProductService } from './products/shared/product.service';
import { CartService } from './cart/shared/cart.service';
import { CategoryEffects } from './products/category/shared/category.effects';
import { CartEffects } from './cart/shared/cart.effects';
import { ProductEffects } from './products/product/shared/product.effects';
import { reducer } from './shared/root.reducers';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    CategoryComponent,
    LayoutComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(CategoryEffects),
    EffectsModule.run(ProductEffects),
    EffectsModule.run(CartEffects),
  ],
  providers: [
    ApiService,
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
