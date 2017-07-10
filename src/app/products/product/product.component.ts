import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import * as product from './shared/product.actions';
import { Product } from '../shared/product.model';
import * as cartActions from '../../cart/shared/cart.actions';
import { CartItem } from '../../cart/shared/cart-item.model';

@Component({
  selector: 'sf-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;
  product: Product;
  loading$: Observable<Boolean>;
  loaded$: Observable<Boolean>;
  quantity = 1;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {
    this.product$ = store.select(fromRoot.getProductSelect);
    this.product$.subscribe(p => this.product = p);
    this.loading$ = store.select(fromRoot.getProductLoading);
    this.loaded$ = store.select(fromRoot.getProductLoaded);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // load product by params slug
      this.store.dispatch(new product.SelectAction(params['slug']));
    });
  }

  onQuantityChange(quantity: number) {
    if (typeof quantity === 'number') {
      this.quantity = quantity;
    }
  }

  onAddToCart() {
    this.store.dispatch(new cartActions.AddAction(new CartItem(this.product, this.quantity)));
  }

}
