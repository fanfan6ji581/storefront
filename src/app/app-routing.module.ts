import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './products/product/product.component';
import { CategoryComponent } from './products/category/category.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'product/:slug',
        component: ProductComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
