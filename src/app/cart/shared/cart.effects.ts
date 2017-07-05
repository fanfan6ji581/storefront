import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as cartActions from './cart.actions';
import { Product } from '../../products/shared/product.model';
import { ProductService } from '../../products/shared/product.service';
import { CartItem } from './cart-item.model';
import { CartService } from './cart.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class CartEffects {

    /**
     * when update cart, save to DB
     */
    @Effect({ dispatch: false })
    persistence$: Observable<any> = this.actions$
        .ofType(cartActions.ADD, cartActions.UPDATE, cartActions.DELETE, cartActions.SET_VALUE)
        .switchMap(() => of(this.cartService.saveToStorage()));

    /**
     * load cart items from local storage,
     * and fetch product information if needed
     */
    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(cartActions.LOAD)
        .switchMap(() => of(this.cartService.loadFromStorage())
            .mergeMap(
            (cartItems) => this.productService.loadProductsByProudctIds(cartItems.map(cartItem => cartItem.productId))
            , (cartItems: CartItem[], products: Product[]) => {
                cartItems.forEach(cartItem => cartItem.product = products.find(product => product.id === cartItem.productId));
                return new cartActions.LoadSuccessAction(cartItems);
            }));


    /**
     * show succesfuly alert when user click ADD_TO_CART btn
     */
    @Effect({ dispatch: false })
    add$: Observable<Action> = this.actions$
        .ofType(cartActions.ADD)
        .switchMap(() => this.toastr.success('Product has been added to your cart!', 'Success!', { toastLife: 3000 }));

    constructor(private actions$: Actions,
        private cartService: CartService,
        private productService: ProductService,
        public toastr: ToastsManager) {

    }
}
