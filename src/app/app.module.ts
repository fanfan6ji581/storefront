import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './products/product/product.component';
import { CategoryComponent } from './products/category/category.component';
import { LayoutComponent } from './layout/layout.component';

import { ApiService } from './shared/services';
import { ProductService } from './products/shared/product.service';
import { ProductCardComponent } from './products/product-card/product-card.component';


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
    NgbModule.forRoot()
  ],
  providers: [
    ApiService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
