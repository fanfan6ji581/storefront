import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../shared/root.reducers';
import * as cartActions from './shared/cart.actions';
import { CartItem } from './shared/cart-item.model';

@Component({
  selector: 'sf-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[];
  cartItems$: Observable<CartItem[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.cartItems$ = store.select(fromRoot.getCartCartItems);
    this.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems
    });
  }

  ngOnInit() {
    // try load from localstoarge
    if (!this.cartItems.length) {
      this.store.dispatch(new cartActions.loadAction());
    }
  }

}
