import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
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
import { reducers } from './shared/root.reducers';
import { QuantityPickerComponent } from './shared/quantity-picker/quantity-picker.component';
import { SfCurrencyPipe } from './shared/sf-currency.pipe';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CartLiteComponent } from './cart/cart-lite/cart-lite.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOption } from './shared/custom-toast-option';
import { environment } from '../environments/environment'; // Angular CLI environment

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    CategoryComponent,
    LayoutComponent,
    ProductCardComponent,
    QuantityPickerComponent,
    SfCurrencyPipe,
    SpinnerComponent,
    CartLiteComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ToastModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CategoryEffects, ProductEffects, CartEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
  ],
  providers: [
    ApiService,
    ProductService,
    CartService,
    { provide: ToastOptions, useClass: CustomToastOption }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
