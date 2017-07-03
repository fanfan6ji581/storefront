import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../shared/root.reducers';
import * as cartActions from './shared/cart.actions';
import { CartItem } from './shared/cart-item.model';
import { Product } from '../products/shared/product.model';
import * as _ from 'lodash';

@Component({
  selector: 'sf-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[];
  cartItems$: Observable<CartItem[]>;
  loading: boolean;

  constructor(private store: Store<fromRoot.State>) {
    this.cartItems$ = store.select(fromRoot.getCartCartItems);
    this.cartItems$.subscribe(cartItems => this.cartItems = cartItems);
    store.select(fromRoot.getCartLoading).subscribe(loading => this.loading = loading);
  }

  /**
   * calculate totalPrice
   */
  get totalPrice(): number {
    const prices = this.cartItems.map(cartItem => cartItem.product.price * cartItem.quantity);
    return prices.reduce((sum, val) => sum + val, 0);
  }

  ngOnInit() {
    // try load from localstoarge
    if (!this.cartItems.length) {
      this.store.dispatch(new cartActions.loadAction());
    }
  }

  onQuantityChange(product: Product, quantity: number) {
    this.store.dispatch(new cartActions.SetValueAction(new CartItem(product, quantity)));
  }

  onDelete(product: Product) {
    this.store.dispatch(new cartActions.DeleteAction(product.id));
  }
}
