import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../shared/root.reducers';
import * as productActions from '../shared/product.actions';
import * as cartActions from '../../../cart/shared/cart.actions';
import { Product } from '../../shared/product.model';
import { CartItem } from '../../../cart/shared/cart-item.model';

@Component({
  selector: 'sf-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  onViewDetail() {
    this.store.dispatch(new productActions.SelectSuccessAction(this.product));
  }

  onAddToCart() {
    this.store.dispatch(new cartActions.AddAction(new CartItem(this.product, 1)));
  }

}
