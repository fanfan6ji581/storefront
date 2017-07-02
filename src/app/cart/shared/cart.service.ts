import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { ProductService } from '../../products/shared/product.service';
import { CartItem } from './cart-item.model';
import * as fromRoot from '../../shared/root.reducers';

@Injectable()
export class CartService {
    private static KEY_CART_ITEMS = "cartItems";

    // keep track of the current cartItems
    cartItems: CartItem[];

    constructor(private productService: ProductService,
        private store: Store<fromRoot.State>) {
        store.select(fromRoot.getCartCartItems).subscribe(cartItems => this.cartItems = cartItems);
    }

    /**
     * keep the shopping cart item in local storage
     */
    saveToStorage() {
        // only keep the productId and quantity, ignore the product object
        const items = this.cartItems.map(cartItem => cartItem.toStorageFormat());
        localStorage.setItem(CartService.KEY_CART_ITEMS, JSON.stringify(items));
    }

    /**
     * retrive shopping cart from local storage
     */
    loadFromStorage(): CartItem[] {
        const items = localStorage.getItem(CartService.KEY_CART_ITEMS);
        return items != null ? JSON.parse(items) : [];
    }

}
