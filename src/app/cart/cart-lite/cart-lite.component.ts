import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import * as cartActions from '../shared/cart.actions';
import { CartItem } from '../shared/cart-item.model';
import { Product } from '../../products/shared/product.model';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'sf-cart-lite',
  templateUrl: './cart-lite.component.html',
})
export class CartLiteComponent extends CartComponent implements OnInit {

  constructor(private _store: Store<fromRoot.State>) {
    super(_store);
  }

}
