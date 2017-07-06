import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import { CartItem } from '../../cart/shared/cart-item.model';

@Component({
  selector: 'sf-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  isMenuShow = false;
  isCartPopupShow = false;

  constructor(private store: Store<fromRoot.State>) {
    this.cartItems$ = store.select(fromRoot.getCartCartItems);
    // when router change, auto close the menus
    store.select(fromRoot.getRouterState).subscribe(() => {
      this.isMenuShow = false;
      this.isCartPopupShow = false;
    });
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuShow = !this.isMenuShow;
  }

  toggleCartPopup() {
    this.isCartPopupShow = !this.isCartPopupShow;
  }

}
